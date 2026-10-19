'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_URL } from '../context/AuthContext';

export default function AddListingPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "", location: "", price: "", image: "", description: "", amenities: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) router.push("/login");
  }, [router]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/listings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          amenities: form.amenities.split(",").map((a) => a.trim()).filter(Boolean),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Listing add nahi hui");
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="listing-form-card" style={{ maxWidth: 500, margin: "40px auto", padding: 28, background: "#e6f0ff", borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
      <h2 style={{ marginTop: 0 }}>Add New Listing</h2>
      <form onSubmit={submit}>
        <input name="title" placeholder="Property title" onChange={change} required style={inp} />
        <input name="location" placeholder="Location (e.g. Juhu, Mumbai, India)" onChange={change} required style={inp} />
        <input name="price" type="number" placeholder="Rent per month (₹)" onChange={change} required style={inp} />
        <input name="image" placeholder="Image URL" onChange={change} required style={inp} />
        <textarea name="description" placeholder="Description" onChange={change} rows={3} style={inp} />
        <input name="amenities" placeholder="Amenities (comma se alag karo: Gym, Parking, Pool)" onChange={change} style={inp} />
        {error && <p style={{ color: "#dc2626", fontSize: 13 }}>{error}</p>}
        <button type="submit" style={{ width: "100%", padding: 12, background: "#4f46e5", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>
          Add Listing
        </button>
      </form>
    </div>
  );
}

const inp = { width: "100%", padding: 10, marginBottom: 12, border: "1px solid #cbd5e1", borderRadius: 8, boxSizing: "border-box", fontSize: 14 };
