import { useState } from "react";

const initialProfile = {
  fullName: "Ajay Saketh",
  email: "ajay@school.com",
  phone: "9876543000",
  school: "Gujarat Higher Secondary School",
  city: "Rajkot",
  state: "Gujarat",
  role: "Admin",
};

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState("Edit Profile");
  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState(initialProfile);
  const [savedMsg, setSavedMsg] = useState("");

  // Change Password state
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [passMsg, setPassMsg] = useState("");

  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsAlerts: false,
    attendanceReminders: true,
    darkMode: false,
    language: "English",
  });

  const handleSaveProfile = () => {
    setProfile(editData);
    setEditing(false);
    setSavedMsg("Profile updated successfully!");
    setTimeout(() => setSavedMsg(""), 3000);
  };

  const handleChangePassword = () => {
    if (!passwords.current || !passwords.newPass || !passwords.confirm) {
      setPassMsg("Please fill all fields."); return;
    }
    if (passwords.newPass !== passwords.confirm) {
      setPassMsg("New passwords do not match."); return;
    }
    setPassMsg("Password changed successfully!");
    setPasswords({ current: "", newPass: "", confirm: "" });
    setTimeout(() => setPassMsg(""), 3000);
  };

  const tabs = ["Edit Profile", "Change Password", "Settings"];

  return (
    <div style={{ minHeight: "100vh", background: "#f0f4f8", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e0e0e0", padding: "12px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <button style={{ background: "#374151", color: "#fff", border: "none", borderRadius: 6, padding: "6px 14px", cursor: "pointer", fontSize: 13 }}>← Back</button>
        <span style={{ fontSize: 20, fontWeight: 700, color: "#1a2c4e" }}>👤 Profile & Settings</span>
      </div>

      <div style={{ padding: "24px" }}>
        {/* Profile Banner */}
        <div style={{ background: "linear-gradient(135deg, #1a2c4e 0%, #2d4a7a 100%)", borderRadius: 14, padding: "28px 32px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 800, color: "#fff", border: "3px solid rgba(255,255,255,0.3)" }}>
              A
            </div>
            <div>
              <div style={{ color: "#fff", fontSize: 22, fontWeight: 800 }}>{profile.fullName}</div>
              <span style={{ background: "#16a34a", color: "#fff", borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>Admin</span>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, marginTop: 6 }}>🏫 {profile.school}</div>
              <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13 }}>📍 {profile.city}, {profile.state}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            {[{ label: "Classes", value: 10 }, { label: "Students", value: 326 }, { label: "Teachers", value: 9 }].map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "12px 20px", textAlign: "center", minWidth: 70 }}>
                <div style={{ color: "#fff", fontSize: 22, fontWeight: 800 }}>{s.value}</div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "9px 20px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
                background: activeTab === tab ? "#1a2c4e" : "#fff",
                color: activeTab === tab ? "#fff" : "#374151",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
              }}
            >
              {["✏️", "🔑", "⚙️"][i]} {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ background: "#fff", borderRadius: 14, padding: "28px 32px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>

          {/* Edit Profile Tab */}
          {activeTab === "Edit Profile" && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h3 style={{ margin: 0, color: "#1a2c4e", fontSize: 16 }}>Personal Information</h3>
                {!editing ? (
                  <button onClick={() => { setEditing(true); setEditData(profile); }} style={{ background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: 7, padding: "7px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                    ✏️ Edit Profile
                  </button>
                ) : (
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => setEditing(false)} style={{ background: "#f3f4f6", color: "#374151", border: "none", borderRadius: 7, padding: "7px 16px", cursor: "pointer", fontSize: 13 }}>Cancel</button>
                    <button onClick={handleSaveProfile} style={{ background: "#16a34a", color: "#fff", border: "none", borderRadius: 7, padding: "7px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Save Changes</button>
                  </div>
                )}
              </div>
              {savedMsg && <div style={{ background: "#f0fdf4", color: "#16a34a", borderRadius: 8, padding: "8px 14px", marginBottom: 18, fontSize: 13, fontWeight: 600 }}>✅ {savedMsg}</div>}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, marginBottom: 18 }}>
                {[
                  { label: "Full Name", key: "fullName" },
                  { label: "Email Address", key: "email" },
                  { label: "Phone Number", key: "phone" },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 5 }}>{f.label}</label>
                    <input
                      value={editing ? editData[f.key] : profile[f.key]}
                      onChange={e => setEditData(p => ({ ...p, [f.key]: e.target.value }))}
                      disabled={!editing}
                      style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14, background: editing ? "#fff" : "#f9fafb", color: "#374151", boxSizing: "border-box" }}
                    />
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, marginBottom: 18 }}>
                {[
                  { label: "School Name", key: "school" },
                  { label: "City", key: "city" },
                  { label: "State", key: "state" },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 5 }}>{f.label}</label>
                    <input
                      value={editing ? editData[f.key] : profile[f.key]}
                      onChange={e => setEditData(p => ({ ...p, [f.key]: e.target.value }))}
                      disabled={!editing}
                      style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14, background: editing ? "#fff" : "#f9fafb", color: "#374151", boxSizing: "border-box" }}
                    />
                  </div>
                ))}
              </div>
              <div style={{ maxWidth: 200 }}>
                <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 5 }}>Role</label>
                <input value={profile.role} disabled style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14, background: "#f9fafb", color: "#374151", boxSizing: "border-box" }} />
              </div>
            </>
          )}

          {/* Change Password Tab */}
          {activeTab === "Change Password" && (
            <>
              <h3 style={{ margin: "0 0 24px", color: "#1a2c4e", fontSize: 16 }}>🔑 Change Password</h3>
              {passMsg && (
                <div style={{ background: passMsg.includes("success") ? "#f0fdf4" : "#fef2f2", color: passMsg.includes("success") ? "#16a34a" : "#dc2626", borderRadius: 8, padding: "8px 14px", marginBottom: 18, fontSize: 13, fontWeight: 600 }}>
                  {passMsg.includes("success") ? "✅" : "❌"} {passMsg}
                </div>
              )}
              <div style={{ maxWidth: 420, display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  { label: "Current Password", key: "current" },
                  { label: "New Password", key: "newPass" },
                  { label: "Confirm New Password", key: "confirm" },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 5 }}>{f.label}</label>
                    <input
                      type="password"
                      value={passwords[f.key]}
                      onChange={e => setPasswords(p => ({ ...p, [f.key]: e.target.value }))}
                      style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14, boxSizing: "border-box" }}
                      placeholder="••••••••"
                    />
                  </div>
                ))}
                <button onClick={handleChangePassword} style={{ background: "#1a2c4e", color: "#fff", border: "none", borderRadius: 8, padding: "11px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
                  Update Password
                </button>
              </div>
            </>
          )}

          {/* Settings Tab */}
          {activeTab === "Settings" && (
            <>
              <h3 style={{ margin: "0 0 24px", color: "#1a2c4e", fontSize: 16 }}>⚙️ Preferences</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 500 }}>
                {[
                  { label: "Email Notifications", sub: "Receive notifications via email", key: "emailNotifications" },
                  { label: "SMS Alerts", sub: "Get SMS alerts for low attendance", key: "smsAlerts" },
                  { label: "Attendance Reminders", sub: "Daily reminders to mark attendance", key: "attendanceReminders" },
                  { label: "Dark Mode", sub: "Switch to dark theme", key: "darkMode" },
                ].map(s => (
                  <div key={s.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderRadius: 10, border: "1px solid #e5e7eb", background: "#fafafa" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#1a2c4e" }}>{s.label}</div>
                      <div style={{ fontSize: 12, color: "#9ca3af" }}>{s.sub}</div>
                    </div>
                    <div
                      onClick={() => setSettings(p => ({ ...p, [s.key]: !p[s.key] }))}
                      style={{ width: 44, height: 24, borderRadius: 99, background: settings[s.key] ? "#16a34a" : "#d1d5db", cursor: "pointer", position: "relative", transition: "background 0.2s" }}
                    >
                      <div style={{ position: "absolute", top: 3, left: settings[s.key] ? 22 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", transition: "left 0.2s" }} />
                    </div>
                  </div>
                ))}
                <div style={{ padding: "14px 18px", borderRadius: 10, border: "1px solid #e5e7eb", background: "#fafafa" }}>
                  <label style={{ fontSize: 14, fontWeight: 600, color: "#1a2c4e", display: "block", marginBottom: 8 }}>Language</label>
                  <select
                    value={settings.language}
                    onChange={e => setSettings(p => ({ ...p, language: e.target.value }))}
                    style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14, width: "100%" }}
                  >
                    {["English", "Hindi", "Gujarati"].map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
