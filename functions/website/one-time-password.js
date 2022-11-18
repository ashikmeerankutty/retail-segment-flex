const { getParam } = require(Runtime.getFunctions()["helpers"].path);
const THIS = "/website/one-time-password";

/**
 * 
 * @param {*} context 
 * @param {*} event => {
 *   action: "verify" | "check",
 *   code?: string
 * }
 * @param {*} callback 
 * @returns 
 */
exports.handler = async (context, event, callback) => {
  const response = new Twilio.Response();
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Content-Type", "application/json");
  response.setStatusCode(200);

  const client = context.getTwilioClient();
  const VERIFY_SID = await getParam(context, "VERIFY_SID");
  const ADMINISTRATOR_PHONE = await getParam(context, "ADMINISTRATOR_PHONE");

  const { action, code } = event;

  try {
    if (!validate(event)) {
      failureResponse(
        "The request did not have the correct body parameters.",
        response
      );
      return callback(null, response);
    }

    if (!VERIFY_SID) {
      failureResponse(
        "Twilio verify service (VERIFY_SID) not found!!!",
        response
      );
      return callback(null, response);
    }

    if (!ADMINISTRATOR_PHONE) {
      failureResponse(
        "Missing ADMINISTRATOR_PHONE environment variable!!!",
        response
      );
      return callback(null, response);
    }

    if (action === "verify") {
      await client.verify
        .services(VERIFY_SID)
        .verifications.create({
          to: ADMINISTRATOR_PHONE,
          channel: "sms",
        })
        .then((verif) =>
          console.log(
            "Created Verification sent to " +
              ADMINISTRATOR_PHONE +
              " and created Verification with SID: " +
              verif.sid
          )
        );
      response.setBody({
        error: false,
        result: {
          action,
          status: "success",
          message: "verification code sent to phone",
          phone: ADMINISTRATOR_PHONE,
        },
      });
    } else if (action === "check") {
      if (!code) {
        failureResponse("No verification code in params!", response);
        return callback(null, response);
      }
      const checkResponse = await client.verify.v2
        .services(VERIFY_SID)
        .verificationChecks.create({ to: "+14088025050", code })
        .then((verification_check) => verification_check);
      console.log("CHECK RESPONSE", checkResponse);
      response.setBody({
        error: false,
        result: {
          action,
          status: checkResponse.status,
          message: "verification code sent to phone",
          phone: ADMINISTRATOR_PHONE,
        },
      });
    } else {
      failureResponse("Unknown action parameter!", response);
      return callback(null, response);
    }
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
  if (!event.action) {
    return false;
  }
  return true;
};

const failureResponse = (message, response) => {
  response.setStatusCode(400);
  response.setBody({
    error: true,
    errorObject: message,
  });
  return response;
};

const createMfaToken = (issuer, context) => {
  if (checkDisableAuthForLocalhost(context)) {
    return createAppToken(issuer, context);
  }
  return jwt.sign({}, context.AUTH_TOKEN, {
    expiresIn: MFA_TOKEN_DURATION,
    audience: "mfa",
    issuer,
    subject: "administrator",
  });
};

// --------------------------------------------------------
const checkDisableAuthForLocalhost = (context) => {
  return (
    context.DOMAIN_NAME &&
    context.DOMAIN_NAME.startsWith("localhost") &&
    context.DISABLE_AUTH_FOR_LOCALHOST &&
    context.DISABLE_AUTH_FOR_LOCALHOST === "true"
  );
};
