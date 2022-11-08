/*
 * --------------------------------------------------------------------------------
 *  Twilio function used to login with MFA validation and generate JWT for application sessions
 *
 * mfa(context, event, callback)
 * login(context, event, callback)
 * verifyMfaCode(code, context)
 *
 * --------------------------------------------------------------------------------
 */
const THIS = 'authentication:';

exports.handler = async function (context, event, callback) {
  const assert = require('assert');

  assert(event.command, `Missing 'command' parameter, must be login|mfa|passwordLogin|refresh!!!`);

  try {
    switch (event.command) {
      case 'login':
        await login(context, event, callback);
        break;

      case 'mfa':
        mfa(context, event, callback);
        break;

      case 'passwordlogin':
        passwordLogin(context, event, callback);
        break;

      case 'refresh':
        refresh(context, event, callback);
        break;

      default:
        assert(event, `Invalid 'command' parameter ${event.command}, must be login|mfa|passwordLogin|refresh!!!`);
    }
  } catch (err) {
    console.log(THIS, err);
    return callback(err.message); // only return message and not the whole error stack
  }
}


// ----------------------------------------------------------

async function mfa(context, event, callback) {
  const {
    isValidMfaToken,
    createAppToken,
    createRefreshToken
  } = require(Runtime.getFunctions()['authentication-helper'].path);

  const response = new Twilio.Response();
  response.appendHeader('Content-Type', 'application/json');
  response.appendHeader('Access-Control-Allow-Origin', '*');

  if (event.code === undefined || event.code === null || event.code === '') {
    response.setStatusCode(400);
    response.setBody({ message: 'Code is null or empty.' });
    return callback(null, response);
  }
  if (event.code.length !== 6) {
    console.log('Code needs to be six');
    response.setStatusCode(400);
    response.setBody({ message: 'Code needs to be six digits.' });
    return callback(null, response);
  }
  if (!isValidMfaToken(event.token, context)) {
    response.setStatusCode(401);
    response.setBody({
      message:
        'Invalid or expired token. Please refresh the page and login again.',
    });
    return callback(null, response);
  }

  await verifyMfaCode(event.code, event.phone, context)
    .then((verificationCheck) => {
      console.log(verificationCheck);
      if (verificationCheck.status === 'approved') {
        response.setBody({
          accessToken: createAppToken('mfa', context),
          refreshToken: createRefreshToken('mfa', context),
        });
        return callback(null, response);
      }
      response.setStatusCode(401);
      response.setBody({
        message: 'Invalid code. Please check your phone and try again.',
      });
      return callback(null, response);
    })
    .catch((error) => {
      console.log(error);
      response.setStatusCode(500);
      response.setBody({
        message:
          'We are not able to verify your code now. Please refresh and try again.',
      });
      return callback(response, null);
    });
}


// --------------------------------------------------------------------------
async function verifyMfaCode(code, phone, context) {
  const { getParam } = require(Runtime.getFunctions()['helpers'].path);

  const verify_sid = await getParam(context, 'VERIFY_SID');
  const client = context.getTwilioClient();
  return client.verify
    .services(verify_sid)
    .verificationChecks.create({
      to: phone,
      code: code,
    });
}


// ----------------------------------------------------------------------------------------------------
async function login(context, event, callback) {
  const assert = require('assert');
  const { getParam } = require(Runtime.getFunctions()['helpers'].path);
  const {
    createMfaToken,
    createAppToken,
    createRefreshToken,
  } = require(Runtime.getFunctions()['authentication-helper'].path);

  if (context.DOMAIN_NAME.startsWith('localhost:')
    && context.DISABLE_AUTH_FOR_LOCALHOST
    && context.DISABLE_AUTH_FOR_LOCALHOST === 'true')
  {
    const response = {
      accessToken: createAppToken('login', context),
      refreshToken: createRefreshToken('login', context),
    };
    return callback(null, response);
  }

  const ADMINISTRATOR_PASSWORD = await getParam(context, 'ADMINISTRATOR_PASSWORD');
  if (!ADMINISTRATOR_PASSWORD) {
    const response = new Twilio.Response();
    response.setStatusCode(400);
    response.setBody({ message: 'Missing ADMINISTRATOR_PASSWORD environment variable!!!' });
    return callback(null, response);
  }

  if (!event.password) {
    const response = new Twilio.Response();
    response.setStatusCode(400);
    response.setBody({ message: 'Password is null or empty!!!' });
    return callback(null, response);
  }

  if (event.password !== ADMINISTRATOR_PASSWORD) {
    const response = new Twilio.Response();
    response.setStatusCode(400);
    response.setBody({ message: 'Password is incorrect!!!' });
    return callback(null, response);
  }

  if (!event.login) {
    const response = new Twilio.Response();
    response.setStatusCode(400);
    response.setBody({ message: 'Administrator not selected!!!' });
    return callback(null, response);
  }

  if (!event.phone) {
    const response = new Twilio.Response();
    response.setStatusCode(400);
    response.setBody({ message: 'Administrator phone not selected!!!' });
    return callback(null, response);
  }

  // send MFA code
  const VERIFY_SID = await getParam(context, 'VERIFY_SID');
  if (!VERIFY_SID) {
    const response = new Twilio.Response();
    response.setStatusCode(400);
    response.setBody({ message: 'Twilio verify service (VERIFY_SID) not found!!!' });
    return callback(null, response);
  }

  const ADMINISTRATOR_PHONE = await getParam(context, 'ADMINISTRATOR_PHONE');
  if (!ADMINISTRATOR_PHONE) {
    const response = new Twilio.Response();
    response.setStatusCode(400);
    response.setBody({ message: 'Missing ADMINISTRATOR_PHONE environment variable!!!' });
    return callback(null, response);
  }
  const client = context.getTwilioClient();
  try {
    await client.verify.services(VERIFY_SID).verifications
      .create({
        to: event.phone,
        channel: 'sms',
      });

    const response = {
      accessToken: createMfaToken('authentication', context),
    };
    return callback(null, response);
  } catch (err) {
    console.log(THIS, err);
    const response = new Twilio.Response();
    response.setStatusCode(400);
    response.setBody({message: `Authorized but could not send MFA to ${event.phone}!!!`});
    return callback(null, response);
  }
}

// -------------------------------------------------------------

async function passwordLogin(context, event, callback){
  const path = Runtime.getFunctions()['authentication-helper'].path;
  const {createAppTokenWithPassword} = require(path)

  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Content-Type', 'application/json');

  try{

    if(!context.PATIENT_PORTAL_PASSWORD){
      response.setStatusCode(400);
      response.setBody({ error:true, errorObject: 'PATIENT_PORTAL_PASSWORD is not set in the Twilio Console.' });
      return callback(null, response);
    }

    const patientEnvPassword = context.PATIENT_PORTAL_PASSWORD

    if(!event.username || !event.password || event.password !== patientEnvPassword){
      response.setStatusCode(401);
      response.setBody({ error:true, errorObject: 'Invalid login credentials.' });
      return callback(null, response);
    }

    const accessToken = createAppTokenWithPassword(event.username, 'password', context)
    response.setBody({error:false, result: accessToken})

    return callback(null, response)
  }
  catch(err){
    console.error(err)
    response.setStatusCode(500);
    response.setBody({ error:true, errorObject: 'An error occurred using password login.' });
    return callback(null, response);
  }



}


// -------------------------------------------------------------

async function refresh(context, event, callback) {
  const path = Runtime.getFunctions()['authentication-helper'].path;
  const { createAppToken, isValidRefreshToken } = require(path);

  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Content-Type', 'application/json');

  const ac = context.ACCOUNT_SID;

  //assert(event.token, 'missing event.token');
  if (!isValidRefreshToken(event.token, context)) {
    response.setStatusCode(401);
    response.setBody({
      message:
        'Invalid or expired token. Please refresh the page and login again.',
    });

    return callback(null, response);
  }

  response.setBody({
    accessToken: createAppToken('refresh', context),
  });
  callback(null, response);
}
