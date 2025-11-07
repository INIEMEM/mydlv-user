import React, { useState } from "react";
import { Form, Input, Button, Divider, message, Checkbox } from "antd";
import { useNavigate, useSearchParams, Navigate } from "react-router-dom";
import { GoogleOutlined, MobileOutlined, MailOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";

export default function Auth() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const mode = params.get("mode") || "login";
  const [step, setStep] = useState(1); // 1: Email, 2: OTP (signup only), 3: Passcode
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [passcode, setPasscode] = useState("");
  const [confirmPasscode, setConfirmPasscode] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const isLoggedIn = storedUser && storedUser.isAuthenticated;

  // Redirect if already authenticated
  if (isLoggedIn) return <Navigate to="/explore" replace />;

  const isLogin = mode === "login";

  // STEP 1: Email submission
  const handleEmailSubmit = (values) => {
    setEmail(values.email);
    
    if (isLogin) {
      // Login: go directly to passcode
      setStep(3);
    } else {
      // Signup: go to OTP verification
      message.success("OTP sent to your email!");
      setStep(2);
    }
  };

  // STEP 2: OTP Verification (Signup only)
  const handleOTPSubmit = () => {
    if (otp.length !== 6) {
      message.warning("Please enter the 6-digit OTP");
      return;
    }
    
    // In production, verify OTP with backend
    message.success("Email verified successfully!");
    setStep(3);
  };

  // STEP 3: Passcode (Login) or Set Passcode (Signup)
  const handlePasscodeSubmit = () => {
    if (isLogin) {
      // LOGIN FLOW
      if (passcode.length !== 4) {
        message.warning("Please enter your 4-digit passcode");
        return;
      }

      const savedUser = JSON.parse(localStorage.getItem("user") || "null");
      if (!savedUser || savedUser.email !== email || savedUser.passcode !== passcode) {
        message.error("Invalid email or passcode!");
        return;
      }

      // Successful login
      savedUser.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(savedUser));
      localStorage.setItem("token", "dummy-token-" + Date.now());
      message.success("Login successful!");
      navigate("/explore");
    } else {
      // SIGNUP FLOW
      if (passcode.length !== 4 || confirmPasscode.length !== 4) {
        message.warning("Please enter 4-digit passcodes");
        return;
      }

      if (passcode !== confirmPasscode) {
        message.error("Passcodes do not match!");
        return;
      }

      // Save new user
      const newUser = {
        email,
        passcode,
        isAuthenticated: true,
      };
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("token", "dummy-token-" + Date.now());
      message.success("Account created successfully!");
      navigate("/explore");
    }
  };

  // Social login placeholders
  const handleGoogleLogin = () => message.info("Google authentication coming soon!");
  const handleMobileLogin = () => message.info("Mobile authentication coming soon!");

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Form Section */}
      <div className="flex flex-1 items-center justify-center p-6 bg-[#DDDCDC]">
        <motion.div
          className="w-full max-w-md rounded-2xl p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <AnimatePresence mode="wait">
            {/* STEP 1: Email Input */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-center text-[#2B2B2B]">
                  {isLogin ? "Welcome Back " : "Let's get you started!"}
                </h2>

                {/* Social Buttons */}
                <div className="flex flex-col gap-3 mb-4">
                  <Button
                    icon={<GoogleOutlined />}
                    block
                    onClick={handleGoogleLogin}
                    style={{ backgroundColor: "#E8E8E8", padding: "20px 0" }}
                  >
                    Continue with Google
                  </Button>
                  <Button
                    icon={<MobileOutlined />}
                    block
                    onClick={handleMobileLogin}
                    style={{ backgroundColor: "#E8E8E8", padding: "20px 0" }}
                  >
                    {isLogin ? "Login" : "Sign Up"} with Mobile
                  </Button>
                </div>

                <div className="text-[#2B2B2B] py-[10px]">or {isLogin ? "login" : "sign up"} with email</div>
                
                <Form layout="vertical" onFinish={handleEmailSubmit}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      // { required: true, message: "Please enter your email" },
                      { type: "email", message: "Please enter a valid email" }
                    ]}
                  >
                    <Input style={{
                      backgroundColor: "#e8e8e8",
                    }}
                    //  prefix={<MailOutlined />}
                    className="py-3"
                      placeholder="Enter your email" size="large" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      size="large"
                      style={{
                        backgroundColor: "#2B2B2B",
                        borderColor: "#2B2B2B",
                        fontWeight: "500",
                      }}
                    >
                      Continue
                    </Button>
                  </Form.Item>
                  {!isLogin && (
                  <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject(new Error("You must agree to the terms and conditions")),
                      },
                    ]}
                  >
                    <Checkbox>
                      I agree to the{" "}
                      <a
                        href="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2B2B2B] "
                      >
                        Terms & Conditions
                      </a>
                    </Checkbox>
                  </Form.Item>
                )}
                  <div className=" text-sm">
                    {isLogin ? (
                      <>
                        Don't have an account?{" "}
                        <span
                          className="text-[#37B34A] cursor-pointer font-medium"
                          onClick={() => navigate("/auth?mode=signup")}
                        >
                          Sign Up
                        </span>
                      </>
                    ) : (
                      <>
                        Already have an account?{" "}
                        <span
                          className="text-[#37B34A] cursor-pointer font-medium"
                          onClick={() => navigate("/auth?mode=login")}
                        >
                          Login
                        </span>
                      </>
                    )}
                  </div>
                </Form>
                
              </motion.div>
            )}

            {/* STEP 2: OTP Verification (Signup Only) */}
            {step === 2 && !isLogin && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-center text-[#2B2B2B]">
                  Verify Your Email
                </h2>
                <p className="text-center text-gray-600 mb-6">
                  Enter the 6-digit code sent to<br />
                  <span className="font-medium">{email}</span>
                </p>

                <div className="mb-6">
                  <Input.OTP
                    length={6}
                    value={otp}
                    onChange={setOtp}
                    size="large"
                  />
                </div>

                <Button
                  type="primary"
                  block
                  size="large"
                  onClick={handleOTPSubmit}
                  style={{
                    backgroundColor: "#2B2B2B",
                    borderColor: "#2B2B2B",
                    fontWeight: "500",
                  }}
                >
                  Verify OTP
                </Button>

                <div className="text-center text-sm mt-4">
                  <span
                    className="text-[#37B34A] cursor-pointer font-medium"
                    onClick={() => message.info("OTP resent!")}
                  >
                    Resend OTP
                  </span>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Passcode */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-center text-[#2B2B2B]">
                  {isLogin ? "Enter Your Passcode" : "Set Your Passcode"}
                </h2>
                <p className="text-center text-gray-600 mb-6">
                  {isLogin 
                    ? "Enter your 4-digit passcode to continue"
                    : "Create a 4-digit passcode to secure your account"}
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      {isLogin ? "Passcode" : "Create Passcode"}
                    </label>
                    <Input.OTP
                      length={4}
                      value={passcode}
                      onChange={setPasscode}
                      size="large"
                    />
                  </div>

                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Confirm Passcode
                      </label>
                      <Input.OTP
                        length={4}
                        value={confirmPasscode}
                        onChange={setConfirmPasscode}
                        size="large"
                      />
                    </div>
                  )}
                </div>

                <Button
                  type="primary"
                  block
                  size="large"
                  onClick={handlePasscodeSubmit}
                  className="mt-6"
                  style={{
                    backgroundColor: "#2B2B2B",
                    borderColor: "#2B2B2B",
                    fontWeight: "500",
                  }}
                >
                  {isLogin ? "Login" : "Create Account"}
                </Button>

                {isLogin && (
                  <div className="text-center text-sm mt-4">
                    <span
                      className="text-[#37B34A] cursor-pointer font-medium"
                      onClick={() => message.info("Password reset coming soon!")}
                    >
                      Forgot Passcode?
                    </span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Image Section */}
      <div className="hidden md:flex w-1/2 h-full bg-gradient-to-br from-[#37B34A] to-[#2B9C3C] items-center justify-center">
        <div className="text-white text-center p-8">
          <h1 className="text-5xl font-bold mb-4">MyDLV</h1>
          <p className="text-xl">Your trusted delivery & handyman service</p>
        </div>
      </div>
    </div>
  );
}