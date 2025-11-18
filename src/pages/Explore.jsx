import React, { useEffect } from "react";
import { Input, Button } from "antd";
import { motion } from "framer-motion";
import { SearchOutlined, PlusOutlined, PlusCircleFilled } from "@ant-design/icons";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import ResturantImages from "../assets/rest.png";
import LocalMarketsImage from "../assets/local.png";
import SuperMarket from "../assets/shop.png";
import DrinksImage from "../assets/drinks.png";
import PharmImage from '../assets/pharm.png';
import CosmeticsImage from '../assets/cosmetics.png';
import FashionImage from '../assets/fashion.png';
import ElectronicsImage from '../assets/electronics.png';
import ServicesImage from '../assets/services.png';
import { useLocation } from "react-router-dom";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
const categories = [
  { name: "Restaurants", emoji: "🍽️", img: ResturantImages, link: 'resturants' },
  { name: "Supermarkets", emoji: "🛒", img: SuperMarket },
  { name: "Local Markets", emoji: "🥬", img: LocalMarketsImage },
  { name: "Pharmacies", emoji: "💊", img: PharmImage },
  { name: "Electronics", emoji: "⚡", img: ElectronicsImage },
  { name: "Fashion", emoji: "👗", img: FashionImage },
  { name: "Cosmetics", emoji: "🚚", img: CosmeticsImage },
  { name: "Services", emoji: "➕", img: ServicesImage },
  { name: "Drinks", emoji: "➕", img: DrinksImage },

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
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1.5 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1.5 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

export default function Explore() {
  const navigate = useNavigate();
  const location = useLocation();

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const code = params.get("code");

  if (code) {
    // Send the code to your backend to exchange for user/token
    axios
      .get(`https://mydlv.onrender.com/api/v1/auth/google/profile?code=${code}`)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("token", res.data.token);
          message.success("Google login successful!");
        } else {
          message.error("Google login failed");
        }

        // Remove query params from URL
        navigate("/explore", { replace: true });
      })
      .catch((err) => {
        console.error("Google login error:", err);
        message.error("Error during Google login");
        navigate("/explore", { replace: true });
      });
  }
}, [location, navigate]);

  
  
  return (
    <div className="space-y-12">
      {/* 🏷️ Page Title */}
      {/* <h1 className="text-2xl font-semibold text-gray-800 text-[#444]">Explore</h1> */}

      {/* 🔍 Search Bar */}
      <div className="flex ">
        <div className="bg-[#222] hidden md:flex  text-white p-2  items-center justify-center font-semibold rounded-tl-lg rounded-bl-lg">
          Categories
        </div>
        <Input
          size="large"
          placeholder="Search Categories"
          // prefix={<SearchOutlined className="text-gray-400" />}
          className="max-w-xl border-gray-300 rounded-none rounded-tl-lg rounded-bl-lg lg:rounded-none bg-white"
        />
        <Button icon={<SearchOutlined/>} className="p-5  rounded-none bg-[#222] text-white rounded-tr-lg rounded-br-lg"/>
      </div>

      {/* 🟩 Categories + CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 mt-6 items-start">
        {/* LEFT */}
          {/* Categories (responsive, stable) */}
          {/* Small screens: single grid with 3 cols */}
          <div className="md:hidden grid grid-cols-3 gap-4">
            {categories?.map((cat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                onClick={()=> navigate(`./${cat?.link}`)} 
                className="relative rounded-2xl overflow-hidden shadow-sm cursor-pointer"
              >
                <div className="h-36 w-full object-cover brightness-75" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-[#222] font-semibold text-[14px]">
                  <img src={cat?.img} alt={cat?.name} className="w-[80px] h-[50px] object-contain" />
                  {cat.name}
                </div>
              </motion.div>
            ))}
          </div>

      {/* Medium+ screens: explicit two-row layout */}
      <div className="hidden md:block">
        {/* First row: exactly 5 columns */}
        <div className="grid grid-cols-5 gap-4">
          {categories.slice(0, 5).map((cat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative rounded-2xl overflow-hidden  cursor-pointer"
              onClick={()=> navigate(`./${cat?.link}`)}
            >
              <div className="h-36 w-full object-cover brightness-75" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-[#222] font-semibold text-[14px]">
                <img src={cat.img} alt={cat.name} className="w-[80px] h-[50px] object-contain" />
                {cat.name}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Second row: center remaining items */}
        <div className="mt-4 flex justify-center gap-4">
          {categories.slice(5).map((cat, idx) => (
            <motion.div
              key={`second-${idx}`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              style={{ width: "calc((100%/5) - 0.8rem)" }} /* give same visual width as col of 5 */
              className="relative rounded-2xl overflow-hidden  cursor-pointer"
            >
              <div className="h-36 w-full object-cover brightness-75" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-[#222] font-semibold text-[14px]">
                <img src={cat.img} alt={cat.name} className="w-[80px] h-[50px] object-contain" />
                {cat.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>


        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className=" rounded-2xl p-8 flex flex-col justify-center  "
        >
          <h2 className="text-xl font-light mb-4 leading-snug text-gray-800 text-[#444]">
            IMPROVE YOUR SHOPPING <br /> EXPERIENCE WITH
            AI POWERED  <span className="text-[#37B34A] font-bold">
            <br /> SHOPPING LIST </span>
          </h2>

          <Button
            type="primary"
            icon={<PlusCircleFilled color="#37B34A" className="text-[#37B34A]"/>}
            size="large"
            style={{
              backgroundColor: "#fff",
              borderColor: "#fff",
              borderRadius: "12px",
              color: "#222",
              
            }}
            className="mt-2 shadow-md hover:shadow-lg "
            onClick={()=> navigate('/shopping-list')}
          >
            Go to shopping list
          </Button>
        </motion.div>
      </div>
      
   
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
          containerClass="px-4" // add a little horizontal padding
          itemClass="pr-4" // space between items
        >
          {featuredItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="relative rounded-2xl overflow-hidden shadow-md mx-2 cursor-pointer "
            >
              <img
                src={item.img}
                alt={item.title}
                className="h-64 w-full object-cover brightness-75"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4 text-white">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm opacity-90">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </Carousel>
      </div>
  
 
    </div>
  );
}
