import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/auth.css";

function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    phone: "",
    aadhaar: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 1. Empty field validation
    if (!form.username || !form.password || !form.phone || !form.aadhaar) {
      setError("All fields are required");
      return;
    }

    // 🔹 2. Aadhaar validation (12 digits)
    if (!/^\d{12}$/.test(form.aadhaar)) {
      setError("Aadhaar number must be exactly 12 digits");
      return;
    }

    // 🔹 3. Phone validation (10 digits)
    if (!/^\d{10}$/.test(form.phone)) {
      setError("Mobile number must be exactly 10 digits");
      return;
    }

    try {
      await api.post("/api/register/", form);
      alert("Registration successful");
      navigate("/");
    } catch {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          placeholder="Aadhaar"
          value={form.aadhaar}
          onChange={(e) => setForm({ ...form, aadhaar: e.target.value })}
        />

        <button>Register</button>
      </form>

      {error && <p className="error">{error}</p>}

      <p className="link" onClick={() => navigate("/")}>
        Already have an account? Login
      </p>
    </div>
  );
}

export default Register;
