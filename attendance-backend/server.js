const express   = require("express");
const cors      = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "✅ Attendance Backend is running!" });
});

connectDB().then(async () => {
  // Seed default data
  await seedData();

  app.use("/api/auth",          require("./routes/auth"));
  app.use("/api/students",      require("./routes/students"));
  app.use("/api/teachers",      require("./routes/teachers"));
  app.use("/api/attendance",    require("./routes/attendance"));
  app.use("/api/notifications", require("./routes/notifications"));
  app.use("/api/classes",       require("./routes/classes"));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("❌ Failed to start server:", err);
});

async function seedData() {
  const bcrypt       = require("bcryptjs");
  const User         = require("./models/User");
  const Teacher      = require("./models/Teacher");
  const Class        = require("./models/Class");
  const Student      = require("./models/Student");
  const Notification = require("./models/Notification");

  // Admin
  const adminExists = await User.findOne({ email: "admin@school.com" });
  if (!adminExists) {
    const hashed = bcrypt.hashSync("admin123", 10);
    await User.create({ name: "Admin User", email: "admin@school.com", password: hashed, role: "admin" });
    console.log("✅ Admin user created");
  }

  // Teachers
  const teacherExists = await Teacher.findOne();
  if (!teacherExists) {
    await Teacher.insertMany([
      { name: "Mr. Rajesh Kumar",  subject: "Mathematics",      email: "rajesh@school.com", phone: "9876543001", experience: "8 years",  status: "Active" },
      { name: "Ms. Anita Verma",   subject: "Science",          email: "anita@school.com",  phone: "9876543002", experience: "5 years",  status: "Active" },
      { name: "Mr. Suresh Nair",   subject: "English",          email: "suresh@school.com", phone: "9876543003", experience: "10 years", status: "Active" },
      { name: "Mrs. Priya Sharma", subject: "Information Tech", email: "priya@school.com",  phone: "9876543004", experience: "3 years",  status: "On Leave" },
    ]);
    console.log("✅ Teachers seeded");
  }

  // Classes
  const classExists = await Class.findOne();
  if (!classExists) {
    await Class.insertMany([
      { name: "10A", subject: "Mathematics",      room: "MB101", time: "9:00 AM" },
      { name: "10B", subject: "Science",          room: "MA102", time: "10:00 AM" },
      { name: "11A", subject: "English",          room: "MA601", time: "11:00 AM" },
      { name: "11B", subject: "Information Tech", room: "MA302", time: "12:00 PM" },
      { name: "12A", subject: "Mathematics",      room: "MB401", time: "1:00 PM" },
    ]);
    console.log("✅ Classes seeded");
  }

  // Students
  const studentExists = await Student.findOne();
  if (!studentExists) {
    await Student.insertMany([
      { name: "Aarav Shah",  roll_no: "CS001", class_name: "10A", email: "aarav@school.com",  phone: "9876543101" },
      { name: "Priya Patel", roll_no: "CS002", class_name: "10A", email: "priya@school.com",  phone: "9876543102" },
      { name: "Rohan Mehta", roll_no: "CS003", class_name: "10B", email: "rohan@school.com",  phone: "9876543103" },
      { name: "Sneha Joshi", roll_no: "CS004", class_name: "10B", email: "sneha@school.com",  phone: "9876543104" },
      { name: "Dev Sharma",  roll_no: "CS005", class_name: "11A", email: "dev@school.com",    phone: "9876543105" },
      { name: "Kavya Singh", roll_no: "CS006", class_name: "11A", email: "kavya@school.com",  phone: "9876543106" },
      { name: "Arun Kumar",  roll_no: "CS007", class_name: "11B", email: "arun@school.com",   phone: "9876543107" },
      { name: "Meena Patel", roll_no: "CS008", class_name: "11B", email: "meena@school.com",  phone: "9876543108" },
      { name: "Ravi Verma",  roll_no: "CS009", class_name: "12A", email: "ravi@school.com",   phone: "9876543109" },
      { name: "Anjali Nair", roll_no: "CS010", class_name: "12A", email: "anjali@school.com", phone: "9876543110" },
    ]);
    console.log("✅ Students seeded");
  }

  // Notifications
  const notifExists = await Notification.findOne();
  if (!notifExists) {
    await Notification.insertMany([
      { title: "Attendance Marked",    message: "Attendance for 10A marked successfully",  type: "success" },
      { title: "Low Attendance Alert", message: "Dev Sharma attendance dropped below 75%", type: "warning" },
      { title: "New Student Added",    message: "Anjali Nair has been added to 12A",       type: "info" },
    ]);
    console.log("✅ Notifications seeded");
  }

  console.log("✅ Database ready!");
}