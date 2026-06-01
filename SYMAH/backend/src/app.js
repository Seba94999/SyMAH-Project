const cors = require("cors");
const express = require("express");
const apiRoutes = require("./routes");
const { DomainError } = require("./shared/errors/domain-error");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || true,
  }),
);
app.use(express.json());

app.use("/api", apiRoutes);

app.use((error, _req, res, _next) => {
  if (error instanceof DomainError) {
    res.status(400).json({
      message: error.message,
      details: error.details,
    });
    return;
  }

  res.status(500).json({
    message: "Internal server error",
  });
});

module.exports = app;
