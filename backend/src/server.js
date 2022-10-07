const app = require("./app").default;

// process.env.NODE_ENV = process.env.NODE_ENV || "development";
const port = process.env.PORT || 3200;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
