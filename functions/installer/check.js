'use strict';
/*
 * --------------------------------------------------------------------------------
 * checks deployment status of deployables of this application in the target Twilio account
 *
 * NOTE: that this function can only be run on localhost
 *
 * return json object that at least has the following:
 * {
 *   deploy_state: DEPLOYED|NOT-DEPLOYED
 * }
 * --------------------------------------------------------------------------------
 */
exports.handler = async function (context, event, callback) {
  const THIS = 'check:';

  const assert = require("assert");
  const { getParam } = require(Runtime.getFunctions()['helpers'].path);

  assert(context.DOMAIN_NAME.startsWith('localhost:'), `Can only run on localhost!!!`);
  console.time(THIS);
  try {

    // ---------- check service ----------------------------------------
    const service_sid        = await getParam(context, 'SERVICE_SID');
    const flex_plugin_sid    = await getParam(context, 'FLEX_PLUGIN_SID');
    const environment_domain = service_sid ? await getParam(context, 'ENVIRONMENT_DOMAIN') : null;
    const service_url        = service_sid ? `https://www.twilio.com/console/functions/api/start/${service_sid}` : null;

    // TODO check flex plugin

    const response = {
      //deploy_state: (service_sid && flex_plugin_sid) ? 'DEPLOYED' : 'NOT-DEPLOYED',
      deploy_state: (service_sid && flex_plugin_sid) ? 'DEPLOYED' : 'NOT-DEPLOYED',
      service_sid: service_sid,
      flex_plug_sid: flex_plugin_sid,
      service_url: service_url,
    };
    console.log(THIS, response);
    return callback(null, response);

  } catch (err) {
    console.log(THIS, err);
    return callback(err);
  } finally {
    console.timeEnd(THIS);
  }
}


/* --------------------------------------------------------------------------------
 * checks deployment of studio flow template shipped with this application
 *
 * includes you calling js file via:
 *
 * const { check_a_deployable }  = require(Runtime.getFunctions()['installer/check'].path);
 * --------------------------------------------------------------------------------
 */
const check_a_deployable = async (context) => {
  const client = context.getTwilioClient();

  const assets = Runtime.getAssets(); // private assets only

  // TODO: check deployment state of deployable

  return {};
}

exports.check_a_deployable = check_a_deployable;
