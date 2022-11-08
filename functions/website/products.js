const { getParam } = require(Runtime.getFunctions()["helpers"].path);
const { AuthedHandler } = require(Runtime.getFunctions()[
  "authentication-helper"
].path);
const THIS = "/app/products:";

exports.handler = async (context, event, callback) => {
  const response = new Twilio.Response();
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Content-Type", "application/json");
  response.setStatusCode(200);
  try {
    if (!validate(event)) {
      response.setStatusCode(400);
      response.setBody({
        error: true,
        errorObject: "The request did not have the correct body parameters.",
      });
      return callback(null, response);
    }

    const client = context.getTwilioClient();
    const syncMapFname = await getParam(context, "SYNC_PRODUCT_MAP_FNAME");
    const syncSid = await getParam(context, "SYNC_SID");

    const result = await client.sync
      .services(syncSid)
      .syncMaps.list()
      .then((list) => list.find((map) => map.uniqueName === syncMapFname))
      .then((map) => {
        if (!map) {
          throw new Error(`Sync map with fname ${syncMapFname} not found.`);
        }
        return client.sync
          .services(syncSid)
          .syncMaps(map.sid)
          .syncMapItems.list()
          .then((resp) =>
            resp.map((item) => item.data)
          );
      })
      .catch((err) => {
        console.error(err);
        return [];
      });

    if (result.length === 0) {
      response.setBody({
        error: true,
        errorObject:
          "An error occurred retrieving products. See error logs in Twilio Console.",
      });
      return callback(null, response);
    }

    response.setBody({
      error: false,
      result,
    });

    return callback(null, response);
  } catch (err) {
    console.log(THIS, err);
    response.setBody({ error: true, errorObject: err });
    response.setStatusCode(500);
    return callback(err);
  } finally {
    console.timeEnd(THIS);
  }
};

const validate = (event) => {
  /*     if (!event.key) {
        return false;
    }*/
  return true;
};
