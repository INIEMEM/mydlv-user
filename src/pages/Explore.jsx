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
import { link } from "framer-motion/client";
// import { useNavigate } from "react-router-dom";
const categories = [
  { name: "Restaurants", emoji: "🍽️", img: ResturantImages, link: 'resturants' },
  { name: "Supermarkets", emoji: "🛒", img: SuperMarket, link: 'supermarkets' },
  { name: "Local Markets", emoji: "🥬", img: LocalMarketsImage, link: 'supermarkets' },
  { name: "Pharmacies", emoji: "💊", img: PharmImage, link: 'supermarkets' },
  { name: "Electronics", emoji: "⚡", img: ElectronicsImage, link: 'supermarkets' },
  { name: "Fashion", emoji: "👗", img: FashionImage, link: 'supermarkets' },
  { name: "Cosmetics", emoji: "🚚", img: CosmeticsImage, link: 'supermarkets' },
  { name: "Services", emoji: "➕", img: ServicesImage, link: 'services' },
  { name: "Drinks", emoji: "➕", img: DrinksImage, link: 'supermarkets' },

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



const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1.5 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1.5 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1.5 },
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
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.error("Google login error:", err);
        message.error("Error during Google login");
        navigate("/", { replace: true });
      });
  }
}, [location, navigate]);

  
  
  return (
    <div className="space-y-12">
      {/* 🏷️ Page Title */}
      {/* <h1 className="text-2xl font-semibold text-gray-800 text-[#444]">Explore</h1> */}

      {/* 🔍 Search Bar */}
      <div className="flex  md:hidden px-4">
        <div className="bg-[#222] hidden md:flex  text-white p-2  items-center justify-center font-semibold rounded-tl-lg rounded-bl-lg">
          Categories
        </div>
        <Input
          size="large"
          placeholder="Search Categories"
          // prefix={<SearchOutlined className="text-gray-400" />}
          className="max-w-xl border-[#ccc] rounded-none rounded-tl-lg rounded-bl-lg lg:rounded-none bg-[#EAEAEA]"
        />
        <Button size="large" icon={<SearchOutlined/>} className="p-5  rounded-none bg-[#222] text-white rounded-tr-lg rounded-br-lg"/>
      </div>

      {/* 🟩 Categories + CTA */}
      <div 
       
        className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 input-margin-top  items-start  px-4 md:px-6  ">
        {/* LEFT */}
          {/* Categories (responsive, stable) */}
          {/* Small screens: single grid with 3 cols */}
          <div className="md:hidden grid grid-cols-3 lg:gap-4  px-2">
            {categories?.map((cat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                onClick={()=> navigate(`./${cat?.link}`)} 
                className="relative  cursor-pointer"
              >
                <div className=" h-20 lg:h-36 w-full object-cover brightness-75" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-[#222] font-semibold md:text-[14px] text-[12px] text-center">
                  <img src={cat?.img} alt={cat?.name} className="w-[80px] h-[50px] object-contain" />
                  {cat.name}
                </div>
              </motion.div>
            ))}
          </div>

      {/* Medium+ screens: explicit two-row layout */}
      <div className="hidden md:block  w-full ">
      <div className="hidden md:flex  ">
        <div className="bg-[#222] hidden md:flex  text-white p-2  items-center justify-center font-semibold rounded-tl-lg rounded-bl-lg">
          Categories
        </div>
        <Input
          size="large"
          placeholder="Search Categories"
          // prefix={<SearchOutlined className="text-gray-400" />}
          className=" border-[#ccc] rounded-none rounded-tl-lg rounded-bl-lg lg:rounded-none bg-[#EAEAEA]"
        />
        <Button icon={<SearchOutlined/>} size="large" className="py-5  rounded-none bg-[#222] text-white rounded-tr-lg rounded-br-lg"/>
      </div>
        {/* First row: exactly 5 columns */}
        <div className="grid grid-cols-5 gap-2 mt-10 ">
          {categories.slice(0, 5).map((cat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative rounded-2xl overflow-hidden  cursor-pointer"
              onClick={()=> navigate(`./${cat?.link}`)} 
            >
              <div className="h-24 w-full object-cover brightness-75" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-[#222] font-semibold text-[14px]">
                <img src={cat.img} alt={cat.name} className="w-[80px] h-[50px] object-cover" />
                {cat.name}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Second row: center remaining items */}
        <div className="mt-4 flex justify-center gap-2">
          {categories.slice(5).map((cat, idx) => (
            <motion.div
              key={`second-${idx}`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              style={{ width: "calc((100%/5) - 0.8rem)" }} /* give same visual width as col of 5 */
              className="relative rounded-2xl overflow-hidden  cursor-pointer"
              onClick={()=> navigate(`./${cat?.link}`)} 
            >
              <div className="h-24 w-full object-cover brightness-75" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-[#222] font-semibold text-[14px]">
                <img src={cat.img} alt={cat.name} className="w-[80px] h-[50px] object-cover" />
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
          className=" rounded-2xl p-2 md:p- flex flex-col justify-end h-full"
          
        >
          <h2 className="text-lg md:text-xl font-light mb-4 cta-text leading-snug text-gray-800 text-[#444]  ">
            IMPROVE YOUR SHOPPING <br /> 
            EXPERIENCE WITH
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
        {/* <h2 className="text-xl font-semibold text-gray-800 mb-3 text-[#444]">
          Discover More
        </h2> */}
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={3500}
          keyBoardControl
          customTransition="all 0.7s ease"
          transitionDuration={800}
          containerClass="px-4" 
          itemClass="pr-1" 
          arrows={false}
          showDots
          dotListClass="custom-dot-list-style"
          swipeable={true}
          draggable={true}
          renderDotsOutside 
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
                className="h-[150px] lg:h-[200px] w-full object-cover brightness-75"
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
