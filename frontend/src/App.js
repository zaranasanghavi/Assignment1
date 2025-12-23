import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem("access"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setAuth={setAuth} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute auth={auth}>
              <Profile setAuth={setAuth} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
