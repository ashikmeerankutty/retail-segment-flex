/*
 * --------------------------------------------------------------------------------
 * include token validation function using:
 *    const {path} = Runtime.getFunctions()["authentication-helper"];
 *    const {isValidAppToken} = require(path);
 *
 * --------------------------------------------------------------------------------
 *
 *  helper functions to be used only by authentication.js twilio function
 *
 * isValidPassword(password,context)
 * createMfaToken(context,key)
 * createAppToken(issuer,context)
 * checkDisableAuthForLocalhost(context)
 * getVerifyServiceId(context)
 * isValidAppToken(token,context)
 * isValidMfaToken(token,context)
 * isValidRefreshToken

 * --------------------------------------------------------------------------------
 */

const jwt = require("jsonwebtoken");

const MFA_TOKEN_DURATION = 5 * 60;
const APP_TOKEN_DURATION = 30 * 60;
const REFRESH_TOKEN_DURATION = 24 * 60 * 60;

function isValidPassword(password, context) {
  return (
    checkDisableAuthForLocalhost(context) ||
    password === context.APPLICATION_PASSWORD
  );
}

// --------------------------------------------------------
function createAppToken(issuer, context) {
  return jwt.sign({}, context.AUTH_TOKEN, {
    expiresIn: APP_TOKEN_DURATION,
    audience: "app",
    issuer,
    subject: "administrator",
  });
}

// --------------------------------------------------------

function createAppTokenWithPassword(username, issuer, context) {
  return jwt.sign({data: username}, context.PATIENT_PORTAL_PASSWORD, {
    expiresIn: APP_TOKEN_DURATION,
    audience: "app",
    issuer,
    subject: "administrator",
  });
}

// --------------------------------------------------------
function createRefreshToken(issuer, context) {
  return jwt.sign({}, context.AUTH_TOKEN, {
    expiresIn: REFRESH_TOKEN_DURATION,
    audience: "refresh",
    issuer,
    subject: "administrator",
  });
}

// --------------------------------------------------------

function createMfaToken(issuer, context) {
  if (checkDisableAuthForLocalhost(context)) {
    return createAppToken(issuer, context);
  }
  return jwt.sign({}, context.AUTH_TOKEN, {
    expiresIn: MFA_TOKEN_DURATION,
    audience: "mfa",
    issuer,
    subject: "administrator",
  });
}

// --------------------------------------------------------
function checkDisableAuthForLocalhost(context) {
  return (
    context.DOMAIN_NAME &&
    context.DOMAIN_NAME.startsWith("localhost") &&
    context.DISABLE_AUTH_FOR_LOCALHOST &&
    context.DISABLE_AUTH_FOR_LOCALHOST === "true"
  );
}

/* ----------------------------------------------------------------------------------------------------
 * This function returns Verify Service SID that matches VERIFY_SERVICE_NAME.
 * If does not exists it creates a new service.
 *
 * VERIFY_SERVICE_NAME is included in the text message to identify the sender.
 * It is recommended that the customer use their name as VERIFY_SERVICE_NAME
 * ----------------------------------------------------------------------------------------------------
 */
async function getVerifyServiceId(context) {
  const { getParam } = require(Runtime.getFunctions()["helpers"].path);

  return await getParam(context, "VERIFY_SID");
}

// -----------------------------------------------------

function isValidMfaToken(token, context) {
  try {
    return (
      checkDisableAuthForLocalhost(context) ||
      jwt.verify(token, context.AUTH_TOKEN, { audience: "mfa" })
    );
  } catch (err) {
    return false;
  }
}

// ---------------------------------------------------------
//Valid app token is:
//1. Any token that's provided while on localhost when flag is set to disabled
//2. A token signed with Twilio auth token
//3. A token signed with a valid password
function isValidAppToken(token, context) {
    if (checkDisableAuthForLocalhost(context)) return true;

    try {
        if (jwt.verify(token, context.AUTH_TOKEN, { audience: "app" })) return true;
    } catch (err) {
    }

    try {
        if (jwt.verify(token, context.PATIENT_PORTAL_PASSWORD, { audience: "app" })) return true;
    } catch (err) {
    }
    return false;
}

// ---------------------------------------------------------
function isValidRefreshToken(token, context) {
  try {
    return (
      checkDisableAuthForLocalhost(context) ||
      jwt.verify(token, context.AUTH_TOKEN, { audience: "refresh" })
    );
  } catch (err) {
    console.log(err);
    return false;
  }
}

/**
 *
 * @param {*} context
 * @param {*} event
 * @param {*} callback
 * @param {(context,event,callback)=>void} fxn
 * @returns callback
 */
const AuthedHandler = (fxn) => {
  return (context, event, callback) => {
    const response = new Twilio.Response();
    response.appendHeader("Content-Type", "application/json");
    response.appendHeader("Access-Control-Allow-Origin", "*");
    response.setStatusCode(401);

    //DISABLE_AUTH_FOR_LOCAHOST is parsed as a string, not boolean.
    if(!context.DISABLE_AUTH_FOR_LOCALHOST || context.DISABLE_AUTH_FOR_LOCALHOST == "false"){
      if (!event.token) {
        response.setBody({
          error: true,
          errorObject: "No access token was included.",
        });
        return callback(null, response);
      } else if (!isValidAppToken(event.token, context)) {
        response.setBody({ error: true, errorObject: "Invalid access token." });
        return callback(null, response);
      }
    }
    return fxn(context, event, callback);
  };
};

// ---------------------------------------------------------
module.exports = {
  isValidPassword,
  createMfaToken,
  createAppToken,
  createRefreshToken,
  isValidMfaToken,
  getVerifyServiceId,
  isValidAppToken,
  isValidRefreshToken,
  checkDisableAuthForLocalhost,
  AuthedHandler,
  createAppTokenWithPassword
};
