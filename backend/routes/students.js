const express = require("express");
const Student = require("../models/Student");
const { cache, recordHit, recordMiss } = require("../cache");
const studentEvents = require("../events");
const { validateStudent, validateId } = require("../middleware/validate");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const cached = cache.get("all_students");
    if (cached) {
      recordHit();
      res.set("X-Cache", "HIT");
      return res.json(cached);
    }
    recordMiss();
    const students = await Student.find().sort({ createdAt: -1 });
    cache.set("all_students", students);
    res.set("X-Cache", "MISS");
    res.json(students);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateId, async (req, res, next) => {
  try {
    const key = `student_${req.params.id}`;
    const cached = cache.get(key);
    if (cached) {
      recordHit();
      return res.json(cached);
    }
    recordMiss();
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    cache.set(key, student);
    res.json(student);
  } catch (err) {
    next(err);
  }
});

router.post("/", validateStudent, async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    cache.del("all_students");
    console.log(`[API] Response sent at ${new Date().toISOString()}`);
    res.status(201).json(student);
    studentEvents.emit("student-created", student);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validateId, validateStudent, async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    cache.del("all_students");
    cache.del(`student_${req.params.id}`);
    res.json(student);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", validateId, async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    cache.del("all_students");
    cache.del(`student_${req.params.id}`);
    res.json({ message: "Student deleted", student });
    studentEvents.emit("student-deleted", student);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
