import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const roles = [
  { label: "Admin",   icon: "👑",  email: "admin@school.com",   password: "admin123"   },
  { label: "Teacher", icon: "👨‍🏫", email: "ramesh@school.com",  password: "teacher123" },
  { label: "Student", icon: "🎓",  email: "santosh@school.com", password: "student123" },
];

const roleHints = {
  Admin:   { email: "admin@school.com",   password: "admin123",   extra: ""                               },
  Teacher: { email: "ramesh@school.com",  password: "teacher123", extra: "sunita / vijay also work"       },
  Student: { email: "santosh@school.com", password: "student123", extra: "ravi / charan / priya also work" },
};

const allCredentials = [
  { email: "admin@school.com",   pass: "admin123",   role: "👑", roleLabel: "Admin"   },
  { email: "ramesh@school.com",  pass: "teacher123", role: "👨‍🏫", roleLabel: "Teacher" },
  { email: "sunita@school.com",  pass: "teacher123", role: "👨‍🏫", roleLabel: "Teacher" },
  { email: "vijay@school.com",   pass: "teacher123", role: "👨‍🏫", roleLabel: "Teacher" },
  { email: "santosh@school.com", pass: "student123", role: "🎓", roleLabel: "Student" },
  { email: "ravi@school.com",    pass: "student123", role: "🎓", roleLabel: "Student" },
  { email: "charan@school.com",  pass: "student123", role: "🎓", roleLabel: "Student" },
  { email: "priya@school.com",   pass: "student123", role: "🎓", roleLabel: "Student" },
];

export default function Login() {
  const [role,     setRole]     = useState("Admin");
  const [email,    setEmail]    = useState("admin@school.com");
  const [password, setPassword] = useState("admin123");
  const [error,    setError]    = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const { login } = useAuth();

  const handleRoleSwitch = (r) => {
    setRole(r.label);
    setEmail(r.email);
    setPassword(r.password);
    setError("");
  };

  const handleCredentialClick = (u) => {
    setEmail(u.email);
    setPassword(u.pass);
    setRole(u.roleLabel);
    setError("");
  };

  const handleLogin = async () => {
    setLoading(true);
    const success = await login(email, password, role);
    setLoading(false);
    if (!success) setError("Invalid credentials. Check email/password for selected role.");
    else setError("");
  };

  const hint = roleHints[role];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1a3a5c 0%, #2d6a9f 50%, #1a3a5c 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: "40px 40px 36px", width: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 52 }}>📋</div>
          <h2 style={{ margin: "8px 0 4px", fontSize: 24, fontWeight: 800, color: "#1a2c4e" }}>Attendance System</h2>
          <p style={{ margin: 0, fontSize: 14, color: "#6b7280" }}>Sign in to your account</p>
        </div>

        {/* Role Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, background: "#f3f4f6", borderRadius: 10, padding: 4 }}>
          {roles.map(r => (
            <button key={r.label} onClick={() => handleRoleSwitch(r)}
              style={{ flex: 1, padding: "9px 0", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, background: role === r.label ? "#1a2c4e" : "transparent", color: role === r.label ? "#fff" : "#6b7280", transition: "all 0.2s" }}>
              {r.icon} {r.label}
            </button>
          ))}
        </div>

        {/* Email */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, color: "#374151", fontWeight: 600, display: "block", marginBottom: 6 }}>🔵 Email Address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: 14, boxSizing: "border-box", outline: "none" }}
            placeholder="Enter your email" />
        </div>

        {/* Password */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, color: "#374151", fontWeight: 600, display: "block", marginBottom: 6 }}>🔒 Password</label>
          <div style={{ position: "relative" }}>
            <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
              style={{ width: "100%", padding: "11px 44px 11px 14px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: 14, boxSizing: "border-box", outline: "none" }}
              placeholder="••••••••" />
            <button onClick={() => setShowPass(!showPass)}
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#9ca3af" }}>
              {showPass ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* Hint / Error Box */}
        <div style={{ background: error ? "#fef2f2" : "#f9fafb", borderRadius: 8, padding: "9px 14px", marginBottom: 20, fontSize: 12, textAlign: "center" }}>
          {error ? (
            <span style={{ color: "#ef4444" }}>❌ {error}</span>
          ) : (
            <div style={{ color: "#6b7280" }}>
              <div>💡 <strong>{hint.email}</strong> / {hint.password}</div>
              {hint.extra && <div style={{ marginTop: 3, fontSize: 11, color: "#9ca3af" }}>({hint.extra})</div>}
            </div>
          )}
        </div>

        {/* Login Button */}
        <button onClick={handleLogin} disabled={loading}
          style={{ width: "100%", padding: "13px", borderRadius: 10, border: "none", background: "#1a2c4e", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", opacity: loading ? 0.7 : 1 }}>
          {loading ? "⏳ Logging in..." : `🚀 Login as ${role}`}
        </button>

        {/* All credentials list */}
        <div style={{ marginTop: 20, background: "#f8fafc", borderRadius: 10, padding: "12px 16px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#1a2c4e", marginBottom: 8 }}>📋 All Login Credentials:</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 12px" }}>
            {allCredentials.map((u, i) => (
              <div key={i}
                onClick={() => handleCredentialClick(u)}
                style={{ fontSize: 10, color: "#6b7280", padding: "4px 6px", cursor: "pointer", borderRadius: 4, transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#e5e7eb"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                {u.role} {u.email}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 6, textAlign: "center" }}>
            👆 Click any email to auto-fill + switch role
          </div>
        </div>

      </div>
    </div>
  );
}