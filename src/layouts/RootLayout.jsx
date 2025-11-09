// src/layout/AppLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen ">
      {/* You can add a header or bottom nav here */}
      <Outlet />
    </div>
  );
}
