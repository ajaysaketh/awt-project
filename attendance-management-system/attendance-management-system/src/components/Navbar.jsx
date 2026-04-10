import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  const handleLogout = () => {
    logout();
  };

  return (
    <div style={{
      background: "#fff", borderBottom: "1px solid #e5e7eb",
      padding: "12px 24px", display: "flex", alignItems: "center",
      justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50,
    }}>
      <div>
        <div style={{ fontSize: 12, color: "#6b7280" }}>📅 {today}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ position: "relative", cursor: "pointer" }} onClick={() => navigate("/notifications")}>
          <span style={{ fontSize: 22 }}>🔔</span>
          <span style={{
            position: "absolute", top: -4, right: -4, background: "#ef4444", color: "#fff",
            borderRadius: "50%", fontSize: 9, fontWeight: 700, width: 16, height: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>3</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%", background: "#1a2c4e", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14,
          }}>
            {currentUser?.name?.charAt(0) || "A"}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1a2c4e" }}>{currentUser?.name || "Admin"}</div>
            <div style={{ fontSize: 11, color: "#6b7280" }}>{currentUser?.role || "Administrator"}</div>
          </div>
        </div>
        <button onClick={handleLogout} style={{
          background: "#ef4444", color: "#fff", border: "none", borderRadius: 7,
          padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600,
        }}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
