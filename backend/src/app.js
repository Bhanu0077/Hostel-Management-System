const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { notFoundHandler, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "FinHost AI API"
  });
});

app.use("/", routes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
