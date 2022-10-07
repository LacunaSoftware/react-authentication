const app = require("./app").default;

const port = process.env.PORT || 3200;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
