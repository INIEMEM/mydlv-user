import React from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "antd";
import {  ToolOutlined, ClockCircleOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import foodHero from "../assets/food-delivery-hero.jpg";
import handymanService from "../assets/handyman-service.jpg";
import "@fontsource/poppins";
// 🔹 Motion Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const Index = () => {
  return (
    <motion.div
      className="min-h-screen bg-background"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={fadeIn}
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {/* 🟩 Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/20">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.div
            className="flex flex-col items-center text-center space-y-8"
            variants={fadeUp}
          >
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Your Daily Needs,
                <span className="text-[#37B34A] block mt-2">Delivered & Done</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
                From delicious meals to home repairs, we bring convenience right to your doorstep
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth?mode=signup">
                <Button
                  type="primary"
                  size="large"
                  className="font-semibold shadow-md hover:shadow-lg transition-all"
                  style={{
                    backgroundColor: "#37B34A",
                    borderColor: "#37B34A",
                    fontFamily: "Poppins, sans-serif"
                  }}
                >
                  Get Started
                </Button>
              </Link>

              <Link to="/auth?mode=login">
                <Button
                  size="large"
                  className="font-semibold border-gray-300 hover:border-[#37B34A] hover:text-[#37B34A]"
                  style={{fontFamily: "Poppins, sans-serif"}}
                >
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8 pt-8 w-full max-w-2xl"
              variants={fadeUp}
            >
              {[
                { number: "500+", label: "Restaurants" },
                { number: "200+", label: "Handymen" },
                { number: "10k+", label: "Happy Users" },
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-3xl md:text-4xl font-bold text-[#37B34A]">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 🧰 Services Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Two Services, One App
            </h2>
            <p className="text-gray-500 text-lg">
              Everything you need for a comfortable life
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* 🍲 Food Delivery Card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card
                hoverable
                className="overflow-hidden border-2 hover:shadow-xl transition-all rounded-2xl"
                cover={
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={foodHero}
                      alt="Fresh food delivery"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                }
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#37B34A]/10 rounded-lg">
                      {/* <UtensilsOutlined className="text-[#37B34A] text-lg" /> */}
                    </div>
                    <h3 className="text-2xl font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>Food Delivery</h3>
                  </div>
                  <p className="text-gray-500" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Order from hundreds of restaurants and get your favorite meals delivered fresh to your door in minutes.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <ClockCircleOutlined className="text-[#37B34A]" />
                      <span style={{ fontFamily: "Poppins, sans-serif" }}>30-45 min delivery</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <EnvironmentOutlined className="text-[#37B34A]" />
                      <span style={{ fontFamily: "Poppins, sans-serif" }}>Track in real-time</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </motion.div>

            {/* 🛠 Handyman Services Card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card
                hoverable
                className="overflow-hidden border-2 hover:shadow-xl transition-all rounded-2xl"
                cover={
                  <div className="aspect-video overflow-hidden bg-gray-50 flex items-center justify-center">
                    <img
                      src={handymanService}
                      alt="Professional handyman services"
                      className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                }
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#37B34A]/10 rounded-lg">
                      <ToolOutlined className="text-[#37B34A] text-lg" />
                    </div>
                    <h3 className="text-2xl font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>Handyman Services</h3>
                  </div>
                  <p className="text-gray-500" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Book verified professionals for all your home repair and maintenance needs with ease.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <ClockCircleOutlined className="text-[#37B34A]" />
                      <span style={{ fontFamily: "Poppins, sans-serif" }}>Same-day booking</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <EnvironmentOutlined className="text-[#37B34A]" />
                      <span style={{ fontFamily: "Poppins, sans-serif" }}>Verified professionals</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 💬 CTA Section */}
      <motion.section
        className="py-16 md:py-24 bg-gradient-to-br from-[#37B34A]/10 to-green-200/20"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-500">
              Join thousands of satisfied customers who trust us for their daily needs
            </p>
            <Link to="/auth?mode=signup">
              <Button
                type="primary"
                size="large"
                className="font-semibold shadow-md hover:shadow-lg transition-all"
                style={{
                  backgroundColor: "#37B34A",
                  borderColor: "#37B34A",
                  fontFamily: "Poppins, sans-serif"
                }}
              >
                Create Your Account
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Index;
