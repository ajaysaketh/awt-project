const BASE_URL = "http://localhost:5000/api";

const getToken = () => localStorage.getItem("token");

const request = async (endpoint, method = "GET", body = null) => {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const config = { method, headers };
  if (body) config.body = JSON.stringify(body);
  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Something went wrong");
  return data;
};

export const loginAPI = (email, password) =>
  request("/auth/login", "POST", { email, password });

export const getStudents   = ()         => request("/students");
export const addStudent    = (data)     => request("/students", "POST", data);
export const updateStudent = (id, data) => request(`/students/${id}`, "PUT", data);
export const deleteStudent = (id)       => request(`/students/${id}`, "DELETE");

export const getTeachers         = ()            => request("/teachers");
export const addTeacher          = (data)        => request("/teachers", "POST", data);
export const updateTeacherStatus = (id, status)  => request(`/teachers/${id}/status`, "PUT", { status });
export const deleteTeacher       = (id)          => request(`/teachers/${id}`, "DELETE");

export const getClasses  = ()     => request("/classes");
export const addClass    = (data) => request("/classes", "POST", data);
export const deleteClass = (id)   => request(`/classes/${id}`, "DELETE");

export const getAttendance    = (className, date) => request(`/attendance?class=${className || ""}&date=${date || ""}`);
export const markAttendance   = (data) => request("/attendance/mark", "POST", data);
export const getReport        = ()     => request("/attendance/report");
export const getStudentReport = (id)   => request(`/attendance/student/${id}`);

export const getNotifications  = ()   => request("/notifications");
export const markNotifRead     = (id) => request(`/notifications/${id}/read`, "PUT");
export const markAllNotifsRead = ()   => request("/notifications/read-all", "PUT");
export const deleteNotif       = (id) => request(`/notifications/${id}`, "DELETE");
export const clearAllNotifs    = ()   => request("/notifications", "DELETE");