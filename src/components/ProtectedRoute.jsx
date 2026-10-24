import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Jika tidak ada token, tendang pengguna ke halaman login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Opsional: Jika role tidak sesuai (misal butuh role 'admin')
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Jika terautentikasi, tampilkan halaman turunan (Outlet)
  return <Outlet />;
}