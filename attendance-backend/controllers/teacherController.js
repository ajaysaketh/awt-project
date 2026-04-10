const Teacher = require("../models/Teacher");

exports.getAll = async (req, res) => {
  try {
    res.json(await Teacher.find().sort({ createdAt: -1 }));
  } catch (err) { res.status(500).json({ message: "Server error." }); }
};

exports.create = async (req, res) => {
  const { name, subject, email, phone, experience } = req.body;
  if (!name || !subject || !email)
    return res.status(400).json({ message: "Name, subject and email are required." });
  try {
    const teacher = await Teacher.create({ name, subject, email, phone, experience });
    res.status(201).json({ message: "Teacher added successfully!", id: teacher._id });
  } catch (err) { res.status(500).json({ message: "Server error." }); }
};

exports.updateStatus = async (req, res) => {
  try {
    await Teacher.findByIdAndUpdate(req.params.id, { status: req.body.status });
    res.json({ message: "Teacher status updated!" });
  } catch (err) { res.status(500).json({ message: "Server error." }); }
};

exports.remove = async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ message: "Teacher deleted successfully!" });
  } catch (err) { res.status(500).json({ message: "Server error." }); }
};