const Notification = require("../models/Notification");

exports.getAll = async (req, res) => {
  try {
    res.json(await Notification.find().sort({ createdAt: -1 }));
  } catch (err) { res.status(500).json({ message: "Server error." }); }
};

exports.markRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { is_read: true });
    res.json({ message: "Marked as read." });
  } catch (err) { res.status(500).json({ message: "Server error." }); }
};

exports.markAllRead = async (req, res) => {
  try {
    await Notification.updateMany({}, { is_read: true });
    res.json({ message: "All marked as read." });
  } catch (err) { res.status(500).json({ message: "Server error." }); }
};

exports.remove = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted." });
  } catch (err) { res.status(500).json({ message: "Server error." }); }
};

exports.clearAll = async (req, res) => {
  try {
    await Notification.deleteMany({});
    res.json({ message: "All cleared." });
  } catch (err) { res.status(500).json({ message: "Server error." }); }
};