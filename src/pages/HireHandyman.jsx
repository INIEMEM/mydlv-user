import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input, Button, DatePicker, message, Card } from "antd";
import { motion } from "framer-motion";

export default function HireHandyman() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleHire = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Hire request sent successfully!");
      navigate(`/handyman/${id}`);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-6 space-y-6"
    >
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Hire Handyman
      </h1>

      <Card className="rounded-2xl shadow-sm border-gray-100 space-y-4">
        <Input placeholder="Full Name" size="large" />
        <Input placeholder="Phone Number" size="large" />
        <Input placeholder="Service Needed (e.g. Fix light switch)" size="large" />
        <DatePicker
          showTime
          className="w-full"
          size="large"
          placeholder="Select Date & Time"
        />
        <Input.TextArea
          rows={4}
          placeholder="Additional details..."
          size="large"
        />

        <div className="flex gap-3 justify-end pt-2">
          <Button onClick={() => navigate(-1)} className="rounded-lg">
            Cancel
          </Button>
          <Button
            type="primary"
            loading={loading}
            onClick={handleHire}
            style={{
              backgroundColor: "#37B34A",
              borderColor: "#37B34A",
              borderRadius: "8px",
            }}
          >
            Confirm Hire
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
