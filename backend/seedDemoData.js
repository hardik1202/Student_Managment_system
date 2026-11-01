const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Student = require("./models/Student");

const demoStudents = [
  { name: "Aarav Patel", course: "Computer Science & Engineering", year: "3rd", priority: "high", description: "Leads the campus coding club and is preparing a machine-learning capstone project." },
  { name: "Meera Shah", course: "Information Technology", year: "2nd", priority: "medium", description: "Strong in web development and actively contributes to peer mentoring sessions." },
  { name: "Rohan Desai", course: "Artificial Intelligence & Machine Learning", year: "4th", priority: "low", description: "Completing an internship-focused portfolio with a focus on responsible AI systems." },
];

async function seedDemoData() {
  const email = process.env.DEMO_EMAIL || "demo@charusat.edu";
  const password = process.env.DEMO_PASSWORD || "Student@123";
  if (!(await User.findOne({ email }))) {
    await User.create({ email, password: await bcrypt.hash(password, 10) });
    console.log(`Demo account created for ${email}`);
  }
  if ((await Student.countDocuments()) === 0) {
    await Student.insertMany(demoStudents);
    console.log("Demo student records created");
  }
}

module.exports = seedDemoData;
