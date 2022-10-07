const { Router } = require("express");

const util = require("../util");

const { Authentication } = require("restpki-client");

const router = new Router();

router.post("/start", async (_req, res, next) => {
  try {
    const auth = new Authentication(util.getRestPkiClient());
    const token = await auth.startWithWebPki(util.getSecurityContextId());
    res.status(200).json(token);
  } catch (err) {
    next(err);
  }
});

router.post("/complete", async (req, res, next) => {
  try {
    const token = req.body.token;
    const auth = new Authentication(util.getRestPkiClient());
    const authResult = await auth.completeWithWebPki(token);

    const response = {
      isValid: authResult.validationResults.isValid(),
      validation: authResult.validationResults.toString(),
      certificate: {
        name: authResult.certificate.subjectName.commonName,
        email: authResult.certificate.emailAddress,
        cpf: authResult.certificate.pkiBrazil.cpf,
        validityEnd: authResult.certificate.validityEnd,
      },
    };
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

module.exports.default = router;
