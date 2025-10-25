import React from "react";
import { Input, Button } from "antd";
import { motion } from "framer-motion";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import ResturantImages from "../assets/resturants.jpg";
import LocalMarketsImage from "../assets/localmarket.jpg";
import SuperMarket from "../assets/supermarket.jpg";

const categories = [
  { name: "Restaurants", emoji: "🍽️", img: ResturantImages },
  { name: "Supermarkets", emoji: "🛒", img: SuperMarket },
  { name: "Local Markets", emoji: "🥬", img: LocalMarketsImage },
  { name: "Pharmacies", emoji: "💊", img: "https://images.unsplash.com/photo-1584466977773-e625c37cdd50" },
  { name: "Electronics", emoji: "⚡", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c" },
  { name: "Fashion", emoji: "👗", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c" },
  { name: "Delivery", emoji: "🚚", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe" },
  { name: "More", emoji: "➕", img: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
];
const bestSelling = [
  {
    title: "Jollof Rice & Chicken",
    price: "₦2,500",
    img: "https://images.unsplash.com/photo-1604908811875-4e8a9a1d51d5",
  },
  {
    title: "Beef Burger Combo",
    price: "₦3,200",
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
  {
    title: "Pizza Supreme",
    price: "₦4,800",
    img: "https://images.unsplash.com/photo-1548365328-9bdbb06a58b1",
  },
  {
    title: "Sharwama Deluxe",
    price: "₦2,200",
    img: "https://images.unsplash.com/photo-1601924582971-d6ec2ef1b1b8",
  },
];

const foodItems = [
  {
    title: "Jollof Rice & Chicken",
    price: "₦2,500",
    img: "https://images.unsplash.com/photo-1604908811875-4e8a9a1d51d5",
  },
  {
    title: "Beef Burger Combo",
    price: "₦3,200",
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
  {
    title: "Pizza Supreme",
    price: "₦4,800",
    img: "https://images.unsplash.com/photo-1548365328-9bdbb06a58b1",
  },
  {
    title: "Grilled Fish & Chips",
    price: "₦3,000",
    img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add",
  },
  {
    title: "Sharwama Deluxe",
    price: "₦2,200",
    img: "https://images.unsplash.com/photo-1601924582971-d6ec2ef1b1b8",
  },
];


const featuredItems = [
  {
    title: "🔥 20% Off All Meals",
    desc: "Order from top restaurants around you and save more!",
    img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
  },
  {
    title: "🧰 Hire a Handyman",
    desc: "Electricians, plumbers, and more at your service anytime.",
    img: "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
  },
  {
    title: "🛒 Fresh Groceries Delivered",
    desc: "Shop from trusted supermarkets and get them in minutes!",
    img: "https://images.unsplash.com/photo-1585325701954-1319b5d2d27b",
  },
  {
    title: "🚚 Express Delivery Available",
    desc: "Need it fast? Choose our 1-hour express delivery option.",
    img: "https://images.unsplash.com/photo-1618220169936-1c9a0d47f9a6",
  },
];

const handymanServices = [
  {
    name: "Electrician",
    icon: "💡",
    img: "https://images.unsplash.com/photo-1581091012184-7d92f0a0cf02",
  },
  {
    name: "Plumber",
    icon: "🔧",
    img: "https://images.unsplash.com/photo-1581579188871-45ea61f2a0c8",
  },
  {
    name: "Cleaner",
    icon: "🧹",
    img: "https://images.unsplash.com/photo-1590402494682-3d5a262c9a2c",
  },
  {
    name: "Painter",
    icon: "🎨",
    img: "https://images.unsplash.com/photo-1590099543480-9d5c9b3fda3e",
  },
  {
    name: "Mechanic",
    icon: "🔩",
    img: "https://images.unsplash.com/photo-1581093588401-22b5b6a5b91b",
  },
];
const tophandymanServices = [
  {
    id: 1,
    name: "John E.",
    role: "Electrician",
    rating: 4.9,
    jobs: 124,
    priceFrom: "₦3,500",
    distance: "1.2km",
    img: "https://images.unsplash.com/photo-1581091012184-7d92f0a0cf02",
  },
  {
    id: 2,
    name: "Aisha K.",
    role: "Plumber",
    rating: 4.8,
    jobs: 98,
    priceFrom: "₦2,800",
    distance: "0.8km",
    img: "https://images.unsplash.com/photo-1581579188871-45ea61f2a0c8",
  },
  {
    id: 3,
    name: "Emmanuel O.",
    role: "Cleaner",
    rating: 4.7,
    jobs: 210,
    priceFrom: "₦1,500",
    distance: "2.0km",
    img: "https://images.unsplash.com/photo-1590402494682-3d5a262c9a2c",
  },
  {
    id: 4,
    name: "Grace T.",
    role: "Painter",
    rating: 4.6,
    jobs: 55,
    priceFrom: "₦4,000",
    distance: "3.4km",
    img: "https://images.unsplash.com/photo-1590099543480-9d5c9b3fda3e",
  },
  {
    id: 5,
    name: "Sam U.",
    role: "Mechanic",
    rating: 4.5,
    jobs: 72,
    priceFrom: "₦4,500",
    distance: "1.9km",
    img: "https://images.unsplash.com/photo-1581093588401-22b5b6a5b91b",
  },
];

const moreFood = [
  {
    title: "Grilled Fish & Chips",
    price: "₦3,000",
    img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add",
  },
  {
    title: "Spaghetti Bolognese",
    price: "₦2,800",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  },
  {
    title: "Vegetable Soup & Fufu",
    price: "₦2,000",
    img: "https://images.unsplash.com/photo-1599021655144-1b6a34e0bde7",
  },
  {
    title: "Fried Rice Special",
    price: "₦2,700",
    img: "https://images.unsplash.com/photo-1565958011705-44e21147d44c",
  },
];

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

export default function Explore() {
  const navigate = useNavigate();
  return (
    <div className="space-y-12">
      {/* 🏷️ Page Title */}
      <h1 className="text-2xl font-semibold text-gray-800 text-[#444]">Explore</h1>

      {/* 🔍 Search Bar */}
      <Input
        size="large"
        placeholder="Search for restaurants, services, or markets..."
        prefix={<SearchOutlined className="text-gray-400" />}
        className="max-w-xl border-gray-300 rounded-xl"
      />

      {/* 🟩 Categories + CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6 items-start">
        {/* LEFT */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative rounded-2xl overflow-hidden shadow-sm cursor-pointer"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="h-36 w-full object-cover brightness-75"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white font-semibold text-lg">
                <span className="text-3xl mb-1">{cat.emoji}</span>
                {cat.name}
              </div>
            </motion.div>
          ))}
        </div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-8 flex flex-col justify-center shadow-md border border-gray-100"
        >
          <h2 className="text-2xl font-semibold mb-4 leading-snug text-gray-800 text-[#444]">
            Improve your shopping <br /> experience with <br />
            <span className="text-[#37B34A] font-bold">AI powered</span> shopping list
          </h2>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            style={{
              backgroundColor: "#37B34A",
              borderColor: "#37B34A",
              borderRadius: "10px",
            }}
            className="mt-2"
          >
            Go to shopping list
          </Button>
        </motion.div>
      </div>
      
      {/* 🍱 Best Selling Food Items */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-5 text-[#444]">
          Best Selling Food Items
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSelling.map((food, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
            >
              <img
                src={food.img}
                alt={food.title}
                className="h-40 w-full object-cover rounded-xl mb-3"
              />
              <h4 className="font-semibold text-[#444]">{food.title}</h4>
              <p className="text-[#37B34A] font-medium mt-1">{food.price}</p>
              <Button
                type="primary"
                size="small"
                style={{
                  backgroundColor: "#37B34A",
                  borderColor: "#37B34A",
                  borderRadius: "8px",
                }}
                className="mt-3"
              >
                Add to Cart
              </Button>
            </motion.div>
          ))}
        </div>
      </section>
      {/* 🌀 Carousel: Discover More */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-3 text-[#444]">
          Discover More
        </h2>
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={3500}
          keyBoardControl
          customTransition="all 0.7s ease"
          transitionDuration={800}
        >
          {featuredItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="relative rounded-2xl overflow-hidden shadow-md mx-2 cursor-pointer"
            >
              <img
                src={item.img}
                alt={item.title}
                className="h-64 w-full object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4 text-white">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm opacity-90">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </Carousel>
      </div>
       {/* 🧰 Top Rated Handymen */}
       <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Top Rated Handymen
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tophandymanServices.map((h) => (
            <motion.div
              key={h.id}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col"
            >
              <img
                src={h.img}
                alt={h.name}
                className="h-40 w-full object-cover rounded-xl mb-3"
              />
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">{h.name}</h3>
                    <p className="text-sm text-gray-500">{h.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#37B34A] font-semibold text-sm">
                      {h.priceFrom}
                    </p>
                    <p className="text-xs text-gray-400">{h.distance}</p>
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-3 text-sm text-gray-600">
                  <span className="text-yellow-400">★</span>
                  <span>{h.rating}</span>
                  <span className="text-gray-400">({h.jobs} jobs)</span>
                </div>

                <div className="mt-auto flex gap-2 pt-4">
                  <Button
                    onClick={() => navigate(`/handyman/${h.id}`)}
                    className="flex-1 border-gray-300 rounded-lg"
                  >
                    View Profile
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => navigate(`/hire/${h.id}`)}
                    style={{
                      backgroundColor: "#37B34A",
                      borderColor: "#37B34A",
                      borderRadius: "8px",
                    }}
                  >
                    Hire
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* 🔧 Carousel: Handyman Services */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-3 text-[#444]">
           Handyman Services
        </h2>
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={4000}
          keyBoardControl
          customTransition="all 0.7s ease"
          transitionDuration={800}
        >
          {handymanServices.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-md mx-3 p-5 rounded-2xl text-center border border-gray-100 flex flex-col justify-center items-center"
            >
              <img
                src={service.img}
                alt={service.name}
                className="h-24 w-24 object-cover rounded-full mb-3"
              />
              <span className="text-2xl mb-1">{service.icon}</span>
              <h4 className="font-semibold text-gray-600">{service.name}</h4>
            </motion.div>
          ))}
        </Carousel>
      </div>

      {/* 🍔 More Food Items */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-5 text-[#444]">
          More Food You’ll Love
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {moreFood.map((food, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
            >
              <img
                src={food.img}
                alt={food.title}
                className="h-40 w-full object-cover rounded-xl mb-3"
              />
              <h4 className="font-semibold text-gray-600">{food.title}</h4>
              <p className="text-[#37B34A] font-medium mt-1">{food.price}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
