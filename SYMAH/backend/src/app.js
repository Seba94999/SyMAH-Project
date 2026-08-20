const cors = require("cors");
const express = require("express");
const apiRoutes = require("./routes");
const { connectDatabase } = require("./config/database");
const { DomainError } = require("./shared/errors/domain-error");

const app = express();
let databasePromise = null;

async function ensureDatabaseReady() {
  if (!databasePromise) {
    databasePromise = connectDatabase().catch((error) => {
      databasePromise = null;
      throw error;
    });
  }

  return databasePromise;
}

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || true,
  }),
);
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

app.use("/api", async (_req, _res, next) => {
  try {
    await ensureDatabaseReady();
    next();
  } catch (error) {
    next(error);
  }
});

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
    message: error.message,
    details: error.details,
  });
});

module.exports = app;
