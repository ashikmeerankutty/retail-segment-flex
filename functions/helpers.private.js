/* ----------------------------------------------------------------------------------------------------
 * common helper function used by functions
 *
 * parameters to specific to this application
 *
 * getParam(context, key)        : fetches parameter value from (1) context; (2) deployed service
 *   also, provisions provisionable parameters (application-specific)
 * setParam(context, key, value) : sets parameter in deployed service
 * deprovisionParams(context)    : deprovisions all provisionable parameter for this application, call from undeploy
 *
 * ----------------------------------------------------------------------------------------------------
 */
const assert = require("assert");

/* --------------------------------------------------------------------------------
 * retrieve environment variable value
 * --------------------------------------------------------------------------------
 */
async function getParam(context, key) {
  assert(
    context.APPLICATION_NAME,
    "undefined .env environment variable APPLICATION_NAME!!!"
  );

  if (
    key !== "SERVICE_SID" && // avoid warning
    key !== "ENVIRONMENT_SID" && // avoid warning
    context[key]
  ) {
    return context[key]; // first return context non-null context value
  }

  const client = context.getTwilioClient();
  switch (key) {
    case "SERVICE_SID": {
      const services = await client.serverless.services.list();
      const service = services.find(
        (s) => s.friendlyName === context.APPLICATION_NAME
      );

      // return sid only if deployed; otherwise null
      return service ? service.sid : null;
    }

    case "ENVIRONMENT_SID": {
      const service_sid = await getParam(context, "SERVICE_SID");
      if (service_sid === null) return null; // service not yet deployed

      const environments = await client.serverless
        .services(service_sid)
        .environments.list({ limit: 1 });

      return environments.length > 0 ? environments[0].sid : null;
    }

    case "ENVIRONMENT_DOMAIN": {
      const service_sid = await getParam(context, "SERVICE_SID");
      if (service_sid === null) return null; // service not yet deployed

      const environments = await client.serverless
        .services(service_sid)
        .environments.list({ limit: 1 });

      return environments.length > 0 ? environments[0].domainName : null;
    }

    case "VERIFY_SID": {
      const services = await client.verify.services.list();
      let service = services.find(
        (s) => s.friendlyName === context.APPLICATION_NAME
      );
      if (!service) {
        console.log(
          `Verify service not found so creating a new verify service friendlyName=${context.APPLICATION_NAME}`
        );
        service = await client.verify.services.create({
          friendlyName: context.APPLICATION_NAME,
        });
      }
      if (!service)
        throw new Error(
          "Unable to create a Twilio Verify Service!!! ABORTING!!!"
        );

      await setParam(context, key, service.sid);
      return service.sid;
    }

    case "CONVERSATIONS_SID": {
      const services = await client.conversations.services.list();
      let service = services.find(
        (s) => s.friendlyName === context.APPLICATION_NAME
      );
      if (!service) {
        console.log(
          `Conversations Service not found so creating a new Converasations service friendlyName=${context.APPLICATION_NAME}`
        );
        service = await client.conversations.services.create({
          friendlyName: context.APPLICATION_NAME,
        });
        // Now set the new service to be the default for the account (required by Frontline)
        const configuration = await client.conversations
          .configuration()
          .update({ defaultChatServiceSid: service.sid });
      }
      if (!service) {
        throw new Error(
          "Unable to create a Twilio Conversations Service!!! ABORTING!!!"
        );
      }
    }

    case "API_KEY": {
      // value set in .env takes precedence
      if (context.API_KEY) return context.API_KEY;

      const apikeys = await client.keys.list();
      let apikey = apikeys.find(
        (k) => k.friendlyName === context.APPLICATION_NAME
      );
      if (apikey) {
        await client.keys(apikey.sid).remove();
      }

      console.log("API Key not found so creating a new API Key...");
      await client.newKeys
        .create({ friendlyName: context.APPLICATION_NAME })
        .then((result) => {
          apikey = result;
        })
        .catch((err) => {
          throw new Error("Unable to create a API Key!!! ABORTING!!!");
        });

      await setParam(context, key, apikey.sid);
      await setParam(context, "API_SECRET", apikey.secret);
      console.log("KEY", apikey);
      return apikey.sid;
    }

    case "API_SECRET": {
      // value set in .env takes precedence
      if (context.API_SECRET) return context.API_SECRET;

      await getParam(context, "API_KEY");

      return context.API_SECRET;
    }

    case "SYNC_SID": {
      const services = await client.sync.services.list();
      const service = services.find(
        (s) => s.friendlyName === context.APPLICATION_NAME
      );
      if (service) {
        console.log(`Found Sync service (${service.sid}) ...`);
        await setParam(context, key, service.sid);
        return service.sid;
      }

      console.log(
        `No Sync service named ${context.APPLICATION_NAME} found so creating a new sync service...`
      );
      let sid = null;
      await client.sync.services
        .create({ friendlyName: context.APPLICATION_NAME })
        .then((result) => {
          sid = result.sid;
        })
        .catch((err) => {
          throw new Error(
            "Unable to create a Twilio Sync Service!!! ABORTING!!!"
          );
        });
      console.log(`Created Sync service (${sid}) ...`);
      await setParam(context, key, sid);

      return sid;
    }

    case "CHAT_ADDRESS_SID": {
      if (context.CHAT_ADDRESS_SID) return context.CHAT_ADDRESS_SID;

      const CHAT_ADDRESS_FNAME = await getParam(
        context,
        "CHAT_ADDRESS_FNAME"
      );

      const addrSid = await client.conversations.addressConfigurations
        .list({ limit: 20 })
        .then((addresses) => {
          const chatAddress = addresses.find(
            (addr) => addr.friendlyName === CHAT_ADDRESS_FNAME
          );
          if (!chatAddress)
            throw new Error(
              `Could not find address with friendlyName ${CHAT_ADDRESS_FNAME}`
            );
          return chatAddress.sid;
        });

      await setParam(context, "CHAT_ADDRESS_SID", addrSid);
      return addrSid;
    }

    case "CHAT_ADDRESS_FNAME": {

      assert(
        context.CHAT_ADDRESS_FNAME,
        "undefined .env environment variable CHAT_ADDRESS_FNAME!!!"
      );

      return context.CHAT_ADDRESS_FNAME;
    }

    case "CONVERSATIONS_SERVICE_SID": {
      if (context.CONVERSATIONS_SERVICE_SID) {
        return context.CONVERSATIONS_SERVICE_SID;
      }

      const services = await client.conversations.services.list();
      let service = services.find(
        (s) => s.friendlyName === context.FLEX_CHAT_SERVICE_FNAME
      );
      if (!service) {
        console.log(
          `Conversations Service not found so creating a new Converasations service friendlyName=${context.FLEX_CHAT_SERVICE_FNAME}`
        );
        service = await client.conversations.services.create({
          friendlyName: context.FLEX_CHAT_SERVICE_FNAME,
        });
        // Now set the new service to be the default for the account (required by Frontline)
        const configuration = await client.conversations
          .configuration()
          .update({ defaultChatServiceSid: service.sid });

        throw new Error(
          "Unable to create a Twilio Conversations Service!!! ABORTING!!!"
        );
      } else {
        await setParam(context, "CONVERSATIONS_SERVICE_SID", service.sid);
        return service.sid;
      }
    }
  }
}
/* --------------------------------------------------------------------------------
 * deprovision environment variable
 * --------------------------------------------------------------------------------
 */
async function deprovisionParams(context) {
  const client = context.getTwilioClient();

  const resources = {};

  const verify_sid = await getParam(context, "VERIFY_SID");
  if (!verify_sid) return; // do nothing if no value

  let verify_service = null;
  try {
    verify_service = await client.verify.services(verify_sid).fetch();
    if (verify_service) {
      await client.verify.services(verify_sid).remove();
      resources["VERIFY_SID"] = verify_sid;
    }
  } catch (err) {
    console.log(`no verify service SID=${verify_sid}. skpping...`);
  }

  return resources;
}

/* --------------------------------------------------------------------------------
 * sets environment variable, only if service is deployed
 * --------------------------------------------------------------------------------
 */
async function setParam(context, key, value) {
  const service_sid = await getParam(context, "SERVICE_SID");
  if (!service_sid) return null; // do nothing is service is not deployed

  const client = context.getTwilioClient();

  const environment_sid = await getParam(context, "ENVIRONMENT_SID");
  const variables = await client.serverless
    .services(service_sid)
    .environments(environment_sid)
    .variables.list();
  let variable = variables.find((v) => v.key === key);

  if (variable) {
    // update existing variable
    if (variable.value !== value) {
      await client.serverless
        .services(service_sid)
        .environments(environment_sid)
        .variables(variable.sid)
        .update({ value })
        .then((v) => console.log("setParam: updated variable", v.key));
    }
  } else {
    // create new variable
    await client.serverless
      .services(service_sid)
      .environments(environment_sid)
      .variables.create({ key, value })
      .then((v) => console.log("setParam: created variable", v.key));
  }

  return {
    key: key,
    value: value,
  };
}

function getBasePath(context) {
  if (context.DOMAIN_NAME.includes("localhost")) {
    return `http://localhost:3000`;
  }
  return `https://${context.DOMAIN_NAME}`;
}

// --------------------------------------------------------------------------------
module.exports = {
  getParam,
  setParam,
  deprovisionParams,
  getBasePath,
};
