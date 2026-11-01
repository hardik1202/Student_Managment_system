const express = require("express");
const cors = require("cors");
const requestLogger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const { requireJson } = require("./middleware/validate");
const auth = require("./middleware/auth");
const studentRoutes = require("./routes/students");
const authRoutes = require("./routes/auth");
const aiRoutes = require("./routes/ai");
const { getStats } = require("./cache");

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(requireJson);

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "student-management-api" });
});

app.get("/debug/cache", (req, res) => {
  res.json(getStats());
});

app.use("/auth", authRoutes);
app.use("/api/ai", auth, aiRoutes);
app.use("/students", auth, studentRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use(errorHandler);

module.exports = app;
