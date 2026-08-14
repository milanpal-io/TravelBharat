
import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {

  const isLoggedIn =
    localStorage.getItem("travelbharat_admin") === "true";

  if (!isLoggedIn) {

    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );

  }

  return children;
}

export default AdminProtectedRoute;
