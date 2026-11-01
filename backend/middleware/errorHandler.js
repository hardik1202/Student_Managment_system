function errorHandler(err, req, res, next) {
  console.error(err.stack);

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ error: messages.join(", ") });
  }

  if (err.code === 11000) {
    return res.status(400).json({ error: "Email already registered" });
  }

  res.status(err.status || 500).json({ error: err.message || "Something went wrong" });
}

module.exports = errorHandler;
