const express = require("express");
const cors = require("cors");
const authenticationRoutes = require("./routes/authentication").default;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authenticationRoutes);

// Error handler
app.use(function (err, req, res, next) {
  res.status(500);
  res.send({
    message: err.message,
  });
});

module.exports.default = app;
