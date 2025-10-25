import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // for redirect
import OnboardingImage1 from "../assets/o1.png";
import OnboardingImage2 from "../assets/mydlv2.png";
import OnboardingImage3 from "../assets/mydlv3.png";

const steps = [
  {
    id: 1,
    title: "Discover Delicious Meals",
    description:
      "Browse through a wide selection of local and continental dishes from top-rated restaurants near you.",
    image: OnboardingImage1,
  },
  {
    id: 2,
    title: "Order & Get It Delivered",
    description:
      "Enjoy fast and reliable delivery right to your doorstep. Fresh meals, delivered hot and on time.",
    image: OnboardingImage2,
  },
  {
    id: 3,
    title: "Hire Trusted Handymen",
    description:
      "Need repairs or help at home? Find skilled handymen ready to serve you instantly.",
    image: OnboardingImage3,
  },
];

export default function Onboarding({ onFinish }) {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  // 🧠 Check if user has seen onboarding before
  useEffect(() => {
    const hasSeen = localStorage.getItem("hasSeenOnboarding");
    if (hasSeen) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem("hasSeenOnboarding", "true");
      onFinish?.();
      navigate("/login");
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSkip = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    onFinish?.();
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      {/* Skip Button */}
      <div className="w-full max-w-md flex justify-end mb-4">
        <Button type="link" onClick={handleSkip} className="text-gray-500">
          Skip
        </Button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={steps[step].id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <img
            src={steps[step].image}
            alt={steps[step].title}
            className="w-full h-[50vh] object-cover md:h-auto mx-auto mb-6"
          />
          <h1 className="text-2xl font-semibold text-gray-800 mb-3">
            {steps[step].title}
          </h1>
          <p className="text-gray-500 mb-8">{steps[step].description}</p>
        </motion.div>
      </AnimatePresence>

      {/* Pagination Dots */}
      <div className="flex space-x-2 mb-8">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === step ? "w-5 bg-[#37B34A]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between w-full max-w-md">
        <Button
          type="default"
          shape="round"
          icon={<ArrowLeftOutlined />}
          disabled={step === 0}
          onClick={handlePrev}
        >
          Back
        </Button>

        <Button
          type="primary"
          shape="round"
          icon={<ArrowRightOutlined />}
          style={{
            backgroundColor: "#37B34A",
            borderColor: "#37B34A",
          }}
          onClick={handleNext}
        >
          {step === steps.length - 1 ? "Get Started" : "Next"}
        </Button>
      </div>
    </div>
  );
}
