"use client";
import { createContext, useContext, useEffect, useState } from "react";


export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const authRequest = async (path, body) => {
    const res = await fetch(`${API_URL}/api/auth/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong");
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const login = (email, password) => authRequest("login", { email, password });
  const register = (form) => authRequest("register", form);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);