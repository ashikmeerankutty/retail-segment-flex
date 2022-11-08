const { TOKEN_TTL_IN_SECONDS } = require(Runtime.getFunctions()['webchat/constants'].path);
const { getParam } = require(Runtime.getFunctions()['helpers'].path);
const jwt = require("jsonwebtoken");

const createToken = async (context, identity) => {
    console.log("Creating new token");
    const { AccessToken } = Twilio.jwt;
    const { ChatGrant } = AccessToken;

    const chatGrant = new ChatGrant({
        serviceSid: await getParam(context, 'CONVERSATIONS_SERVICE_SID')
    });

    console.log("KEYS", await getParam(context, "API_KEY"), await getParam(context, "API_SECRET"))

    const token = new AccessToken(context.ACCOUNT_SID, await getParam(context, "API_KEY"), await getParam(context, "API_SECRET"), {
        identity,
        ttl: TOKEN_TTL_IN_SECONDS
    });
    token.addGrant(chatGrant);
    const jwt = token.toJwt();
    console.log("New token created");
    return jwt;
};

module.exports = { createToken };
