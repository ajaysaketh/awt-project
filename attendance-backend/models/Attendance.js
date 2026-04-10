const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  class_name: { type: String, required: true },
  date:       { type: String, required: true },
  status:     { type: String, default: "Present" }
}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);