const axios = require("axios");
const { getParam } = require(Runtime.getFunctions()["helpers"].path);
const { createToken } = require(Runtime.getFunctions()[
  "webchat/helpers/createToken"
].path);
const { TOKEN_TTL_IN_SECONDS } = require(Runtime.getFunctions()[
  "webchat/constants"
].path);

const contactWebchatOrchestrator = async (context, customerFriendlyName, segmentAnonymousId, patientName, hasPatient) => {
  const params = new URLSearchParams();
  params.append("AddressSid", await getParam(context, "CHAT_ADDRESS_SID"));
  params.append("ChatFriendlyName", "Webchat widget");
  params.append("CustomerFriendlyName", customerFriendlyName);
  params.append(
    "PreEngagementData",
    JSON.stringify({
      friendlyName: customerFriendlyName,
      segmentAnonymousId,
      patientName,
      hasPatient
    })
  );

  let conversationSid;
  let identity;

  try {
    const res = await axios.post(
      `https://flex-api.twilio.com/v2/WebChats`,
      params,
      {
        auth: {
          username: await getParam(context, "ACCOUNT_SID"),
          password: await getParam(context, "AUTH_TOKEN"),
        },
      }
    );
    ({ identity, conversation_sid: conversationSid } = res.data);
  } catch (e) {
    console.log(e)
    throw e
  }

  return {
    conversationSid,
    identity,
  };
};

const sendUserMessage = async (context, conversationSid, identity) => {
  await context
    .getTwilioClient()
    .conversations.conversations(conversationSid)
    .messages.create({
      body: "Hello, I would like to speak with a representative.",
      author: identity,
      xTwilioWebhookEnabled: true, // trigger webhook
    })
    .then(() => {
      console.log("(async) User message sent");
    })
    .catch((e) => {
      console.log(`(async) Couldn't send user message: ${e?.message}`);
    });
};

exports.handler = async function (context, event, callback) {
  const response = new Twilio.Response();
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS, POST");
  response.appendHeader("Content-Type", "application/json");
  response.appendHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With, User-Agent"
  );
  response.setStatusCode(200);

  const customerFriendlyName = "Customer";

  let conversationSid;
  let identity;

  // Hit Webchat Orchestration endpoint to generate conversation and get customer participant sid
  try {
    const result = await contactWebchatOrchestrator(
      context,
      customerFriendlyName,
      event.segmentAnonymousId,
      event.patientName,
      event.hasPatient,
    );
    ({ identity, conversationSid } = result);
    // Generate token for customer
    const token = await createToken(context, identity);
    // OPTIONAL — if user query is defined
    await sendUserMessage(context, conversationSid, identity);
    response.setBody({
      token,
      conversationSid,
      expiration: Date.now() + TOKEN_TTL_IN_SECONDS * 1000,
    });

    return callback(null, response);
  } catch (error) {
    console.log(error);
    console.error(error);
    response.setStatusCode(500);
    response.setBody({
      error: true,
      errorObject:
        "Couldn't initiate webchat. Check Twilio Console for more information.",
    });

    return callback(null, response);
  }
};
