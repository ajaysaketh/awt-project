import { useState } from "react";

const colorOptions = ["#1a2c4e","#2e7d32","#e65100","#6a1b9a","#b71c1c","#00695c"];

const initialClasses = [
  { id: "ev1", name: "EV1", subject: "computer networks", room: "101", time: "9:00 AM",  color: "#1a2c4e", student_count: 10 },
  { id: "ev2", name: "EV2", subject: "c programming", room: "102", time: "10:00 AM", color: "#2e7d32", student_count: 11 },
  { id: "ev3", name: "EV3", subject: "operative systems", room: "103", time: "11:00 AM", color: "#e65100", student_count: 5 },
  { id: "ev4", name: "EV4", subject: "data structures", room: "104", time: "12:00 PM", color: "#6a1b9a", student_count: 4 },
  { id: "ev5", name: "EV5", subject: "database management", room: "105", time: "1:00 PM",  color: "#b71c1c", student_count: 6 },
  { id: "ev6", name: "EV6", subject: "software engineering", room: "106", time: "2:00 PM",  color: "#00695c", student_count: 5 },
  { id: "ev7", name: "EV7", subject: "artificial intelligence", room: "107", time: "3:00 PM",  color: "#1a2c4e", student_count: 4 },
  { id: "ev8", name: "EV8", subject: "machine learning", room: "108", time: "4:00 PM",  color: "#2e7d32", student_count: 3 },
];

export default function Classes() {
  const [classes,   setClasses]   = useState(initialClasses);
  const [search,    setSearch]    = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form,      setForm]      = useState({ name: "", subject: "", room: "", time: "9:00 AM", color: colorOptions[0] });
  const [formError, setFormError] = useState("");

  const handleAdd = () => {
    if (!form.name.trim()) { setFormError("Class name is required."); return; }
    const id = `class-${Date.now()}`;
    setClasses(prev => [...prev, { ...form, id, student_count: 0 }]);
    setShowModal(false);
    setForm({ name: "", subject: "", room: "", time: "9:00 AM", color: colorOptions[0] });
    setFormError("");
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this class?")) return;
    setClasses(prev => prev.filter(c => c.id !== id));
  };

  const filtered = classes.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.subject || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalStudents  = classes.reduce((s, c) => s + (c.student_count || 0), 0);
  const uniqueSubjects = new Set(classes.map(c => c.subject).filter(Boolean)).size;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1a2c4e" }}>🏫 Class Management</h2>
        <button onClick={() => setShowModal(true)} style={{ background: "#16a34a", color: "#fff", border: "none", borderRadius: 6, padding: "8px 18px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>+ Add Class</button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { icon: "🏫", value: classes.length, label: "Total Classes"   },
          { icon: "👨‍🎓", value: totalStudents,  label: "Total Students" },
          { icon: "📚", value: uniqueSubjects,  label: "Subjects"        },
        ].map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "20px", textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: 32 }}>{s.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#1a2c4e", margin: "4px 0" }}>{s.value}</div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ background: "#fff", borderRadius: 10, padding: "10px 16px", marginBottom: 24, display: "flex", alignItems: "center", gap: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
        <span>🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search classes..."
          style={{ border: "none", outline: "none", fontSize: 14, width: "100%", color: "#374151" }} />
      </div>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {filtered.map(cls => (
          <div key={cls.id} style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.09)" }}>
            <div style={{ background: cls.color || "#1a2c4e", padding: "16px 18px 14px" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{cls.name}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>{cls.subject}</div>
            </div>
            <div style={{ padding: "16px 18px" }}>
              {[
                ["👥", `${cls.student_count || 0} Students`],
                ["🏢", `Room ${cls.room || "-"}`],
                ["🕐", cls.time || "-"],
              ].map(([icon, text], i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7, fontSize: 13, color: "#374151" }}>
                  <span>{icon}</span> {text}
                </div>
              ))}
            </div>
            <div style={{ padding: "0 18px 16px" }}>
              <button onClick={() => handleDelete(cls.id)} style={{ width: "100%", background: "#fff", border: "1px solid #fca5a5", borderRadius: 8, padding: "8px 12px", cursor: "pointer", color: "#ef4444", fontSize: 13, fontWeight: 500 }}>
                🗑️ Delete Class
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 32, width: 420, boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
            <h2 style={{ margin: "0 0 20px", fontSize: 20, color: "#1a2c4e" }}>Add New Class</h2>
            {formError && (
              <div style={{ background: "#fee2e2", color: "#dc2626", borderRadius: 8, padding: "8px 12px", marginBottom: 14, fontSize: 13 }}>{formError}</div>
            )}
            {[
              { label: "Class Name", key: "name",    placeholder: "e.g. EV9" },
              { label: "Subject",    key: "subject", placeholder: "e.g. Electric Vehicles" },
              { label: "Room",       key: "room",    placeholder: "e.g. 109" },
              { label: "Time",       key: "time",    placeholder: "e.g. 9:00 AM" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, color: "#374151", fontWeight: 600, display: "block", marginBottom: 4 }}>{f.label}</label>
                <input type="text" placeholder={f.placeholder} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14, boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 13, color: "#374151", fontWeight: 600, display: "block", marginBottom: 6 }}>Card Color</label>
              <div style={{ display: "flex", gap: 8 }}>
                {colorOptions.map(c => (
                  <div key={c} onClick={() => setForm(p => ({ ...p, color: c }))}
                    style={{ width: 28, height: 28, borderRadius: "50%", background: c, cursor: "pointer", border: form.color === c ? "3px solid #000" : "3px solid transparent" }} />
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => { setShowModal(false); setFormError(""); }}
                style={{ flex: 1, padding: "10px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer" }}>Cancel</button>
              <button onClick={handleAdd}
                style={{ flex: 1, padding: "10px", borderRadius: 8, border: "none", background: "#16a34a", color: "#fff", cursor: "pointer", fontWeight: 600 }}>Add Class</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}