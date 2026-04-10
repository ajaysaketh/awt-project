import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Sidebar from "./components/sidebar";
import Navbar from "./components/Navbar";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import MarkAttendance from "./pages/MarkAttendance";
import ViewAttendance from "./pages/ViewAttendance";
import Students from "./pages/student";
import Reports from "./pages/Reports";
import Classes from "./pages/Classes";
import Teachers from "./pages/Teachers";
import Notifications from "./pages/Notifications";
import Profile from "./pages/profile";

function ProtectedRoute({ element, roles }) {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/" />;
  if (!roles.includes(currentUser.role)) return <Navigate to="/dashboard" />;
  return element;
}

function AppContent() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", marginLeft: 160 }}>
        <Navbar />
        <div style={{ flex: 1, padding: "24px", overflowY: "auto" }}>
          <Routes>
            <Route path="/"                element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard"       element={<ProtectedRoute element={<Dashboard />}       roles={["Admin","Teacher","Student"]} />} />
            <Route path="/mark-attendance" element={<ProtectedRoute element={<MarkAttendance />}  roles={["Admin","Teacher"]}           />} />
            <Route path="/view-attendance" element={<ProtectedRoute element={<ViewAttendance />}  roles={["Admin","Teacher","Student"]} />} />
            <Route path="/students"        element={<ProtectedRoute element={<Students />}        roles={["Admin"]}                     />} />
            <Route path="/classes"         element={<ProtectedRoute element={<Classes />}         roles={["Admin"]}                     />} />
            <Route path="/teachers"        element={<ProtectedRoute element={<Teachers />}        roles={["Admin"]}                     />} />
            <Route path="/reports"         element={<ProtectedRoute element={<Reports />}         roles={["Admin","Teacher","Student"]} />} />
            <Route path="/notifications"   element={<ProtectedRoute element={<Notifications />}   roles={["Admin","Teacher","Student"]} />} />
            <Route path="/profile"         element={<ProtectedRoute element={<Profile />}         roles={["Admin","Teacher","Student"]} />} />
            <Route path="*"               element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}