require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const seedDemoData = require("./seedDemoData");
require("./listeners");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/studentdb";

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
    await seedDemoData();
  } catch (err) {
    console.error("MongoDB startup failed:", err.message);
  }

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

start();
