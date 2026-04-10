import { useState } from "react";

const monthlyData = [
  { month: "Sep", present: 85, absent: 15 },
  { month: "Oct", present: 78, absent: 22 },
  { month: "Nov", present: 90, absent: 10 },
  { month: "Dec", present: 70, absent: 30 },
  { month: "Jan", present: 88, absent: 12 },
  { month: "Feb", present: 92, absent: 8  },
];

const byClassData = [
  { class: "EV1", attendance: 95 },
  { class: "EV2", attendance: 80 },
  { class: "EV3", attendance: 72 },
  { class: "EV4", attendance: 60 },
  { class: "EV5", attendance: 88 },
  { class: "EV6", attendance: 91 },
  { class: "EV7", attendance: 76 },
  { class: "EV8", attendance: 83 },
];

const byStudentData = [
  { name: "Santosh", class: "EV1", attendance: 60 },
  { name: "Charan",  class: "EV2", attendance: 75 },
  { name: "Priya",   class: "EV3", attendance: 68 },
  { name: "Arun",    class: "EV4", attendance: 55 },
  { name: "Meena",   class: "EV5", attendance: 72 },
  { name: "Ravi",    class: "EV1", attendance: 80 },
  { name: "Kavya",   class: "EV6", attendance: 91 },
  { name: "Suresh",  class: "EV7", attendance: 74 },
];

const tabs     = ["Monthly Trend", "By Class", "By Student", "Overview"];
const tabIcons = ["📅", "🏫", "👨‍🎓", "🔵"];

const getBarColor = (val) => {
  if (val >= 80) return "#16a34a";
  if (val >= 70) return "#f59e0b";
  return "#ef4444";
};

// Simple CSS Bar Chart
function BarChartCSS({ data, valueKey, labelKey, maxValue = 100 }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 220, padding: "0 8px" }}>
      {data.map((item, i) => {
        const val = item[valueKey];
        const pct = (val / maxValue) * 100;
        return (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#374151" }}>{val}{typeof val === "number" && "%"}</div>
            <div style={{ width: "100%", height: 180, display: "flex", alignItems: "flex-end" }}>
              <div style={{
                width: "100%", height: `${pct}%`,
                background: getBarColor(val),
                borderRadius: "4px 4px 0 0",
                transition: "height 0.3s ease",
                minHeight: 4,
              }} />
            </div>
            <div style={{ fontSize: 11, color: "#6b7280", textAlign: "center" }}>{item[labelKey]}</div>
          </div>
        );
      })}
    </div>
  );
}

// Monthly stacked bars
function MonthlyChart({ data }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 220, padding: "0 8px" }}>
      {data.map((item, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ width: "100%", height: 180, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#ef4444", marginBottom: 2 }}>{item.absent}</div>
            <div style={{ width: "80%", height: `${item.absent * 1.6}px`, background: "#ef4444", borderRadius: "4px 4px 0 0" }} />
            <div style={{ width: "80%", height: `${item.present * 1.6}px`, background: "#16a34a" }} />
            <div style={{ fontSize: 10, fontWeight: 700, color: "#16a34a", marginTop: 2 }}>{item.present}</div>
          </div>
          <div style={{ fontSize: 11, color: "#6b7280" }}>{item.month}</div>
        </div>
      ))}
    </div>
  );
}

// Pie Chart using conic-gradient
function PieChartCSS({ present, absent }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 40, justifyContent: "center" }}>
      <div style={{
        width: 180, height: 180, borderRadius: "50%",
        background: `conic-gradient(#16a34a 0% ${present}%, #ef4444 ${present}% 100%)`,
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
      }} />
      <div>
        {[{ color: "#16a34a", label: "Present", value: present },
          { color: "#ef4444", label: "Absent",  value: absent  }].map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 16, height: 16, borderRadius: 4, background: d.color }} />
            <div>
              <div style={{ fontSize: 24, fontWeight: 800, color: d.color }}>{d.value}%</div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>{d.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Reports() {
  const [activeTab, setActiveTab] = useState("Monthly Trend");
  const belowThreshold = byStudentData.filter(s => s.attendance <= 75);

  return (
    <div>
      {/* Page Title */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1a2c4e" }}>📝 Reports & Analytics</h2>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { icon: "📊", value: "81%", label: "Overall Attendance", color: "#2563eb", border: "#2563eb" },
          { icon: "🏆", value: "EV1", label: "Best Class",         color: "#16a34a", border: "#16a34a" },
          { icon: "⚠️", value: "EV4", label: "Needs Attention",    color: "#dc2626", border: "#dc2626" },
          { icon: "👨‍🎓", value: "120", label: "Total Students",   color: "#ea580c", border: "#ea580c" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "20px", textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", borderTop: `3px solid ${s.border}` }}>
            <div style={{ fontSize: 30 }}>{s.icon}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: s.color, margin: "4px 0" }}>{s.value}</div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ background: "#fff", borderRadius: 10, padding: "10px 16px", marginBottom: 24, display: "flex", gap: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
        {tabs.map((tab, i) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
            background: activeTab === tab ? "#1a2c4e" : "#f3f4f6",
            color: activeTab === tab ? "#fff" : "#374151",
            transition: "all 0.2s",
          }}>
            {tabIcons[i]} {tab}
          </button>
        ))}
      </div>

      {/* Chart Area */}
      <div style={{ background: "#fff", borderRadius: 14, padding: "24px", marginBottom: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>

        {activeTab === "Monthly Trend" && (
          <>
            <h3 style={{ margin: "0 0 8px", color: "#1a2c4e", fontSize: 16 }}>Monthly Attendance Trend</h3>
            <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6b7280" }}>
                <div style={{ width: 12, height: 12, borderRadius: 2, background: "#16a34a" }} /> Present
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6b7280" }}>
                <div style={{ width: 12, height: 12, borderRadius: 2, background: "#ef4444" }} /> Absent
              </div>
            </div>
            <MonthlyChart data={monthlyData} />
          </>
        )}

        {activeTab === "By Class" && (
          <>
            <h3 style={{ margin: "0 0 20px", color: "#1a2c4e", fontSize: 16 }}>Attendance by Class</h3>
            <BarChartCSS data={byClassData} valueKey="attendance" labelKey="class" />
            <div style={{ display: "flex", gap: 16, marginTop: 12, justifyContent: "center" }}>
              {[["#16a34a","≥80% Good"],["#f59e0b","70–79% Average"],["#ef4444","<70% At Risk"]].map(([c,l]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6b7280" }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: c }} />{l}
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "By Student" && (
          <>
            <h3 style={{ margin: "0 0 20px", color: "#1a2c4e", fontSize: 16 }}>Student Attendance Overview</h3>
            <BarChartCSS data={byStudentData} valueKey="attendance" labelKey="name" />
          </>
        )}

        {activeTab === "Overview" && (
          <>
            <h3 style={{ margin: "0 0 20px", color: "#1a2c4e", fontSize: 16 }}>Overall Attendance Overview</h3>
            <PieChartCSS present={81} absent={19} />
          </>
        )}
      </div>

      {/* Students Below 75% */}
      <div style={{ background: "#fff", borderRadius: 14, padding: "20px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", border: "1px solid #fef3c7" }}>
        <h3 style={{ margin: "0 0 16px", color: "#d97706", fontSize: 15 }}>⚠️ Students Below 75% Attendance</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#1a2c4e" }}>
              {["Name", "Class", "Attendance", "Status"].map(h => (
                <th key={h} style={{ padding: "10px 16px", textAlign: "left", color: "#fff", fontSize: 13, fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {belowThreshold.map((s, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f3f4f6", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "12px 16px", fontSize: 14, color: "#374151" }}>{s.name}</td>
                <td style={{ padding: "12px 16px", fontSize: 14, color: "#374151" }}>{s.class}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{
                    background: s.attendance < 65 ? "#fee2e2" : "#fef3c7",
                    color: s.attendance < 65 ? "#dc2626" : "#d97706",
                    borderRadius: 20, padding: "3px 12px", fontSize: 13, fontWeight: 700,
                  }}>{s.attendance}%</span>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ background: "#fef3c7", color: "#d97706", borderRadius: 20, padding: "3px 12px", fontSize: 13, fontWeight: 600 }}>
                    ⚠️ At Risk
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
