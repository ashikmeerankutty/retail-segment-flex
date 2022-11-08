const { getParam } = require(Runtime.getFunctions()["helpers"].path);
const fs = require('fs')
const { AuthedHandler } = require(Runtime.getFunctions()[
  "authentication-helper"
].path);
const THIS = "/app/segment:";

/** Gets Segment API Key for client. Does not require authentication for hls-segment-flex-provider. */
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

    const images = event.names.map((name => {
        const fileLoc = Object.keys(Runtime.getAssets()).find((key) =>
        key.includes(name)
      );
      const path = Runtime.getAssets()[fileLoc].path;
  
      const bitmap = fs.readFileSync(path)
      return {
        name,
        b64:new Buffer(bitmap).toString('base64')
      }
    }))

    response.setBody({
      error: false,
      result: images,
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
  if (!event.names) {
    return false;
  }
  return true;
};
