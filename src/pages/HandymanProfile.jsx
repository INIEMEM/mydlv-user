import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Rate, Card, Tag } from "antd";
import { motion } from "framer-motion";

export default function HandymanProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ⚙️ Temporary demo data
  const handyman = {
    id,
    name: "John Emmanuel",
    role: "Electrician",
    rating: 4.9,
    reviews: 128,
    jobs: 200,
    priceFrom: "₦3,500",
    distance: "1.2km away",
    image: "https://images.unsplash.com/photo-1581091012184-7d92f0a0cf02",
    description:
      "Experienced electrician specializing in home wiring, repairs, and installations. Fast, reliable, and affordable services with customer satisfaction guaranteed.",
    skills: ["Wiring", "Lighting", "Repair", "Installation", "Safety Checks"],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-6 p-6"
    >
      {/* 👤 Profile Header */}
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <img
          src={handyman.image}
          alt={handyman.name}
          className="w-full sm:w-60 h-60 object-cover rounded-2xl shadow-md"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-800">
            {handyman.name}
          </h1>
          <p className="text-gray-500 mb-2">{handyman.role}</p>

          <div className="flex items-center gap-3">
            <Rate allowHalf disabled value={handyman.rating} />
            <span className="text-gray-600 text-sm">
              ({handyman.reviews} reviews)
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            Completed {handyman.jobs} jobs • {handyman.distance}
          </p>

          <p className="text-[#37B34A] font-medium mt-1">
            From {handyman.priceFrom}
          </p>

          <div className="mt-4 flex gap-3">
            <Button
              onClick={() => navigate(-1)}
              className="border-gray-300 rounded-lg"
            >
              Go Back
            </Button>
            <Button
              type="primary"
              style={{
                backgroundColor: "#37B34A",
                borderColor: "#37B34A",
                borderRadius: "8px",
              }}
              onClick={() => navigate(`/hire/${handyman.id}`)}
            >
              Hire Now
            </Button>
          </div>
        </div>
      </div>

      {/* 🧰 About Section */}
      <Card title="About" className="rounded-2xl shadow-sm border-gray-100">
        <p className="text-gray-700 leading-relaxed">{handyman.description}</p>
      </Card>

      {/* 🔧 Skills */}
      <Card title="Skills" className="rounded-2xl shadow-sm border-gray-100">
        <div className="flex flex-wrap gap-2">
          {handyman.skills.map((skill, i) => (
            <Tag key={i} color="green">
              {skill}
            </Tag>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
