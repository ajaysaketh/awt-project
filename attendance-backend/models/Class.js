const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name:      { type: String, required: true, unique: true },
  subject:   { type: String },
  teacher_id:{ type: String },
  room:      { type: String },
  time:      { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Class", classSchema);