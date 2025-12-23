import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/auth.css";

function Profile({ setAuth }) {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/profile/")
      .then((res) => setProfile(res.data))
      .catch(() => navigate("/"));
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("access");
    setAuth(false);
    navigate("/");
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Profile</h2>
      <p><b>Username:</b> {profile.username}</p>
      <p><b>Phone:</b> {profile.phone}</p>
      <p><b>Aadhaar:</b> {profile.aadhaar}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Profile;
