import { useState } from "react";

const classOptions = ["All Classes", "EV1", "EV2", "EV3", "EV4", "EV5", "EV6", "EV7", "EV8"];

const initialStudents = [
  { id: "ev1-1", roll_no: "92400120167", name: "Santosh", class_name: "EV1", phone: "8688032555", email: "santosh@school.com", password: "student123", attendance: 60, status: "At Risk"  },
  { id: "ev1-2", roll_no: "92400120168", name: "Ravi",    class_name: "EV1", phone: "8688032556", email: "ravi@school.com",    password: "student123", attendance: 80, status: "Good"    },
  { id: "ev2-1", roll_no: "92400120169", name: "Charan",  class_name: "EV2", phone: "8688032557", email: "charan@school.com",  password: "student123", attendance: 75, status: "Average" },
  { id: "ev3-1", roll_no: "92400120170", name: "Priya",   class_name: "EV3", phone: "8688032558", email: "priya@school.com",   password: "student123", attendance: 68, status: "At Risk" },
  { id: "ev4-1", roll_no: "92400120171", name: "Arun",    class_name: "EV4", phone: "8688032559", email: "arun@school.com",    password: "student123", attendance: 55, status: "At Risk" },
  { id: "ev5-1", roll_no: "92400120172", name: "Meena",   class_name: "EV5", phone: "8688032560", email: "meena@school.com",   password: "student123", attendance: 72, status: "Average" },
  { id: "ev6-1", roll_no: "92400120173", name: "Kavya",   class_name: "EV6", phone: "8688032561", email: "kavya@school.com",   password: "student123", attendance: 91, status: "Good"    },
  { id: "ev7-1", roll_no: "92400120174", name: "Suresh",  class_name: "EV7", phone: "8688032562", email: "suresh@school.com",  password: "student123", attendance: 74, status: "Average" },
];

const attendanceHistory = [
  { date: "2026-04-01", status: "Present" },
  { date: "2026-04-02", status: "Absent"  },
  { date: "2026-04-03", status: "Present" },
  { date: "2026-04-04", status: "Present" },
  { date: "2026-04-05", status: "Absent"  },
  { date: "2026-04-06", status: "Present" },
];

function StudentDetail({ student, onBack, onDelete }) {
  const attColor = student.attendance >= 80 ? "#16a34a" : student.attendance >= 70 ? "#f59e0b" : "#ef4444";
  const attBg    = student.attendance >= 80 ? "#f0fdf4" : student.attendance >= 70 ? "#fffbeb" : "#fef2f2";

  return (
    <div>
      {/* Back Button */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={onBack}
          style={{ background: "#1a2c4e", color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
          ← Back to Students
        </button>
      </div>

      {/* Profile Banner */}
      <div style={{ background: "linear-gradient(135deg, #1a2c4e 0%, #2d4a7a 100%)", borderRadius: 14, padding: "28px 32px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 70, height: 70, borderRadius: "50%", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 800, border: "3px solid rgba(255,255,255,0.3)" }}>
            {student.name.charAt(0)}
          </div>
          <div>
            <div style={{ color: "#fff", fontSize: 22, fontWeight: 800 }}>{student.name}</div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, marginTop: 4 }}>🎓 {student.roll_no} — Class {student.class_name}</div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginTop: 4 }}>📧 {student.email}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {[
            { label: "Attendance", value: `${student.attendance}%` },
            { label: "Class",      value: student.class_name       },
            { label: "Status",     value: student.status           },
          ].map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "12px 20px", textAlign: "center", minWidth: 80 }}>
              <div style={{ color: "#fff", fontSize: 18, fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>

        {/* Personal Info */}
        <div style={{ background: "#fff", borderRadius: 12, padding: "20px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#1a2c4e", marginBottom: 16 }}>👤 Personal Information</div>
          {[
            { label: "Full Name",    value: student.name       },
            { label: "Roll Number",  value: student.roll_no    },
            { label: "Class",        value: student.class_name },
            { label: "Phone",        value: student.phone      },
            { label: "Email",        value: student.email      },
          ].map((f, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f3f4f6" }}>
              <span style={{ fontSize: 13, color: "#6b7280" }}>{f.label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#1a2c4e" }}>{f.value}</span>
            </div>
          ))}
        </div>

        {/* Attendance Summary */}
        <div style={{ background: "#fff", borderRadius: 12, padding: "20px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#1a2c4e", marginBottom: 16 }}>📊 Attendance Summary</div>

          {/* Attendance Circle */}
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ width: 100, height: 100, borderRadius: "50%", background: `conic-gradient(${attColor} 0% ${student.attendance}%, #e5e7eb ${student.attendance}% 100%)`, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 70, height: 70, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: attColor }}>
                {student.attendance}%
              </div>
            </div>
          </div>

          {[
            { label: "Total Classes", value: "30"                    },
            { label: "Present",       value: Math.round(30 * student.attendance / 100) },
            { label: "Absent",        value: 30 - Math.round(30 * student.attendance / 100) },
            { label: "Status",        value: student.status          },
          ].map((f, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f3f4f6" }}>
              <span style={{ fontSize: 13, color: "#6b7280" }}>{f.label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: i === 3 ? attColor : "#1a2c4e" }}>{f.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Attendance */}
      <div style={{ background: "#fff", borderRadius: 12, padding: "20px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginBottom: 24 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#1a2c4e", marginBottom: 16 }}>📅 Recent Attendance</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
          {attendanceHistory.map((a, i) => (
            <div key={i} style={{ textAlign: "center", padding: "12px 8px", borderRadius: 10, background: a.status === "Present" ? "#f0fdf4" : "#fef2f2", border: `1px solid ${a.status === "Present" ? "#bbf7d0" : "#fecaca"}` }}>
              <div style={{ fontSize: 18 }}>{a.status === "Present" ? "✅" : "❌"}</div>
              <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4 }}>{a.date.slice(5)}</div>
              <div style={{ fontSize: 10, fontWeight: 600, color: a.status === "Present" ? "#16a34a" : "#ef4444", marginTop: 2 }}>{a.status}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Button */}
      <button onClick={() => onDelete(student.id)}
        style={{ background: "#fee2e2", color: "#ef4444", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 24px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
        🗑️ Delete Student
      </button>
    </div>
  );
}

export default function Students() {
  const [students,       setStudents]       = useState(initialStudents);
  const [search,         setSearch]         = useState("");
  const [classFilter,    setClassFilter]    = useState("All Classes");
  const [showModal,      setShowModal]      = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newStudent,     setNewStudent]     = useState({ name: "", roll_no: "", class_name: "EV1", email: "", phone: "", password: "" });

  const handleAdd = () => {
    if (!newStudent.name || !newStudent.roll_no || !newStudent.class_name) {
      alert("Please fill all required fields!"); return;
    }
    const id = `${newStudent.class_name.toLowerCase()}-${Date.now()}`;
    setStudents(prev => [...prev, { ...newStudent, id, attendance: 0, status: "New" }]);
    setNewStudent({ name: "", roll_no: "", class_name: "EV1", email: "", phone: "", password: "" });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure?")) return;
    setStudents(prev => prev.filter(s => s.id !== id));
    setSelectedStudent(null);
  };

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.roll_no.includes(search);
    const matchClass  = classFilter === "All Classes" || s.class_name === classFilter;
    return matchSearch && matchClass;
  });

  // Show detail view if student selected
  if (selectedStudent) {
    return (
      <StudentDetail
        student={selectedStudent}
        onBack={() => setSelectedStudent(null)}
        onDelete={handleDelete}
      />
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1a2c4e" }}>🎓 Students</h2>
        <button onClick={() => setShowModal(true)} style={{ background: "#1a2c4e", color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
          + Add Student
        </button>
      </div>

      {/* Filters */}
      <div style={{ background: "#fff", borderRadius: 12, padding: "14px 18px", marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", display: "flex", gap: 12, alignItems: "center" }}>
        <input type="text" placeholder="🔍 Search by name or roll number..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "9px 14px", fontSize: 14, outline: "none", color: "#1a2c4e" }} />
        <select value={classFilter} onChange={e => setClassFilter(e.target.value)}
          style={{ border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "9px 14px", fontSize: 14, color: "#1a2c4e", outline: "none", background: "#fff", cursor: "pointer" }}>
          {classOptions.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "50px 130px 1fr 80px 150px 130px 100px", background: "#1a2c4e", padding: "14px 20px", gap: 12 }}>
          {["#", "Roll No", "Name", "Class", "Email", "Phone", "Action"].map((h, i) => (
            <div key={i} style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>{h}</div>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#9ca3af" }}>No students found.</div>
        ) : (
          filtered.map((s, idx) => (
            <div key={s.id}
              onClick={() => setSelectedStudent(s)}
              style={{ display: "grid", gridTemplateColumns: "50px 130px 1fr 80px 150px 130px 100px", padding: "13px 20px", gap: 12, alignItems: "center", background: idx % 2 === 0 ? "#fff" : "#f9fafb", borderBottom: "1px solid #f3f4f6", cursor: "pointer", transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#eff6ff"}
              onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? "#fff" : "#f9fafb"}>
              <div style={{ fontSize: 13, color: "#6b7280" }}>{idx + 1}</div>
              <div style={{ fontSize: 12, color: "#2563eb", fontWeight: 600 }}>{s.roll_no}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#1a2c4e", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                  {s.name.charAt(0)}
                </div>
                <span style={{ fontSize: 14, fontWeight: 500, color: "#1a2c4e" }}>{s.name}</span>
              </div>
              <div><span style={{ background: "#eff6ff", color: "#2563eb", borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 700 }}>{s.class_name}</span></div>
              <div style={{ fontSize: 12, color: "#374151" }}>{s.email || "—"}</div>
              <div style={{ fontSize: 13, color: "#374151" }}>{s.phone || "—"}</div>
              <div onClick={e => e.stopPropagation()}>
                <button onClick={() => handleDelete(s.id)} style={{ background: "#fee2e2", color: "#ef4444", border: "1px solid #fecaca", borderRadius: 7, padding: "6px 14px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Student Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: "28px 32px", width: 460, boxShadow: "0 20px 60px rgba(0,0,0,0.3)", maxHeight: "90vh", overflowY: "auto" }}>
            <h2 style={{ margin: "0 0 20px", fontSize: 20, color: "#1a2c4e" }}>+ Add New Student</h2>

            {[
              { label: "Full Name",    key: "name",     placeholder: "e.g. Rahul Sharma",    type: "text"     },
              { label: "Roll Number",  key: "roll_no",  placeholder: "e.g. EV1-05",          type: "text"     },
              { label: "Phone Number", key: "phone",    placeholder: "e.g. 9876543200",       type: "text"     },
              { label: "Email",        key: "email",    placeholder: "e.g. rahul@school.com", type: "email"    },
              { label: "Password",     key: "password", placeholder: "e.g. student123",       type: "password" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={newStudent[f.key]}
                  onChange={e => setNewStudent(p => ({ ...p, [f.key]: e.target.value }))}
                  style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14, boxSizing: "border-box" }} />
              </div>
            ))}

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Class</label>
              <select value={newStudent.class_name} onChange={e => setNewStudent(p => ({ ...p, class_name: e.target.value }))}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14 }}>
                {["EV1","EV2","EV3","EV4","EV5","EV6","EV7","EV8"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: "10px 14px", marginBottom: 20, fontSize: 12, color: "#1e40af" }}>
              💡 Student will be able to login using their email and password after registration.
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setShowModal(false)}
                style={{ flex: 1, padding: "10px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontSize: 14 }}>
                Cancel
              </button>
              <button onClick={handleAdd}
                style={{ flex: 1, padding: "10px", borderRadius: 8, border: "none", background: "#1a2c4e", color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
                + Add Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}