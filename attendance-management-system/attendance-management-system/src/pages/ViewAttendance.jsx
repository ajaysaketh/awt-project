import { useState } from "react";

const classOptions = ["All", "EV1", "EV2", "EV3", "EV4", "EV5", "EV6", "EV7", "EV8"];

const allStudents = [
  { id: "ev1-1", rollNo: "92400120167", name: "Santosh", class_name: "EV1" },
  { id: "ev1-2", rollNo: "92400120168", name: "Ravi",    class_name: "EV1" },
  { id: "ev2-1", rollNo: "92400120169", name: "Charan",  class_name: "EV2" },
  { id: "ev3-1", rollNo: "92400120170", name: "Priya",   class_name: "EV3" },
  { id: "ev4-1", rollNo: "92400120171", name: "Arun",    class_name: "EV4" },
  { id: "ev5-1", rollNo: "92400120172", name: "Meena",   class_name: "EV5" },
  { id: "ev6-1", rollNo: "92400120173", name: "Kavya",   class_name: "EV6" },
  { id: "ev7-1", rollNo: "92400120174", name: "Suresh",  class_name: "EV7" },
];

// Static sample attendance records — add more as needed
const staticRecords = allStudents.map(s => ({
  id:           s.id,
  date:         new Date().toISOString().split("T")[0],
  class_name:   s.class_name,
  student_name: s.name,
  roll_no:      s.rollNo,
  status:       "Present",
}));

export default function ViewAttendance() {
  const [records]                         = useState(staticRecords);
  const [selectedClass, setSelectedClass] = useState("All");
  const [search,        setSearch]        = useState("");

  const filtered = records.filter(r => {
    const matchClass  = selectedClass === "All" || r.class_name === selectedClass;
    const matchSearch = (r.student_name || "").toLowerCase().includes(search.toLowerCase()) ||
                        (r.class_name   || "").toLowerCase().includes(search.toLowerCase());
    return matchClass && matchSearch;
  });

  const getBadge = (status) => status === "Present"
    ? { bg: "#dcfce7", color: "#16a34a" }
    : { bg: "#fee2e2", color: "#ef4444" };

  const presentCount = filtered.filter(r => r.status === "Present").length;
  const absentCount  = filtered.filter(r => r.status === "Absent").length;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1a2c4e" }}>👁️ View Attendance</h2>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Records", value: filtered.length,                                      color: "#1a2c4e", bg: "#eff6ff" },
          { label: "Present",       value: presentCount,                                          color: "#16a34a", bg: "#f0fdf4" },
          { label: "Absent",        value: absentCount,                                           color: "#ef4444", bg: "#fef2f2" },
          { label: "Classes",       value: new Set(filtered.map(r => r.class_name)).size,         color: "#ea580c", bg: "#fff7ed" },
        ].map((s, i) => (
          <div key={i} style={{ background: s.bg, borderRadius: 12, padding: "18px", textAlign: "center", border: `1.5px solid ${s.color}22` }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ background: "#fff", borderRadius: 12, padding: "14px 18px", marginBottom: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", display: "flex", gap: 12, alignItems: "center" }}>
        <input type="text" placeholder="🔍 Search by student name or class..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "9px 14px", fontSize: 14, outline: "none", color: "#1a2c4e" }} />
        <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}
          style={{ border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "9px 14px", fontSize: 14, color: "#1a2c4e", outline: "none", background: "#fff", cursor: "pointer" }}>
          {classOptions.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "110px 80px 1fr 80px 100px", background: "#1a2c4e", padding: "14px 20px", gap: 12 }}>
          {["Date", "Class", "Student", "Roll No", "Status"].map((h, i) => (
            <div key={i} style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>{h}</div>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#9ca3af" }}>No attendance records found.</div>
        ) : (
          filtered.map((r, idx) => {
            const badge = getBadge(r.status);
            return (
              <div key={r.id} style={{ display: "grid", gridTemplateColumns: "110px 80px 1fr 80px 100px", padding: "13px 20px", gap: 12, alignItems: "center", background: idx % 2 === 0 ? "#fff" : "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
                <div style={{ fontSize: 13, color: "#6b7280" }}>{r.date}</div>
                <div><span style={{ background: "#eff6ff", color: "#2563eb", borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 700 }}>{r.class_name}</span></div>
                <div style={{ fontSize: 13, color: "#1a2c4e", fontWeight: 500 }}>{r.student_name}</div>
                <div style={{ fontSize: 13, color: "#374151" }}>{r.roll_no}</div>
                <div><span style={{ background: badge.bg, color: badge.color, borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 700 }}>{r.status}</span></div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}