const app = require("./app");
const env = require("./config/env");

app.listen(env.port, () => {
  console.log(`FinHost AI API running on port ${env.port}`);
});
