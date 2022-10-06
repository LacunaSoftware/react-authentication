const request = require("request");
const express = require("express");
const cors = require("cors");
const config = require("./config");
const restPkiClient = require("restpki-client");

let cli = new restPkiClient.RestPkiClient(
  config._restPkiEndpoint,
  config._token
);
let auth = new restPkiClient.Authentication(cli);

var app = express();
app.use(cors());

// ---------------------------------------------------------------------------------------------------------
// Authentication
app.get("/authenticationStart", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  app.use(cors());

  // Set a SecurityContext to be used to determine trust in the certificate chain for the authentication
  var securityContextId = restPkiClient.StandardSecurityContexts.PKI;

  request.post(cli._endpointUrl + "Api/Authentications",
    {
      json: true,
      headers: { Authorization: "Bearer " + cli._accessToken },
      body: { securityContextId: securityContextId },
    },
    function (err, restRes, body) {
      if (cli._checkResponse(err, restRes, body, next)) {
        // Send the response with token
        res.send(token);
      }
    }
  );
});

// app.post('/completeAuthentication', function (req, res, next) {
// 	auth.completeWithWebPki(req.token).then((response) => {
// 		console.log(response);
// 		console.log(res);
// 	})
// });

// ---------------------------------------------------------------------------------------------------------

// Error handler
app.use(function (err, req, res, next) {
  res.status(500);
  res.send({
    message: err.message,
  });
});

app.listen(8080);
module.exports = app;
