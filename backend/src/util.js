const { StandardSecurityContexts, RestPkiClient } = require("restpki-client");
const config = require("./config");

function getRestPkiClient() {
  const token = config.restPkiToken;
  const endpoint = config.restPkiEndpoint;
  return new RestPkiClient(endpoint, token);
}

function getSecurityContextId() {
  if (process.env.NODE_ENV !== "production") {
    return StandardSecurityContexts.LACUNA_TEST;
  }
  return StandardSecurityContexts.PKI_BRAZIL;
}

module.exports = {
  getSecurityContextId,
};
