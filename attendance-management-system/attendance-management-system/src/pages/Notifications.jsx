import { useState, useEffect } from "react";
import { getNotifications, markNotifRead, markAllNotifsRead, deleteNotif, clearAllNotifs } from "../utils/api";

const typeConfig = {
  warning: { icon: "⚠️", bg: "#fffbeb", border: "#fde68a", leftBorder: "#f59e0b" },
  success: { icon: "✅", bg: "#f0fdf4", border: "#bbf7d0", leftBorder: "#16a34a" },
  info:    { icon: "ℹ️", bg: "#ffffff", border: "#e5e7eb", leftBorder: "#3b82f6" },
  danger:  { icon: "🚨", bg: "#fff5f5", border: "#fecaca", leftBorder: "#ef4444" },
};

const FILTERS = ["All", "Unread", "Read", "Warning", "Success", "Info", "Danger"];

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [activeFilter,  setActiveFilter]  = useState("All");
  const [loading,       setLoading]       = useState(true);

  useEffect(() => { fetchNotifications(); }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    try { await markNotifRead(id); await fetchNotifications(); }
    catch (err) { console.error(err); }
  };

  const handleMarkAllRead = async () => {
    try { await markAllNotifsRead(); await fetchNotifications(); }
    catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    try { await deleteNotif(id); await fetchNotifications(); }
    catch (err) { console.error(err); }
  };

  const handleClearAll = async () => {
    if (!window.confirm("Clear all notifications?")) return;
    try { await clearAllNotifs(); await fetchNotifications(); }
    catch (err) { console.error(err); }
  };

  const unread   = notifications.filter(n => !n.is_read).length;
  const warnings = notifications.filter(n => n.type === "warning").length;
  const critical = notifications.filter(n => n.type === "danger").length;

  const filtered = notifications.filter(n => {
    if (activeFilter === "All")    return true;
    if (activeFilter === "Unread") return !n.is_read;
    if (activeFilter === "Read")   return n.is_read;
    return n.type === activeFilter.toLowerCase();
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1a2c4e" }}>🔔 Notifications</h2>
          {unread > 0 && <span style={{ background: "#ef4444", color: "#fff", borderRadius: 12, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>{unread} unread</span>}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={handleMarkAllRead} style={{ background: "#16a34a", color: "#fff", border: "none", borderRadius: 7, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>✅ Mark All Read</button>
          <button onClick={handleClearAll}    style={{ background: "#ef4444", color: "#fff", border: "none", borderRadius: 7, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>🗑️ Clear All</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { icon: "🔔", value: notifications.length, label: "Total",    border: "#2563eb" },
          { icon: "🔴", value: unread,               label: "Unread",   border: "#ef4444" },
          { icon: "⚠️", value: warnings,             label: "Warnings", border: "#f59e0b" },
          { icon: "🚨", value: critical,             label: "Critical", border: "#ef4444" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "20px", textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", border: `1.5px solid ${s.border}` }}>
            <div style={{ fontSize: 30 }}>{s.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.border, margin: "4px 0" }}>{s.value}</div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setActiveFilter(f)} style={{ padding: "6px 16px", borderRadius: 20, border: "1.5px solid #d1d5db", cursor: "pointer", fontSize: 13, fontWeight: 600, background: activeFilter === f ? "#1a2c4e" : "#fff", color: activeFilter === f ? "#fff" : "#374151" }}>
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: "#6b7280" }}>Loading...</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.length === 0 && <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>No notifications found.</div>}
          {filtered.map(n => {
            const cfg = typeConfig[n.type] || typeConfig.info;
            return (
              <div key={n.id} style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, borderLeft: `4px solid ${cfg.leftBorder}`, borderRadius: 10, padding: "14px 18px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14, flex: 1 }}>
                  <span style={{ fontSize: 20, marginTop: 2 }}>{cfg.icon}</span>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, fontSize: 14, color: "#1a2c4e" }}>{n.title}</span>
                      {!n.is_read && <span style={{ background: "#ef4444", color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 4, padding: "1px 6px" }}>NEW</span>}
                    </div>
                    <p style={{ margin: "0 0 6px", fontSize: 13, color: "#4b5563" }}>{n.message}</p>
                    <span style={{ fontSize: 12, color: "#9ca3af" }}>🕐 {n.created_at}</span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, minWidth: 110 }}>
                  {!n.is_read && (
                    <button onClick={() => handleMarkRead(n.id)} style={{ background: "#fff", border: "1px solid #d1d5db", borderRadius: 6, padding: "5px 10px", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#374151", whiteSpace: "nowrap" }}>✅ Mark Read</button>
                  )}
                  <button onClick={() => handleDelete(n.id)} style={{ background: "#fff", border: "1px solid #fca5a5", borderRadius: 6, padding: "5px 10px", cursor: "pointer", fontSize: 13, color: "#ef4444" }}>🗑️</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
