import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const allNavItems = [
  { label: "Dashboard",       icon: "📊", path: "/dashboard",       roles: ["Admin","Teacher","Student"] },
  { label: "Mark Attendance", icon: "✏️", path: "/mark-attendance", roles: ["Admin","Teacher"]           },
  { label: "View Attendance", icon: "👁️", path: "/view-attendance", roles: ["Admin","Teacher","Student"] },
  { label: "Students",        icon: "🎓", path: "/students",        roles: ["Admin"]                     },
  { label: "Classes",         icon: "🏫", path: "/classes",         roles: ["Admin"]                     },
  { label: "Teachers",        icon: "👨‍🏫", path: "/teachers",        roles: ["Admin"]                     },
  { label: "Reports",         icon: "📋", path: "/reports",         roles: ["Admin","Teacher","Student"] },
  { label: "Notifications",   icon: "🔔", path: "/notifications",   roles: ["Admin","Teacher","Student"] },
  { label: "Profile",         icon: "👤", path: "/profile",         roles: ["Admin","Teacher","Student"] },
];

export default function Sidebar() {
  const navigate            = useNavigate();
  const location            = useLocation();
  const { logout, currentUser } = useAuth();

  const role     = currentUser?.role || "Student";
  const navItems = allNavItems.filter(item => item.roles.includes(role));

  const roleColors = {
    Admin:   "#60a5fa",
    Teacher: "#34d399",
    Student: "#f59e0b",
  };

  const roleBadgeColor = roleColors[role] || "#60a5fa";

  return (
    <div style={{
      width: 160, background: "#1a2c4e", display: "flex", flexDirection: "column",
      position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 100,
    }}>
      <div style={{ padding: "18px 16px 14px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20 }}>📋</span>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>Attendance</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 10 }}>Management System</div>
          </div>
        </div>
        {/* Role badge */}
        <div style={{ marginTop: 10, background: "rgba(255,255,255,0.08)", borderRadius: 6, padding: "4px 8px", display: "inline-block" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: roleBadgeColor }}>
            {role === "Admin" ? "👑" : role === "Teacher" ? "👨‍🏫" : "🎓"} {role}
          </span>
        </div>
      </div>

      <nav style={{ flex: 1, padding: "10px 0", overflowY: "auto" }}>
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <div key={item.label} onClick={() => navigate(item.path)} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", cursor: "pointer",
              background: isActive ? "rgba(255,255,255,0.15)" : "transparent",
              borderLeft: isActive ? `3px solid ${roleBadgeColor}` : "3px solid transparent",
              color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
              fontSize: 13, fontWeight: isActive ? 600 : 400, transition: "all 0.15s",
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ fontSize: 15 }}>{item.icon}</span>
              {item.label}
            </div>
          );
        })}
      </nav>

      <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div onClick={logout} style={{
          display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", cursor: "pointer",
          background: "rgba(239,68,68,0.15)", borderRadius: 8, color: "#fca5a5", fontSize: 13, fontWeight: 600,
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.3)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.15)"}
        >
          <span>🚪</span> Logout
        </div>
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, marginTop: 10, textAlign: "center" }}>
          v1.0.0 © 2026
        </div>
      </div>
    </div>
  );
}