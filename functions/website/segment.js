const { getParam } = require(Runtime.getFunctions()["helpers"].path);
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

    const segmentKey = await getParam(context, "CLIENT_SEGMENT_WRITE_KEY");

    response.setBody({
      error: false,
      result: segmentKey,
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
