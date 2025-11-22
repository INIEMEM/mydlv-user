import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { MainContext } from "../context/Context";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(MainContext);
  
  // Check both context token and localStorage as fallback
  const isAuthenticated = token || localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  

  return children;
}
