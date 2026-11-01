const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  course: { type: String, default: "" },
  year: {
    type: String,
    enum: ["1st", "2nd", "3rd", "4th"],
    default: "1st",
  },
  description: { type: String, default: "" },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  enrolled: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

studentSchema.pre("save", function trimName(next) {
  if (this.name) this.name = this.name.trim();
  next();
});

module.exports = mongoose.model("Student", studentSchema);
