import Sidebar from "./sidebar";
import Navbar from "./Navbar";

export default function PageLayout({ children, title }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f0f4f8" }}>
      <Sidebar />
      <div style={{ marginLeft: 160, flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar title={title} />
        <div style={{ padding: "24px", flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
