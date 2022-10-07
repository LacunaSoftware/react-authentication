const { Router } = require("express");

const util = require("../util");

const { Authentication } = require("restpki-client");

const router = new Router();

router.post("/start", async (_req, res) => {
  const auth = new Authentication(util.getRestPkiClient());
  const token = await auth.startWithWebPki(util.getSecurityContextId());
  res.status(200).json(token);
});

router.post("/complete", async (req, res) => {
  const token = req.body.token;
  const auth = new Authentication(util.getRestPkiClient());
  const result = await auth.completeWithWebPki(token);

  if (result.validationResults.isValid()) {
    res.status(200).json({ isValid: true });
  } else {
    res.status(200).json({
      isValid: false,
      validation: result.validationResults.toString(),
    });
  }
});

module.exports.default = router;
