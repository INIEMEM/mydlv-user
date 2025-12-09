import React, { useState, useContext } from "react";
import { Form, Input, Button, message, Checkbox } from "antd";
import { useNavigate, useSearchParams, Navigate } from "react-router-dom";
import { GoogleOutlined, MobileOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { MainContext } from "../context/Context";
import { useToast } from "../context/ToastContext";
import { Icon } from '@iconify/react';
// import Logo from '../assets/Logo.png';
export default function Auth() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const mode = params.get("mode") || "login";
  const { baseUrl, setToken, token } = useContext(MainContext);
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  // const isLoggedIn = storedUser && storedUser.isAuthenticated;

  // if (isLoggedIn) return <Navigate to="/" replace />;

  const isLogin = mode === "login";

  // STEP 1 — EMAIL SUBMIT
  const handleEmailSubmit = async (values) => {
    const userEmail = values.email;
    setEmail(userEmail);
    setLoadingEmail(true);

    try {
      if (isLogin) {
        const res = await axios.post(`${baseUrl}auth/login-attempt`, {
          email: userEmail,
        });

        if (res.data.success) {
          toast.success("OTP sent to your email.");
          setStep(2);
        }
      } else {
        const res = await axios.post(`${baseUrl}auth/register`, {
          email: userEmail,
          address: 'no 362 nwaniba road, uyo, nigeria'
        });

        if (res.data.success) {
          toast.success("OTP sent to your email.");
          setStep(2);
        }
      }
    } catch (error) {
      console.log(error?.response?.data?.error);
      toast.error(error?.response?.data?.error);
    } finally {
      setLoadingEmail(false);
    }
  };

  // STEP 2 — OTP SUBMIT
  const handleOTPSubmit = async () => {
    if (otp.length !== 6) {
      toast.warning("Enter the 6-digit OTP");
      return;
    }

    setLoadingOtp(true);

    try {
      if (!isLogin) {
        const res = await axios.post(`${baseUrl}auth/verify`, {
          token: otp,
        });

        if (res.data.success) {
          toast.success("Account verified. Logging you in...");
          // localStorage.setItem(
          //   "user",
          //   JSON.stringify({ email, isAuthenticated: true })
          // );
          setStep(1); 
          navigate("/auth?mode=login"); 
        }
      } else {
        const res = await axios.post(`${baseUrl}auth/login`, {
          token: otp,
        });

        if (res.data.success) {
          toast.success("Login successful!");
          localStorage.setItem(
            "user",
            JSON.stringify({ email, isAuthenticated: true })
          );
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid OTP. Try again.");
    } finally {
      setLoadingOtp(false);
    }
  };

  // RESEND OTP
  const resendOtp = async () => {
    setLoadingResend(true);

    try {
      await axios.post(`${baseUrl}auth/sendotp`, { email });
      toast.success("OTP resent!");
    } catch (err) {
      toast.error("Could not resend OTP.");
    } finally {
      setLoadingResend(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);

    try {
      const res = await axios.get(
        "https://mydlv.onrender.com/api/v1/auth/register/google"
      );
      if (res.data.success && res.data.url) window.location.href = res.data.url;
    } catch {
      toast.error("Google login failed.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row h-screen bg-gray-50">
      
      <div className="relative flex flex-1 items-center justify-center  md:p-6 bg-[#DDDCDC]">
      <div className="hidden lg:block absolute top-10 left-[130px] 2xl:left-[300px]">
       {/* <img src={Logo} className="h-[50px] w-[150px]  object-contain"/> */}
      </div>
        <motion.div
          className="w-full max-w-md rounded-2xl p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AnimatePresence mode="wait">
            
            {/* STEP 1 — EMAIL */}
            {step === 1 && (
              <motion.div
                key="email"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-3xl font-semibold mb-6  text-[#2B2B2B]">
                  {isLogin ? "Welcome back" : "Create an account"}
                </h2>

                {/* SOCIAL BUTTONS */}
                <div className="flex flex-col gap-3 mb-4">
                <Button
                  icon={<Icon icon="flat-color-icons:google" width="30" height="30" />}
                  block
                  loading={googleLoading}
                  onClick={handleGoogleLogin}
                  style={{
                    backgroundColor: "#E8E8E8",
                    padding: "25px 20px",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "8px",
                    borderRadius: '10px',
                    color: '#666464',
                    fontSize: '12px',
                  }}
              >
                Continue with Google
              </Button>

              <Button
                icon={<Icon icon="mdi:cellphone" width="30" height="30" />}
                block
                style={{
                  backgroundColor: "#E8E8E8",
                  padding: "25px 20px",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: '10px',
                  color: '#666464',
                  fontSize: '12px',
                }}
              >
                {isLogin ? "Login" : "Sign Up"} with Mobile
              </Button>

                </div>

                <div className=" text-[#2B2B2B] py-2">
                  or continue with email
                </div>

                <Form layout="vertical" onFinish={handleEmailSubmit}>
                  <Form.Item
                    name="email"
                
                    rules={[{ type: "email", message: "Enter a valid email" }]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter email"
                      style={{ 
                        backgroundColor: "#E8E8E8",
                        padding: " 10px",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "8px",
                        borderRadius: '10px',
                        color: '#666464',
                      }}
                    />
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
                              : Promise.reject(
                                  "You must accept Terms & Conditions"
                                ),
                        },
                      ]}
                    >
                      <Checkbox>
                        I agree to the{" "}
                        <a
                          href="/terms"
                          target="_blank"
                          className="text-[#2B2B2B]"
                        >
                          Terms & Conditions
                        </a>
                      </Checkbox>
                    </Form.Item>
                  )}

                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    size="large"
                    loading={loadingEmail}
                    style={{ backgroundColor: "#2B2B2B" }}
                  >
                    Continue
                  </Button>

                  <div className="text-sm mt-4 ">
                    {isLogin ? (
                      <>
                        Don't have an account?{" "}
                        <span
                          className="text-[#37B34A] cursor-pointer"
                          onClick={() => navigate("/auth?mode=signup")}
                        >
                          Sign Up
                        </span>
                      </>
                    ) : (
                      <>
                        Already have an account?{" "}
                        <span
                          className="text-[#37B34A] cursor-pointer"
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

            {/* STEP 2 — OTP */}
            {step === 2 && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-3xl font-semibold mb-4 text-center text-[#2B2B2B]">
                  Enter OTP
                </h2>

                <p className="text-center text-gray-600 mb-6">
                  We sent a 6-digit code to{" "}
                  <span className="font-medium">{email}</span>
                </p>

                <Input.OTP
                  length={6}
                  value={otp}
                  onChange={setOtp}
                  size="large"
                  className="mb-6 otp-field"
                  
                />

                <Button
                  block
                  size="large"
                  loading={loadingOtp}
                  onClick={handleOTPSubmit}
                  style={{ backgroundColor: "#2B2B2B", color: "#fff", marginTop: '20px' }}
                >
                  Verify OTP
                </Button>

                <div className="text-center text-sm mt-4">
                  <span
                    onClick={resendOtp}
                    className="text-[#37B34A] cursor-pointer"
                  >
                    {loadingResend ? "Sending..." : "Resend OTP"}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="hidden md:flex w-1/2 h-full bg-gradient-to-br from-[#37B34A] to-[#2B9C3C] items-center justify-center">
        <div className="text-white text-center p-8">
          <h1 className="text-5xl font-bold mb-4">MyDLV</h1>
          <p className="text-xl">Your trusted delivery & handyman service</p>
        </div>
      </div>
    </div>
  );
}
