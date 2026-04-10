import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStudents, getTeachers, getClasses, getNotifications } from "../utils/api";
import { useAuth } from "../context/AuthContext";

const quickActions = [
  { label: "Mark Attendance", icon: "✏️", bg: "#1a2c4e", path: "/mark-attendance" },
  { label: "View Attendance", icon: "👁️", bg: "#0ea5e9", path: "/view-attendance" },
  { label: "Students",        icon: "🎓", bg: "#16a34a", path: "/students" },
  { label: "Reports",         icon: "📊", bg: "#ea580c", path: "/reports" },
  { label: "Classes",         icon: "🏫", bg: "#7c3aed", path: "/classes" },
  { label: "Teachers",        icon: "👨‍🏫", bg: "#db2777", path: "/teachers" },
  { label: "Notifications",   icon: "🔔", bg: "#ef4444", path: "/notifications" },
  { label: "Profile",         icon: "👤", bg: "#16a34a", path: "/profile" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({ students: 0, teachers: 0, classes: 0, notifications: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [students, teachers, classes, notifs] = await Promise.all([
          getStudents(), getTeachers(), getClasses(), getNotifications()
        ]);
        setStats({
          students:      students.length,
          teachers:      teachers.length,
          classes:       classes.length,
          notifications: notifs.filter(n => !n.is_read).length,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { icon: "🎓", value: stats.students,      label: "Total Students",       border: "#e5e7eb", color: "#1a2c4e" },
    { icon: "👨‍🏫", value: stats.teachers,     label: "Total Teachers",       border: "#16a34a", color: "#16a34a" },
    { icon: "🏫", value: stats.classes,        label: "Total Classes",        border: "#2563eb", color: "#2563eb" },
    { icon: "🔔", value: stats.notifications,  label: "Unread Notifications", border: "#ef4444", color: "#ef4444" },
  ];

  return (
    <div>
      {/* Welcome Banner */}
      <div style={{ background: "linear-gradient(135deg, #1a2c4e 0%, #2d4a7a 100%)", borderRadius: 14, padding: "24px 28px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ color: "#fff", fontSize: 22, fontWeight: 700 }}>Welcome back, {currentUser?.name}! 👋</div>
          <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, marginTop: 4 }}>Here is what is happening today.</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 36 }}>🏫</span>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>Gujarat Higher Secondary</div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12 }}>Academic Year 2025-26</div>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {statCards.map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "20px 22px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", border: `2px solid ${s.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 32 }}>{s.icon}</div>
              <div style={{ fontSize: 13, color: "#6b7280", marginTop: 6 }}>{s.label}</div>
            </div>
            <div style={{ fontSize: 34, fontWeight: 800, color: s.color }}>
              {loading ? "..." : s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ background: "#fff", borderRadius: 14, padding: "20px 22px", marginBottom: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#1a2c4e", marginBottom: 16 }}>⚡ Quick Actions</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {quickActions.map(a => (
            <div key={a.label} onClick={() => navigate(a.path)} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "22px 10px", borderRadius: 12, border: "1px solid #f3f4f6", cursor: "pointer", background: "#fafafa", transition: "all 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: a.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 10 }}>{a.icon}</div>
              <div style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{a.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
