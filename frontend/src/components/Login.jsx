import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/auth.css";

function Login({ setAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/token/", { username, password });
      localStorage.setItem("access", res.data.access);
      setAuth(true);
      navigate("/profile");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button>Login</button>
      </form>

      {error && <p className="error">{error}</p>}

      <p className="link" onClick={() => navigate("/register")}>
        New user? Register
      </p>
    </div>
  );
}

export default Login;
