import { Navigate } from "react-router-dom";

function ProtectedRoute({ auth, children }) {
  return auth ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
