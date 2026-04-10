const Class = require("../models/Class");

exports.getAll = async (req, res) => {
  try {
    res.json(await Class.find().sort({ name: 1 }));
  } catch (err) { res.status(500).json({ message: "Server error." }); }
};

exports.create = async (req, res) => {
  const { name, subject, teacher_id, room, time } = req.body;
  if (!name) return res.status(400).json({ message: "Class name is required." });
  try {
    const cls = await Class.create({ name, subject, teacher_id, room, time });
    res.status(201).json({ message: "Class added!", id: cls._id });
  } catch (err) { res.status(500).json({ message: "Server error." }); }
};

exports.remove = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.json({ message: "Class deleted!" });
  } catch (err) { res.status(500).json({ message: "Server error." }); }
};