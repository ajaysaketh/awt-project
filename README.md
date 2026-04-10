# 📋 Attendance Management System

[![GitHub repo size](https://img.shields.io/github/repo-size/ajaysaketh/awt-project)](https://github.com/ajaysaketh/awt-project)
[![GitHub last commit](https://img.shields.io/github/last-commit/ajaysaketh/awt-project)](https://github.com/ajaysaketh/awt-project)
[![License](https://img.shields.io/badge/license-MIT-green)](https://github.com/ajaysaketh/awt-project)
[![Made with React](https://img.shields.io/badge/Frontend-React-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)](https://www.mongodb.com/)

A full-stack web application for managing student attendance at **Gujarat Higher Secondary School**.
Built with the **MERN Stack** as part of the Advanced Web Technologies (AWT) project.

---

## 🌐 GitHub Repository
```
https://github.com/ajaysaketh/awt-project
```

---

## 📌 Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Database Setup](#database-setup)
- [Run Backend](#run-backend)
- [Run Frontend](#run-frontend)
- [Login Credentials](#login-credentials)
- [API Endpoints](#api-endpoints)
- [Developer](#developer)

---

## 📖 About

The **Attendance Management System** is a complete MERN stack application that allows school administrators and teachers to digitally manage student attendance across 4 classes:

| Class | Subject | Teacher |
|-------|---------|---------|
| CS-A | Computer Science | Mr. Rajesh Kumar |
| CS-B | Computer Science | Mrs. Sunita Patel |
| IT-A | Information Technology | Mr. Amit Verma |
| IT-B | Information Technology | Mrs. Priya Sharma |

---

## ✨ Features

- 🔐 JWT-based Authentication & Authorization
- 🔑 Role-Based Access Control (Admin / Teacher)
- 🔒 Password Hashing with bcrypt
- 📊 Dashboard with Live Attendance Statistics
- ✏️ Mark Attendance (Present / Absent / Leave)
- 👁️ View & Filter Attendance Records
- 🎓 Student Management (Add / Edit / Delete)
- 👨‍🏫 Teacher Management
- 🏫 Class Management
- 📄 Generate & Export Attendance Reports
- 🔔 Notifications & Low Attendance Alerts
- 👤 User Profile Management

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React.js | UI Framework |
| React Router DOM | Page Navigation |
| Axios | API Calls |
| Context API | State Management |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| jsonwebtoken | JWT Authentication |
| bcryptjs | Password Hashing |
| dotenv | Environment Variables |
| cors | Cross Origin Requests |

---

## 📁 Folder Structure

```
awt-project/
├── attendance-backend/           # Node.js + Express Backend
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── attendanceController.js
│   │   ├── studentController.js
│   │   ├── teacherController.js
│   │   ├── classController.js
│   │   └── notificationController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Attendance.js
│   │   ├── Student.js
│   │   ├── Teacher.js
│   │   ├── Class.js
│   │   └── Notification.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── attendance.js
│   │   ├── students.js
│   │   ├── teachers.js
│   │   ├── classes.js
│   │   └── notifications.js
│   ├── .env                      # Create this manually
│   ├── package.json
│   └── server.js
│
├── attendance-management-system/ # React.js Frontend
│   └── attendance-management-system/
│       ├── src/
│       │   ├── components/
│       │   ├── context/
│       │   │   └── AuthContext.jsx
│       │   ├── pages/
│       │   │   ├── Login.jsx
│       │   │   ├── Dashboard.jsx
│       │   │   ├── MarkAttendance.jsx
│       │   │   ├── ViewAttendance.jsx
│       │   │   ├── Students.jsx
│       │   │   ├── Teachers.jsx
│       │   │   ├── Classes.jsx
│       │   │   ├── Reports.jsx
│       │   │   ├── Notifications.jsx
│       │   │   └── Profile.jsx
│       │   ├── App.jsx
│       │   └── index.js
│       └── package.json
│
└── database/                     # Database JSON files
    ├── students.json
    ├── teachers.json
    ├── users.json
    ├── classes.json
    ├── attendances.json
    └── notifications.json
```

---

## 🗄️ Database Setup

### Database Name: `college`

**Step 1** - Open **MongoDB Compass**

**Step 2** - Click **"Create Database"**
- Database Name: `college`

**Step 3** - Create these collections:
- `students`
- `teachers`
- `users`
- `classes`
- `attendances`
- `notifications`

**Step 4** - Import JSON files:
- Click collection → **Add Data** → **Import File** → Select JSON

| JSON File | Import Into |
|-----------|------------|
| `students.json` | `students` |
| `teachers.json` | `teachers` |
| `users.json` | `users` |
| `classes.json` | `classes` |
| `attendances.json` | `attendances` |
| `notifications.json` | `notifications` |

> JSON files are in the `database/` folder

---

## ⚙️ Environment Variables

Create `.env` file inside `attendance-backend/`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/college
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=24h
NODE_ENV=development
```

> ⚠️ Never push `.env` to GitHub!

---

## 🚀 Run Backend

```bash
cd attendance-backend
npm install
npm start
```

You should see:
```
✅ MongoDB connected to college database!
✅ Database ready!
🚀 Server running on http://localhost:5000
```

---

## 💻 Run Frontend

Open a new terminal:

```bash
cd attendance-management-system/attendance-management-system
npm install
npm start
```

> Frontend runs on: `http://localhost:3000`

---

## 🔐 Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@school.edu | admin123 |
| Teacher | teacher@school.edu | teacher123 |

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/register` | Register user |

### Attendance
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/attendance/mark` | Admin + Teacher | Mark attendance |
| GET | `/api/attendance/view` | Admin + Teacher | View attendance |
| DELETE | `/api/attendance/:id` | Admin only | Delete record |

### Students
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/students` | Admin + Teacher | Get all students |
| POST | `/api/students` | Admin only | Add student |
| PUT | `/api/students/:id` | Admin only | Update student |
| DELETE | `/api/students/:id` | Admin only | Delete student |

### Teachers
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/teachers` | Admin only | Get all teachers |
| POST | `/api/teachers` | Admin only | Add teacher |

---

## 👥 Role-Based Access Control

| Feature | Admin | Teacher |
|---------|-------|---------|
| View Dashboard | ✅ | ✅ |
| Mark Attendance | ✅ | ✅ Own Class |
| View Attendance | ✅ All | ✅ Own Class |
| Manage Students | ✅ | ❌ |
| Manage Teachers | ✅ | ❌ |
| Manage Classes | ✅ | ❌ |
| Generate Reports | ✅ All | ✅ Own Class |
| System Settings | ✅ | ❌ |

---

## 👨‍💻 Developer

**S Ajay Saketh**
- GitHub: [@ajaysaketh](https://github.com/ajaysaketh)
- Project: [awt-project](https://github.com/ajaysaketh/awt-project)

---

## 🏫 Institution

**Gujarat Higher Secondary School**
Academic Year: 2025-26
Subject: Advanced Web Technologies (AWT)
Submitted: April 2026
