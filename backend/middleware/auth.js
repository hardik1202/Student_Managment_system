const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const header = req.headers.authorization;
    const token = header?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Authorization token missing" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "lab_secret");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = auth;
