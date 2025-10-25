// src/pages/Login.jsx
import React from "react";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("token", "demo_token");
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <Input placeholder="Email" className="mb-3 w-72" />
      <Input.Password placeholder="Password" className="mb-6 w-72" />
      <Button
        type="primary"
        className="w-72"
        style={{ background: "#37B34A", borderColor: "#37B34A" }}
        onClick={handleLogin}
      >
        Login
      </Button>
    </div>
  );
}
