const jwt = require("jsonwebtoken");
const Twilio = require("twilio");
const { TOKEN_TTL_IN_SECONDS } = require(Runtime.getFunctions()['constants'].path);
const { createToken } = require(Runtime.getFunctions()['helpers/createToken'].path);

exports.handler = async function (context, event, callback) {
  const response = new Twilio.Response();
  const client = context.getTwilioClient();
  
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS, POST");
  response.appendHeader("Content-Type", "application/json");
  response.appendHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With, User-Agent"
  );
  response.setStatusCode(200);
  

  let providedIdentity;

  try {
    const validatedToken = await new Promise((res, rej) =>
      jwt.verify(
        request.body.token,
        context.API_SECRET,
        {},
        (err, decoded) => {
          if (err) return rej(err);
          return res(decoded);
        }
      )
    );
    providedIdentity = validatedToken?.grants?.identity;

    console.log(`Token valid for ${providedIdentity}`);

    const refreshedToken = createToken(context, client, providedIdentity);

    response.setBody({
      token: refreshedToken,
      expiration: Date.now() + TOKEN_TTL_IN_SECONDS * 1000,
    });
    return callback(null, response);
  } catch (e) {
    console.error(`Invalid token provided: ${e.message}`);
    response.setStatusCode(403);
    response.setBody({
      error: true,
      errorObject:
        "Invalid token provided. Check Twilio Console for more information.",
    });
    return callback(null, response);
  }
};

module.exports = { refreshTokenController };
