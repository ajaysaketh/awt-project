import { useState, useEffect } from "react";

const classOptions = ["EV1", "EV2", "EV3", "EV4", "EV5", "EV6", "EV7", "EV8"];

const classStudents = {
  EV1: [
    { _id: "ev1-1", rollNo: "92400120167", name: "Santosh" },
    { _id: "ev1-2", rollNo: "92400120168", name: "Ravi" },
    { _id: "ev2-1", rollNo: "92400120169", name: "Charan" },
    { _id: "ev3-1", rollNo: "92400120170", name: "Priya" },

  ],
  EV2: [
    { _id: "ev2-1", rollNo: "92400120171", name: "Charan" },
  ],
  EV3: [
    { _id: "ev3-1", rollNo: "92400120172", name: "Priya" },
  ],
  EV4: [
    { _id: "ev4-1", rollNo: "92400120173", name: "Arun" },
  ],
  EV5: [
    { _id: "ev5-1", rollNo: "92400120174", name: "Meena" },
  ],
  EV6: [
    { _id: "ev6-1", rollNo: "92400120175", name: "Kavya" },
  ],
  EV7: [
    { _id: "ev7-1", rollNo: "92400120176", name: "Suresh" },
  ],
  EV8: [],
};

export default function MarkAttendance() {
  const [selectedClass, setSelectedClass] = useState("EV1");
  const [selectedDate,  setSelectedDate]  = useState(new Date().toISOString().split("T")[0]);
  const [students,      setStudents]      = useState([]);
  const [attendance,    setAttendance]    = useState({});
  const [submitted,     setSubmitted]     = useState(false);

  useEffect(() => {
    const filtered = classStudents[selectedClass] || [];
    setStudents(filtered);
    const initial = {};
    filtered.forEach(s => initial[s._id] = "Present");
    setAttendance(initial);
  }, [selectedClass]);

  const total   = students.length;
  const present = Object.values(attendance).filter(v => v === "Present").length;
  const absent  = total - present;
  const percent = total > 0 ? Math.round((present / total) * 100) : 0;

  const markAll = (status) => {
    const updated = {};
    students.forEach(s => updated[s._id] = status);
    setAttendance(updated);
  };

  const toggleStudent = (id) => {
    setAttendance(prev => ({ ...prev, [id]: prev[id] === "Present" ? "Absent" : "Present" }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1a2c4e" }}>✏️ Mark Attendance</h2>
      </div>

      {/* Controls */}
      <div style={{ background: "#fff", borderRadius: 12, padding: "16px 20px", marginBottom: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div>
          <label style={{ fontSize: 12, color: "#6b7280", fontWeight: 600, display: "block", marginBottom: 4 }}>Select Class</label>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}
            style={{ border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "8px 14px", fontSize: 14, color: "#1a2c4e", fontWeight: 600, cursor: "pointer", outline: "none", background: "#fff" }}>
            {classOptions.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize: 12, color: "#6b7280", fontWeight: 600, display: "block", marginBottom: 4 }}>Select Date</label>
          <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)}
            style={{ border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "8px 14px", fontSize: 14, color: "#1a2c4e", outline: "none", cursor: "pointer" }} />
        </div>
        <div style={{ marginLeft: "auto" }}>
          <label style={{ fontSize: 12, color: "#6b7280", fontWeight: 600, display: "block", marginBottom: 4 }}>Quick Select</label>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => markAll("Present")} style={{ background: "#16a34a", color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>✅ All Present</button>
            <button onClick={() => markAll("Absent")}  style={{ background: "#ef4444", color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>❌ All Absent</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
        {[
          { label: "Total",      value: total,         color: "#1a2c4e", bg: "#eff6ff" },
          { label: "Present",    value: present,       color: "#16a34a", bg: "#f0fdf4" },
          { label: "Absent",     value: absent,        color: "#ef4444", bg: "#fef2f2" },
          { label: "Percentage", value: `${percent}%`, color: "#ea580c", bg: "#fff7ed" },
        ].map((s, i) => (
          <div key={i} style={{ background: s.bg, borderRadius: 12, padding: "20px", textAlign: "center" }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", overflow: "hidden", marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "60px 120px 1fr 140px 100px", background: "#1a2c4e", padding: "14px 20px", gap: 12 }}>
          {["#", "Roll No", "Student Name", "Status", "Mark"].map((h, i) => (
            <div key={i} style={{ color: "#fff", fontSize: 13, fontWeight: 700, textAlign: i === 4 ? "center" : "left" }}>{h}</div>
          ))}
        </div>

        {students.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#9ca3af" }}>No students in this class.</div>
        ) : (
          students.map((student, idx) => {
            const isPresent = attendance[student._id] === "Present";
            return (
              <div key={student._id} style={{ display: "grid", gridTemplateColumns: "60px 120px 1fr 140px 100px", padding: "14px 20px", gap: 12, alignItems: "center", background: idx % 2 === 0 ? "#fff" : "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
                <div style={{ fontSize: 14, color: "#6b7280", fontWeight: 600 }}>{idx + 1}</div>
                <div style={{ fontSize: 13, color: "#2563eb", fontWeight: 600 }}>{student.rollNo}</div>
                <div style={{ fontSize: 14, color: "#1a2c4e", fontWeight: 500 }}>{student.name}</div>
                <div>
                  <span style={{ background: isPresent ? "#dcfce7" : "#fee2e2", color: isPresent ? "#16a34a" : "#ef4444", borderRadius: 20, padding: "5px 16px", fontSize: 12, fontWeight: 700 }}>
                    {isPresent ? "✅ Present" : "❌ Absent"}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div onClick={() => toggleStudent(student._id)} style={{ width: 44, height: 24, borderRadius: 99, background: isPresent ? "#16a34a" : "#e5e7eb", position: "relative", cursor: "pointer", transition: "background 0.25s" }}>
                    <div style={{ position: "absolute", top: 3, left: isPresent ? 23 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.2)", transition: "left 0.25s" }} />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Submit */}
      {submitted ? (
        <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 12, padding: "18px", textAlign: "center", fontSize: 16, fontWeight: 700, color: "#16a34a" }}>
          ✅ Attendance Submitted Successfully!
        </div>
      ) : (
        <button onClick={handleSubmit} style={{ width: "100%", padding: "16px", background: "#1a2c4e", color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
          ✏️ Submit Attendance
        </button>
      )}
    </div>
  );
}