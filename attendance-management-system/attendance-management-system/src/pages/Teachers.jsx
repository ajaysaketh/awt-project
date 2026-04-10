import { useState, useEffect } from "react";
import { getTeachers, addTeacher, deleteTeacher, updateTeacherStatus } from "../utils/api";

const subjectsList = ["Mathematics", "Science", "English", "Information Tech", "Computer Science", "Civil", "Mechanical"];

export default function Teachers() {
  const [teachers,   setTeachers]   = useState([]);
  const [search,     setSearch]     = useState("");
  const [showModal,  setShowModal]  = useState(false);
  const [loading,    setLoading]    = useState(true);
  const [newTeacher, setNewTeacher] = useState({ name: "", subject: subjectsList[0], email: "", phone: "", experience: "" });

  useEffect(() => { fetchTeachers(); }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const data = await getTeachers();
      setTeachers(Array.isArray(data) ? data : []);
    } catch (err) {
      alert("Failed to load teachers: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!newTeacher.name || !newTeacher.email) { alert("Name and email required!"); return; }
    try {
      await addTeacher(newTeacher);
      await fetchTeachers();
      setNewTeacher({ name: "", subject: subjectsList[0], email: "", phone: "", experience: "" });
      setShowModal(false);
    } catch (err) { alert(err.message); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this teacher?")) return;
    try { await deleteTeacher(id); await fetchTeachers(); }
    catch (err) { alert(err.message); }
  };

  const handleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "On Leave" : "Active";
    try { await updateTeacherStatus(id, newStatus); await fetchTeachers(); }
    catch (err) { alert(err.message); }
  };

  const filtered = teachers.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1a2c4e" }}>👨‍🏫 Teacher Management</h2>
        <button onClick={() => setShowModal(true)} style={{ background: "#28a745", color: "#fff", border: "none", padding: "8px 18px", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
          + Add Teacher
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 20 }}>
        {[
          { icon: "🏫", value: teachers.length,                                     label: "Total Teachers", color: "#1a2340", border: "#1a2340" },
          { icon: "✅", value: teachers.filter(t => t.status === "Active").length,   label: "Active",         color: "#28a745", border: "#28a745" },
          { icon: "🏖️", value: teachers.filter(t => t.status === "On Leave").length, label: "On Leave",       color: "#fd7e14", border: "#fd7e14" },
          { icon: "📚", value: [...new Set(teachers.map(t => t.subject))].length,    label: "Subjects",       color: "#6f42c1", border: "#6f42c1" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 10, padding: "18px", textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", borderTop: `3px solid ${s.border}` }}>
            <div style={{ fontSize: 24 }}>{s.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", padding: "10px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", gap: 10, marginBottom: 20 }}>
        <span>🔍</span>
        <input type="text" placeholder="Search by name or subject..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ border: "none", outline: "none", fontSize: 14, color: "#1a2340", flex: 1 }} />
      </div>

      {/* Teacher Cards */}
      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: "#6b7280" }}>Loading...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40, color: "#6b7280" }}>No teachers found.</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {filtered.map(teacher => (
            <div key={teacher._id} style={{ background: "#fff", borderRadius: 12, padding: "18px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#1a2340", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 18 }}>
                    {teacher.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#1a2340" }}>{teacher.name}</div>
                    <div style={{ fontSize: 13, color: "#888" }}>{teacher.subject}</div>
                  </div>
                </div>
                <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: teacher.status === "Active" ? "#e6f9ed" : "#fff8e6", color: teacher.status === "Active" ? "#28a745" : "#fd7e14", border: `1px solid ${teacher.status === "Active" ? "#28a745" : "#fd7e14"}` }}>
                  {teacher.status === "Active" ? "✅" : "🏖️"} {teacher.status}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", gap: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}><span>📱</span><span style={{ fontSize: 13, color: "#444" }}>{teacher.phone}</span></div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}><span>⭐</span><span style={{ fontSize: 13, color: "#444" }}>{teacher.experience}</span></div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span>💻</span><span style={{ fontSize: 13, color: "#444" }}>{teacher.email}</span></div>
              </div>
              <div style={{ display: "flex", gap: 10, borderTop: "1px solid #f0f2f5", paddingTop: 12 }}>
                <button onClick={() => handleStatus(teacher._id, teacher.status)} style={{ flex: 1, padding: "8px 0", borderRadius: 6, fontSize: 13, fontWeight: 500, border: "none", cursor: "pointer", background: teacher.status === "Active" ? "#fff8e6" : "#e6f9ed", color: teacher.status === "Active" ? "#fd7e14" : "#28a745" }}>
                  {teacher.status === "Active" ? "🏖️ Set Leave" : "✅ Set Active"}
                </button>
                <button onClick={() => handleDelete(teacher._id)} style={{ background: "#fff", color: "#dc3545", border: "1px solid #dc3545", padding: "7px 16px", borderRadius: 6, fontSize: 13, cursor: "pointer" }}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 32, width: 440, boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
            <h2 style={{ margin: "0 0 20px", fontSize: 20, color: "#1a2c4e" }}>Add New Teacher</h2>
            {[
              { label: "Full Name",  key: "name",       placeholder: "e.g. Mr. Rahul Verma" },
              { label: "Phone",      key: "phone",      placeholder: "e.g. 9876543010" },
              { label: "Email",      key: "email",      placeholder: "e.g. rahul@school.com" },
              { label: "Experience", key: "experience", placeholder: "e.g. 5 years" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, color: "#374151", fontWeight: 600, display: "block", marginBottom: 4 }}>{f.label}</label>
                <input type="text" placeholder={f.placeholder} value={newTeacher[f.key]} onChange={e => setNewTeacher(p => ({ ...p, [f.key]: e.target.value }))}
                  style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14, boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 13, color: "#374151", fontWeight: 600, display: "block", marginBottom: 4 }}>Subject</label>
              <select value={newTeacher.subject} onChange={e => setNewTeacher(p => ({ ...p, subject: e.target.value }))}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14 }}>
                {subjectsList.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: "10px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontSize: 14 }}>Cancel</button>
              <button onClick={handleAdd} style={{ flex: 1, padding: "10px", borderRadius: 8, border: "none", background: "#28a745", color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Add Teacher</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}