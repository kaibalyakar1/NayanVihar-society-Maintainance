import React from "react";
import { Navigate, useLocation } from "react-router-dom"; // Import useLocation here

const PrivateRoute = ({ element, allowedRoles }) => {
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("role");
  const location = useLocation();

  alert("Token:", token);
  alert("Role:", role);

  // Check if token is present
  if (!token) {
    console.log("No token, redirecting to /login-signup");
    return <Navigate to="/login-signup" state={{ from: location }} />;
  }

  // Check if role is allowed
  if (!allowedRoles.includes(role)) {
    console.log("Role not allowed, redirecting to /login-signup");
    return <Navigate to="/login-signup" />;
  }

  return element;
};

export default PrivateRoute;
