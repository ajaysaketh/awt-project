const Attendance   = require("../models/Attendance");
const Student      = require("../models/Student");
const Notification = require("../models/Notification");

exports.getAll = async (req, res) => {
  const { class: className, date } = req.query;
  try {
    const filter = {};
    if (className) filter.class_name = className;
    if (date)      filter.date = date;
    const records = await Attendance.find(filter)
      .populate("student_id", "name roll_no")
      .sort({ date: -1 });
    res.json(records);
  } catch (err) { res.status(500).json({ message: "Server error." }); }
};

exports.mark = async (req, res) => {
  const { date, class_name, records } = req.body;
  if (!date || !class_name || !records || records.length === 0)
    return res.status(400).json({ message: "Date, class and records are required." });
  try {
    for (const record of records) {
      await Attendance.findOneAndUpdate(
        { student_id: record.student_id, date, class_name },
        { student_id: record.student_id, date, class_name, status: record.status },
        { upsert: true, new: true }
      );
    }
    const absentCount = records.filter(r => r.status === "Absent").length;
    await Notification.create({
      title:   "Attendance Marked",
      message: `Attendance for ${class_name} on ${date}: ${records.length - absentCount} present, ${absentCount} absent.`,
      type:    "success"
    });
    res.json({ message: "Attendance marked successfully!" });
  } catch (err) { res.status(500).json({ message: "Server error." }); }
};

exports.report = async (req, res) => {
  try {
    const report = await Attendance.aggregate([
      { $group: {
        _id:     "$class_name",
        present: { $sum: { $cond: [{ $eq: ["$status", "Present"] }, 1, 0] } },
        absent:  { $sum: { $cond: [{ $eq: ["$status", "Absent"]  }, 1, 0] } },
        total:   { $sum: 1 }
      }},
      { $sort: { _id: 1 } }
    ]);
    res.json(report.map(r => ({ class_name: r._id, present: r.present, absent: r.absent, total: r.total })));
  } catch (err) { res.status(500).json({ message: "Server error." }); }
};

exports.studentReport = async (req, res) => {
  try {
    const result = await Attendance.aggregate([
      { $match: { student_id: require("mongoose").Types.ObjectId(req.params.id) } },
      { $group: {
        _id:     null,
        present: { $sum: { $cond: [{ $eq: ["$status", "Present"] }, 1, 0] } },
        absent:  { $sum: { $cond: [{ $eq: ["$status", "Absent"]  }, 1, 0] } },
        total:   { $sum: 1 }
      }}
    ]);
    res.json(result[0] || { present: 0, absent: 0, total: 0 });
  } catch (err) { res.status(500).json({ message: "Server error." }); }
};