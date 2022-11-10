const { getParam } = require(Runtime.getFunctions()["helpers"].path);
const { AuthedHandler } = require(Runtime.getFunctions()[
  "authentication-helper"
].path);
const THIS = "/app/sync-token:";

/** Issues Sync token upon receipt of a different auth token. */
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

    const AccessToken = require("twilio").jwt.AccessToken;
    const SyncGrant = AccessToken.SyncGrant;

    const identity = "Unknown"; //TODO: Update this

    var syncGrant = new SyncGrant({
      serviceSid: await getParam(context, "SYNC_SID"),
    });

    var token = new AccessToken(
      context.ACCOUNT_SID,
      await getParam(context, "API_KEY"),
      await getParam(context, "API_SECRET")
    );

    token.addGrant(syncGrant);
    token.identity = identity;

    response.setBody({
      error: false,
      result: {
        identity,
        token: token.toJwt(),
      },
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
  if (!event.token) {
    return false;
  }
  return true;
};
