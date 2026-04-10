const Student = require("../models/Student");

exports.getAll = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) { res.status(500).json({ message: "Server error." }); }
};

exports.getOne = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found." });
    res.json(student);
  } catch (err) { res.status(500).json({ message: "Server error." }); }
};

exports.create = async (req, res) => {
  const { name, roll_no, class_name, email, phone } = req.body;
  if (!name || !roll_no || !class_name)
    return res.status(400).json({ message: "Name, roll number and class are required." });
  try {
    const existing = await Student.findOne({ roll_no });
    if (existing) return res.status(400).json({ message: "Roll number already exists." });
    const student = await Student.create({ name, roll_no, class_name, email, phone });
    res.status(201).json({ message: "Student added successfully!", id: student._id });
  } catch (err) { res.status(500).json({ message: "Server error." }); }
};

exports.update = async (req, res) => {
  const { name, roll_no, class_name, email, phone } = req.body;
  try {
    await Student.findByIdAndUpdate(req.params.id, { name, roll_no, class_name, email, phone });
    res.json({ message: "Student updated successfully!" });
  } catch (err) { res.status(500).json({ message: "Server error." }); }
};

exports.remove = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully!" });
  } catch (err) { res.status(500).json({ message: "Server error." }); }
};