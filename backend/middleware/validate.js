function requireJson(req, res, next) {
  if (req.method === "POST" || req.method === "PUT") {
    const type = req.headers["content-type"] || "";
    if (!type.includes("application/json")) {
      return res.status(400).json({ error: "Content-Type must be application/json" });
    }
  }
  next();
}

function validateStudent(req, res, next) {
  if (!req.body || !req.body.name || !String(req.body.name).trim()) {
    return res.status(400).json({ error: "Student name is required" });
  }
  next();
}

function validateId(req, res, next) {
  const { id } = req.params;
  if (!id || !/^[a-fA-F0-9]{24}$/.test(id)) {
    return res.status(400).json({ error: "Invalid student id format" });
  }
  next();
}

module.exports = { requireJson, validateStudent, validateId };
