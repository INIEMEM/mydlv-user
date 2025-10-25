import React, { useEffect, useState } from "react";
import { Form, Input, Button, Divider, message } from "antd";
import { useNavigate, useSearchParams, Navigate } from "react-router-dom";
import { GoogleOutlined, MobileOutlined, MailOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import authImage from "../assets/auth-image.jpeg"; 

export default function Auth() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const mode = params.get("mode") || "login";
  const [isLogin, setIsLogin] = useState(mode === "login");

  const user = JSON.parse(localStorage.getItem("user"));
  if (user) return <Navigate to="/home" replace />;

  useEffect(() => {
    setIsLogin(mode === "login");
  }, [mode]);

  const onFinish = (values) => {
    localStorage.setItem("user", JSON.stringify(values));
    message.success(isLogin ? "Login successful!" : "Signup successful!");
    navigate("/home");
  };

  const handleGoogleLogin = () => {
    message.info("Google authentication coming soon!");
  };

  const handleMobileLogin = () => {
    message.info("Mobile authentication coming soon!");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Left Image Section */}
      <div className="hidden md:flex w-1/2 h-full">
        <img
          src={authImage}
          alt="Auth illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Form Section */}
      <div className="flex flex-1 items-center justify-center p-6">
        <motion.div
          className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-[#37B34A]">
            {isLogin ? "Welcome Back 👋" : "Create Your Account"}
          </h2>

          {/* Social Login Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <Button
              icon={<GoogleOutlined />}
              block
              onClick={handleGoogleLogin}
            >
              Continue with Google
            </Button>
            <Button
              icon={<MobileOutlined />}
              block
              onClick={handleMobileLogin}
            >
              {isLogin ? "Login" : "Sign Up"} with Mobile
            </Button>
          </div>

          <Divider plain>or {isLogin ? "login" : "sign up"} with email</Divider>

          <Form layout="vertical" onFinish={onFinish}>
            {!isLogin && (
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Enter your full name" />
              </Form.Item>
            )}

            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input prefix={<MailOutlined />} placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                style={{
                  backgroundColor: "#37B34A",
                  borderColor: "#37B34A",
                  fontWeight: "500",
                }}
              >
                {isLogin ? "Login" : "Sign Up"}
              </Button>
            </Form.Item>

            <p className="text-center text-sm">
              {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
              <span
                className="text-[#37B34A] cursor-pointer font-medium"
                onClick={() =>
                  navigate(`/auth?mode=${isLogin ? "signup" : "login"}`)
                }
              >
                {isLogin ? "Sign Up" : "Login"}
              </span>
            </p>
          </Form>
        </motion.div>
      </div>
    </div>
  );
}
