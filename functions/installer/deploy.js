"use strict";
/* ----------------------------------------------------------------------------------------------------
 * deploys application (service) to target Twilio account.
 *
 * NOTE: that this function can only be run on localhost
 *
 * input:
 * event.action: CREATE|UPDATE|DELETE, defaults to CREATE|UPDATE depending on deployed state
 *
 * service identified via unique_name = APPLICATION_NAME in helpers.private.js
 * ----------------------------------------------------------------------------------------------------
 */
const THIS = "deploy";

const { getParam } = require(Runtime.getFunctions()["helpers"].path);
const step_total = 4; // TODO: must set manually based on your implementation!
let step = 0;
function log_step(message) {
  step++;
  console.log(`${THIS}: ${step}/${step_total}`, message);
}

function log(message) {
  console.log(`${THIS}:`, message);
}

// ----------------------------------------------------------------------------------------------------
exports.handler = async function (context, event, callback) {
  const assert = require("assert");

  step = 0; // reset step

  assert(
    context.DOMAIN_NAME.startsWith("localhost:"),
    `Can only run on localhost!!!`
  );
  console.time(THIS);
  try {
    assert(
      event.configuration.APPLICATION_NAME,
      "missing APPLICATION_NAME variable!!!"
    );
    assert(event.action, "missing event.action variable!!!");

    const env = event.configuration;

    log(THIS, ": configuration submitted:\n", event.configuration);

    log(THIS, `Deploying action=${event.action}`);

    const client = context.getTwilioClient();
    switch (event.action) {
      case "DEPLOY":
      case "REDEPLOY": {
        log_step(`---------- Provision service resources`);
        const verify_sid = await getParam(context, "VERIFY_SID");
        assert(verify_sid, "Unabled to provision Verify service!!!");
        const sync_sid = await getParam(context, "SYNC_SID");
        assert(sync_sid, "Unabled to provision Sync service!!!");

        assert(
          env.ADMINISTRATOR_PHONE,
          "Missing ADMINISTRATOR_PHONE varaible!!!"
        );

        log_step(
          `---------- Deploying serverless service: ${event.configuration.APPLICATION_NAME}`
        );
        const { service_sid, functions_hostname } = await deploy_service(
          context,
          event.configuration
        );
        log(`Deployed: ${service_sid}`);

        log_step("---------- Make serverless service editable ...");
        await client.serverless
          .services(service_sid)
          .update({ uiEditable: true });
        log(`Completed deployment of serverless service: ${service_sid}`);

        log_step('("---------- Deploying product information to Sync ...');
        await deploy_sync_maps(env, client, sync_sid);
        log("Completed deployment of products to Sync.");

        const response = {
          status: event.action,
          deployables: [{ serverless_service_sid: service_sid }],
        };
        return callback(null, response);
      }

      //TODO:
      case "UNDEPLOY": {
        const response = {
          status: "UNDEPLOYED",
          deployables: [],
        };
        return callback(null, response);
      }

      default:
        throw new Error(`unknown event.action=${action}`);
    }
  } catch (err) {
    console.log(err);
    return callback(err);
  } finally {
    console.timeEnd(THIS);
  }
};

/* --------------------------------------------------------------------------------
 * deploys (creates new/updates existing) service to target Twilio account.
 *
 * - service identified via unique_name = APPLICATION_NAME in helpers.private.js
 *
 * returns: service SID, if successful
 * --------------------------------------------------------------------------------
 */
async function get_assets() {
  const {
    getListOfFunctionsAndAssets,
  } = require("@twilio-labs/serverless-api/dist/utils/fs");

  const { assets } = await getListOfFunctionsAndAssets(process.cwd(), {
    functionsFolderNames: [],
    assetsFolderNames: ["assets"],
  });
  //console.log('asset count:', assets.length);

  const indexHTMLs = assets.filter((asset) =>
    asset.name.includes("index.html")
  );
  // Set indext.html as a default document
  const allAssets = assets.concat(
    indexHTMLs.map((ih) => ({
      ...ih,
      path: ih.name.replace("index.html", ""),
      name: ih.name.replace("index.html", ""),
    }))
  );
  //console.log(allAssets);
  //return allAssets;
  return assets;
}

/* --------------------------------------------------------------------------------
 * deploys serverless service
 * --------------------------------------------------------------------------------
 */
async function deploy_service(context, envrionmentVariables = {}) {
  const { getParam } = require(Runtime.getFunctions()["helpers"].path);
  const {
    getListOfFunctionsAndAssets,
  } = require("@twilio-labs/serverless-api/dist/utils/fs");
  const { TwilioServerlessApiClient } = require("@twilio-labs/serverless-api");
  const fs = require("fs");

  const client = context.getTwilioClient();

  const assets = await get_assets();
  log("asset count:", assets.length);

  const { functions } = await getListOfFunctionsAndAssets(process.cwd(), {
    functionsFolderNames: ["functions"],
    assetsFolderNames: [],
  });
  log("function count:", functions.length);

  const pkgJsonRaw = fs.readFileSync(`${process.cwd()}/package.json`);
  const pkgJsonInfo = JSON.parse(pkgJsonRaw);
  const dependencies = pkgJsonInfo.dependencies;
  log("package.json loaded");

  const deployOptions = {
    env: {
      ...envrionmentVariables,
    },
    pkgJson: {
      dependencies,
    },
    functionsEnv: "dev",
    functions,
    assets,
  };
  log("deployOptions.env:", deployOptions.env);

  let service_sid = await getParam(context, "SERVICE_SID");
  if (service_sid) {
    // update service
    log("updating services ...");
    deployOptions.serviceSid = service_sid;
  } else {
    // create service
    log("creating services ...");
    deployOptions.serviceName = envrionmentVariables.APPLICATION_NAME;
  }

  const serverlessClient = new TwilioServerlessApiClient({
    username: client.username, // ACCOUNT_SID
    password: client.password, // AUTH_TOKEN
  });

  serverlessClient.on("status-update", (evt) => {
    console.log(evt.message);
  });

  const result = await serverlessClient.deployProject(deployOptions);
  service_sid = await getParam(context, "SERVICE_SID");

  return { service_sid, functions_hostname: result.domain };
}


/* --------------------------------------------------------------------------------
 * deploys product sync map
 * --------------------------------------------------------------------------------
 */
async function deploy_sync_maps(env, client, sync_sid) {
  const fs = require("fs");

  const sync_map_products_fname = env.SYNC_PRODUCT_MAP_FNAME
  const sync_map_cart_fname = env.SYNC_CART_MAP_FNAME

  const productsPath =
    Runtime.getAssets()["/installer/productInformation.json"].path;

  function getProducts() {
    try {
      const json = JSON.parse(fs.readFileSync(productsPath, "utf8"));
      return json.products;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  //Delete (if exists) sync map and recreate.
  const createSyncMapPromise = (fname) =>
    client.sync
      .services(sync_sid)
      .syncMaps.list()
      .then((list) =>
        list.find((map) => map.uniqueName === fname)
      )
      .then((map) => {
        if (!map) {
          return client.sync
            .services(sync_sid)
            .syncMaps.create({ uniqueName: fname })
            .then((map) => map.sid);
        }
        return client.sync
          .services(sync_sid)
          .syncMaps(map.sid)
          .remove()
          .then(() => createSyncMapPromise());
      });

  const cartMapSid = await createSyncMapPromise(sync_map_cart_fname)
  const productMapSid = await createSyncMapPromise(sync_map_products_fname);

  const products = getProducts();

  const promises = products.map((product) =>
    client.sync
      .services(sync_sid)
      .syncMaps(productMapSid)
      .syncMapItems.create({ key: product.id, data: product })
  );

  await Promise.all(promises);
}
