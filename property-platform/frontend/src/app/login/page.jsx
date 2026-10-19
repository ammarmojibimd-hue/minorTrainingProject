"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login, register } = useAuth();
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", role: "owner" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isSignup) await register(form);
      else await login(form.email, form.password);
      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
      <form onSubmit={submit} style={{ background: "#fff", padding: 32, borderRadius: 12, width: 380, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
        <h2 style={{ margin: 0 }}>🏢 UrbanHaven</h2>
        <p style={{ color: "#64748b", fontSize: 14, margin: "4px 0 20px" }}>
          {isSignup ? "Naya account banayein" : "Apne account me login karein"}
        </p>

        {isSignup && (
          <>
            <input name="name" placeholder="Full name" onChange={change} required style={inp} />
            <input name="phone" placeholder="Phone" onChange={change} style={inp} />
            <select name="role" value={form.role} onChange={change} style={inp}>
              <option value="owner">Owner</option>
              <option value="tenant">Tenant</option>
            </select>
          </>
        )}
        <input name="email" type="email" placeholder="Email" onChange={change} required style={inp} />
        <input name="password" type="password" placeholder="Password" onChange={change} required style={inp} />

        {error && <p style={{ color: "#dc2626", fontSize: 13, margin: "0 0 10px" }}>{error}</p>}

        <button type="submit" disabled={loading} style={btn}>
          {loading ? "Please wait..." : isSignup ? "Sign Up" : "Login"}
        </button>

        <p style={{ textAlign: "center", fontSize: 13, marginTop: 14, color: "#64748b" }}>
          {isSignup ? "Account hai?" : "Account nahi hai?"}{" "}
          <span onClick={() => setIsSignup(!isSignup)} style={{ color: "#4f46e5", cursor: "pointer", fontWeight: 600 }}>
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
}

const inp = { width: "100%", padding: 10, marginBottom: 12, border: "1px solid #cbd5e1", borderRadius: 8, boxSizing: "border-box", fontSize: 14 };
const btn = { width: "100%", padding: 12, background: "#4f46e5", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" };