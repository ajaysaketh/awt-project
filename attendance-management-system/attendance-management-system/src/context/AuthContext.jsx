import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const validUsers = [
  { email: "admin@school.com",   password: "admin123",   role: "Admin",   name: "Ajay Saketh"   },
  { email: "ramesh@school.com",  password: "teacher123", role: "Teacher", name: "Ramesh Patel"  },
  { email: "sunita@school.com",  password: "teacher123", role: "Teacher", name: "Sunita Sharma" },
  { email: "vijay@school.com",   password: "teacher123", role: "Teacher", name: "Vijay Mehta"   },
  { email: "santosh@school.com", password: "student123", role: "Student", name: "Santosh"       },
  { email: "ravi@school.com",    password: "student123", role: "Student", name: "Ravi"          },
  { email: "charan@school.com",  password: "student123", role: "Student", name: "Charan"        },
  { email: "priya@school.com",   password: "student123", role: "Student", name: "Priya"         },
  { email: "arun@school.com",    password: "student123", role: "Student", name: "Arun"          },
  { email: "meena@school.com",   password: "student123", role: "Student", name: "Meena"         },
  { email: "kavya@school.com",   password: "student123", role: "Student", name: "Kavya"         },
  { email: "suresh@school.com",  password: "student123", role: "Student", name: "Suresh"        },
];

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email, password, role) => {
    const user = validUsers.find(
      u => u.email === email && u.password === password && u.role === role
    );
    if (user) {
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}