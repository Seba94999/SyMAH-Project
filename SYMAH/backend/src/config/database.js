const mongoose = require("mongoose");

async function connectDatabase() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/symah",
    );

    console.log("✅ MongoDB conectado");
  } catch (error) {
    console.error("❌ Error al conectar MongoDB");
    console.error(error);
    process.exit(1);
  }
}

module.exports = {
  connectDatabase,
};
