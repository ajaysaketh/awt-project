const initSqlJs = require("sql.js");
const bcrypt    = require("bcryptjs");
const path      = require("path");
const fs        = require("fs");

const DB_PATH = path.join(__dirname, "attendance.db");

const reset = async () => {
  const SQL = await initSqlJs();
  
  // Delete old database
  if (fs.existsSync(DB_PATH)) {
    fs.unlinkSync(DB_PATH);
    console.log("✅ Old database deleted");
  }

  // Create fresh database
  const db = new SQL.Database();

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS teachers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      subject TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT,
      experience TEXT,
      status TEXT DEFAULT 'Active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS classes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      subject TEXT,
      teacher_id INTEGER,
      room TEXT,
      time TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      roll_no TEXT NOT NULL UNIQUE,
      class_name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS attendance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      class_name TEXT NOT NULL,
      date TEXT NOT NULL,
      status TEXT DEFAULT 'Present',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(student_id, date, class_name)
    );
    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      type TEXT DEFAULT 'info',
      is_read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Create admin user with fresh password hash
  const hashed = bcrypt.hashSync("admin123", 10);
  db.run("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    ["Admin User", "admin@school.com", hashed, "admin"]);
  console.log("✅ Admin user created: admin@school.com / admin123");

  // Seed teachers
  const teachers = [
    ["Mr. Rajesh Kumar",  "Mathematics",      "rajesh@school.com", "9876543001", "8 years",  "Active"],
    ["Ms. Anita Verma",   "Science",          "anita@school.com",  "9876543002", "5 years",  "Active"],
    ["Mr. Suresh Nair",   "English",          "suresh@school.com", "9876543003", "10 years", "Active"],
    ["Mrs. Priya Sharma", "Information Tech", "priya@school.com",  "9876543004", "3 years",  "On Leave"],
  ];
  teachers.forEach(t => db.run(
    "INSERT OR IGNORE INTO teachers (name, subject, email, phone, experience, status) VALUES (?, ?, ?, ?, ?, ?)", t
  ));
  console.log("✅ Teachers seeded");

  // Seed classes
  const classes = [
    ["10A", "Mathematics",      "MB101", "9:00 AM"],
    ["10B", "Science",          "MA102", "10:00 AM"],
    ["11A", "English",          "MA601", "11:00 AM"],
    ["11B", "Information Tech", "MA302", "12:00 PM"],
    ["12A", "Mathematics",      "MB401", "1:00 PM"],
  ];
  classes.forEach(c => db.run(
    "INSERT OR IGNORE INTO classes (name, subject, room, time) VALUES (?, ?, ?, ?)", c
  ));
  console.log("✅ Classes seeded");

  // Seed students
  const students = [
    ["Aarav Shah",  "CS001", "10A", "aarav@school.com",  "9876543101"],
    ["Priya Patel", "CS002", "10A", "priya@school.com",  "9876543102"],
    ["Rohan Mehta", "CS003", "10B", "rohan@school.com",  "9876543103"],
    ["Sneha Joshi", "CS004", "10B", "sneha@school.com",  "9876543104"],
    ["Dev Sharma",  "CS005", "11A", "dev@school.com",    "9876543105"],
    ["Kavya Singh", "CS006", "11A", "kavya@school.com",  "9876543106"],
    ["Arun Kumar",  "CS007", "11B", "arun@school.com",   "9876543107"],
    ["Meena Patel", "CS008", "11B", "meena@school.com",  "9876543108"],
    ["Ravi Verma",  "CS009", "12A", "ravi@school.com",   "9876543109"],
    ["Anjali Nair", "CS010", "12A", "anjali@school.com", "9876543110"],
  ];
  students.forEach(s => db.run(
    "INSERT OR IGNORE INTO students (name, roll_no, class_name, email, phone) VALUES (?, ?, ?, ?, ?)", s
  ));
  console.log("✅ Students seeded");

  // Seed notifications
  const notifs = [
    ["Attendance Marked",    "Attendance for 10A marked successfully",  "success"],
    ["Low Attendance Alert", "Dev Sharma attendance dropped below 75%", "warning"],
    ["New Student Added",    "Anjali Nair has been added to 12A",       "info"],
  ];
  notifs.forEach(n => db.run(
    "INSERT INTO notifications (title, message, type) VALUES (?, ?, ?)", n
  ));
  console.log("✅ Notifications seeded");

  // Save database
  const data   = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
  console.log("✅ Database saved!");
  console.log("🎉 Reset complete! Now run: npm start");
};

reset().catch(console.error);
