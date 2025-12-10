import React, { useState, useRef } from "react";
import { Input, Button, Drawer, Badge } from "antd";
import { SearchOutlined, FilterOutlined, StarFilled, ClockCircleOutlined,  } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {  MapPin } from "lucide-react";
const servicesData = [
  {
    id: 1,
    name: "Sally Cleaning Services",
    description: "We offer best cleaning, upholstery clean, sofas, mattress, leather seats, carpets carpet and rug wash.",
    price: "N5000",
    rating: 4.5,
    deliveryTime: "2hrs-3hrs",
    img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
    category: "Cleaning Services",
    featured: true,
    location: "Lagos"
  },
  {
    id: 2,
    name: "Bless Carpenters",
    description: "We make the best affordable and quality furnitures for your home and offices.",
    price: "Request Quote",
    rating: 4.8,
    deliveryTime: "1-2 days",
    img: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=400",
    category: "Building & Construction Services",
    featured: true,
    location: "Lagos"
  },
  {
    id: 3,
    name: "Major Event Decorations",
    description: "We offer best cleaning, upholstery clean, sofas, mattress, leather seats, carpets carpet and rug wash.",
    price: "N5000",
    rating: 4.6,
    deliveryTime: "3hrs-5hrs",
    img: "https://images.unsplash.com/photo-1519167758481-83f29da8c012?w=400",
    category: "Party & Event Services",
    featured: true,
    location: "Lagos"
  },
  {
    id: 4,
    name: "Kill all bugs fumigations",
    description: "We really sort cleaning, upholstery clean, sofas, mattress, leather seats, carpets carpet and rug wash.",
    price: "N5000",
    rating: 4.7,
    deliveryTime: "1hr-2hrs",
    img: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400",
    category: "Cleaning Services",
    featured: true,
    location: "Lagos"
  },
  {
    id: 5,
    name: "Auto Mechanic Services",
    description: "Professional car repair and maintenance services for all vehicle types.",
    price: "N8000",
    rating: 4.5,
    deliveryTime: "2-4hrs",
    img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400",
    category: "Automotive Services",
    location: "Lagos"
  },
  {
    id: 6,
    name: "Premium Catering",
    description: "Delicious meals and catering services for all your events and occasions.",
    price: "N15000",
    rating: 4.9,
    deliveryTime: "4-6hrs",
    img: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400",
    category: "Catering services",
    location: "Lagos"
  },
  {
    id: 7,
    name: "Wedding Photography",
    description: "Capture your special moments with professional photography services.",
    price: "Request Quote",
    rating: 4.8,
    deliveryTime: "All day",
    img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400",
    category: "Photography & Video Services",
    location: "Lagos"
  },
  {
    id: 8,
    name: "Lawn Care Experts",
    description: "Professional landscaping and gardening services for homes and businesses.",
    price: "N6000",
    rating: 4.4,
    deliveryTime: "3-5hrs",
    img: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=400",
    category: "Landscaping & Gardening Services",
    location: "Lagos"
  },
  {
    id: 9,
    name: "Pro Car Wash",
    description: "Complete car washing and detailing services for all vehicle types.",
    price: "N3000",
    rating: 4.6,
    deliveryTime: "1-2hrs",
    img: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400",
    category: "Automotive Services",
    location: "Lagos"
  },
  {
    id: 10,
    name: "Beauty Salon Express",
    description: "Professional hair styling, makeup, and beauty treatments.",
    price: "N8000",
    rating: 4.7,
    deliveryTime: "2-3hrs",
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
    category: "Beauty Services",
    location: "Lagos"
  },
  {
    id: 11,
    name: "Elite Catering",
    description: "Premium catering services for weddings, corporate events, and parties.",
    price: "N25000",
    rating: 4.9,
    deliveryTime: "6-8hrs",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
    category: "Catering services",
    location: "Lagos"
  },
  {
    id: 12,
    name: "Home Cleaning Pro",
    description: "Deep cleaning services for homes and offices with eco-friendly products.",
    price: "N7000",
    rating: 4.5,
    deliveryTime: "3-4hrs",
    img: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400",
    category: "Cleaning Services",
    location: "Lagos"
  }
];

const categories = [
  { name: "Automotive Services", count: 113, icon: "🚗" },
  { name: "Beauty Services", count: 113, icon: "💄" },
  { name: "Building & Construction Services", count: 113, icon: "🏗️" },
  { name: "Carpentry and wood work services", count: 113, icon: "🔨" },
  { name: "Catering services", count: 113, icon: "🍽️" },
  { name: "Chauffeur & Driver Services", count: 113, icon: "🚕" },
  { name: "Child Care & Education Services", count: 113, icon: "👶" },
  { name: "Classes & Courses", count: 113, icon: "📚" },
  { name: "Cleaning Services", count: 113, icon: "🧹" },
  { name: "Computer & IT Services", count: 113, icon: "💻" },
  { name: "DJ & Entertainment Services", count: 113, icon: "🎵" },
  { name: "Fitness & Personal Training Services", count: 113, icon: "💪" },
  { name: "Interior Decoration Service", count: 113, icon: "🏠" },
  { name: "Landscaping & Gardening Services", count: 113, icon: "🌿" },
  { name: "Laundry services", count: 113, icon: "👔" },
  { name: "Legal Services", count: 113, icon: "⚖️" },
  { name: "Manufacturing Services", count: 113, icon: "🏭" },
  { name: "Party & Event Services", count: 113, icon: "🎉" },
  { name: "Photography & Video Services", count: 113, icon: "📸" },
  { name: "Printing Services", count: 113, icon: "🖨️" },
  { name: "Rental Services", count: 113, icon: "🔑" },
  { name: "Tax & Financial Services", count: 113, icon: "💰" },
  { name: "Travel Agents & Tours", count: 113, icon: "✈️" },
  { name: "Wedding Venues & Services", count: 113, icon: "💒" }
];

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [scrollPositions, setScrollPositions] = useState({});
  const [showServicesCategories, setShowServicesCategories] = useState(false);
  const navigate = useNavigate();
  const filteredServices = servicesData.filter((service) => {
  const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group services by category
  const featuredServices = filteredServices.filter(s => s.featured);
  const servicesByCategory = {};
  
  filteredServices.forEach(service => {
    if (!service.featured) {
      if (!servicesByCategory[service.category]) {
        servicesByCategory[service.category] = [];
      }
      servicesByCategory[service.category].push(service);
    }
  });

  const scroll = (category, direction) => {
    const currentScroll = scrollPositions[category] || 0;
    const newScroll = currentScroll + (direction === 'left' ? -300 : 300);
    setScrollPositions({
      ...scrollPositions,
      [category]: Math.max(0, newScroll)
    });
  };

  const ServiceCard = ({ service }) => 
   

    (
    <motion.div
      whileHover={{ y: -4 }}
      className="flex-shrink-0 w-56 rounded-2xl overflow-hidden hover:shadow-lg transition-all cursor-pointer  "
      onClick={()=> navigate(`./${service.id}`)}
    >
      <div className="relative">
        <img
          src={service.img}
          alt={service.name}
          className="block w-full h-44 object-cover rounded-2xl"
        />
      </div>
  
      <div className="p-3">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-800 text-sm">
            {service.name}
          </h3>
          <div className="flex items-center gap-1 px-2 py-1 rounded-md">
            <span className="text-sm font-medium text-gray-800">
              {service.rating}
            </span>
            <StarFilled className="text-green-500 text-xs" />
          </div>
        </div>
  
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {service.description}
        </p>
  
        <div className="flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1 text-gray-500">
            <MapPin size={12}/>
            <span>{service.location}</span>
          </div>
          <div className="flex items-center gap-1 text-green-600 font-semibold">
            {service.price === "Request Quote" ? (
              <span className="text-xs">Request Quote</span>
            ) : (
              <span>From {service.price}</span>
            )}
          </div>
        </div>
  
        {/* <button className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
          per service
        </button> */}
      </div>
    </motion.div>
  );
  

  const ServiceRow = ({ title, services }) => {
    const rowRef = useRef(null);
  
    const scrollRow = (direction) => {
      if (!rowRef.current) return;
      const container = rowRef.current;
      const scrollAmount = 300;
  
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    };
  
    return (
      <div 
        
        className="mb-8 relative group">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
  
          <div className="flex items-center gap-2">
   
          <button
            onClick={() => scrollRow("left")}
            className="p-1 rounded-lg bg-[#333] hover:bg-[#555] text-white transition hidden lg:flex"
          >
            ←
          </button>

          <button
            onClick={() => scrollRow("right")}
            className="p-1 rounded-lg bg-[#333] hover:bg-[#555] text-white transition hidden lg:flex"
          >
            →
          </button>
          </div>
        </div>
  
        {/* Scrollable Row */}
        <div
          ref={rowRef}
          className="overflow-x-auto scrollbar-hide pb-2"
        >
          <div className="flex gap-4 items-stretch">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
  
        {/* Floating Arrows (on hover) for Desktop */}
        {/* <button
          onClick={() => scrollRow("left")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2
                     p-3 rounded-full bg-white shadow-lg hover:bg-gray-100
                     opacity-0 group-hover:opacity-100 transition"
        >
          ←
        </button>
  
        <button
          onClick={() => scrollRow("right")}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2
                     p-3 rounded-full bg-white shadow-lg hover:bg-gray-100
                     opacity-0 group-hover:opacity-100 transition"
        >
          →
        </button> */}
      </div>
    );
  };
  
  
  

  return (
    <div className="min-h-screen  box-border">
      {/* Header Section */}
      <div className="  ">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Breadcrumb */}
          <div className="flex items-center justify-between gap-2 text-sm mb-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-800 font-medium cursor-pointer" onClick={()=> navigate('/')}>Explore</span>
              <span className="text-gray-400">›</span>
              <span className=" text-green-600  font-medium">Services</span>
            </div>
            
            {/* Mobile Filter Button */}
            <div className="flex lg:hidden items-center gap-2">
              <Button
                size="middle"
                icon={<FilterOutlined />}
                onClick={() => setFilterDrawerOpen(true)}
                className="bg-[#222] text-white rounded-md px-4 hover:bg-[#333]"
              >
                Categories
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex ">
            <Input
              size="large"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 rounded-none rounded-l-md"
            />
            <Button
              size="large"
              icon={<SearchOutlined />}
              className="bg-[#222] rounded-none text-white rounded-r-md px-6 hover:bg-[#333]"
            />
            <div className="flex items-center justify-center border border-[#ccc] px-4 ml-3 rounded-none rounded-l-md">
              {filteredServices.length}
            </div>
            <Button
              size="large"
              icon={<FilterOutlined />}
              className="bg-[#222] rounded-none hidden lg:block text-white  rounded-r-md px-6 hover:bg-[#333]"
              onClick={() => setShowServicesCategories(!showServicesCategories)}
            >
              Filter
            </Button>
          </div>

          {/* Results count */}
          {/* <div className="mt-3 text-sm text-gray-600">
            {filteredServices.length} services found
          </div> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Services Content */}
          <div className="flex-1 min-w-0">
            {/* Featured Section */}
            {featuredServices.length > 0 && (
              <div className="">
                <ServiceRow 
                title="Featured" 
                services={featuredServices} 
                categoryKey="featured"
              />
              </div>
            )}

            {/* Category Sections */}
            {Object.entries(servicesByCategory).map(([category, services]) => (
              <ServiceRow 
                key={category}
                title={category} 
                services={services} 
                categoryKey={category}
              />
            ))}

            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No services found matching your criteria
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                >
                  Reset Search
                </Button>
              </div>
            )}
          </div>

          {/* Categories Sidebar - Desktop */}
          {
            showServicesCategories && (<div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-32">
                <div className="bg-[#fcfcfc] rounded-xl border border-gray-200 overflow-hidden">
                  <div className="bg-[#222] text-white px-4 py-3">
                    <h2 className="font-semibold text-base">Service Categories</h2>
                  </div>
                  
                  <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                    {/* All Categories Option */}
                    <button
                      onClick={() => setSelectedCategory("All")}
                      className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                        selectedCategory === "All" ? "bg-green-50 text-green-700" : "text-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">📋</span>
                        <span className="text-sm font-medium">All Services</span>
                      </div>
                      <Badge 
                        count={servicesData.length} 
                        style={{ 
                          backgroundColor: selectedCategory === "All" ? "#16a34a" : "#e5e7eb",
                          color: selectedCategory === "All" ? "#fff" : "#374151"
                        }} 
                      />
                    </button>
  
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                          selectedCategory === category.name ? "bg-green-50 text-green-700" : "text-gray-700"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{category.icon}</span>
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                        <Badge 
                          count={category.count} 
                          style={{ 
                            backgroundColor: selectedCategory === category.name ? "#16a34a" : "#e5e7eb",
                            color: selectedCategory === category.name ? "#fff" : "#374151"
                          }} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>)
          }
        </div>
      </div>

      {/* Mobile Categories Drawer */}
      <Drawer
        title="Service Categories"
        placement="left"
        onClose={() => setFilterDrawerOpen(false)}
        open={filterDrawerOpen}
        width={320}
      >
        <div className="space-y-2">
          <button
            onClick={() => {
              setSelectedCategory("All");
              setFilterDrawerOpen(false);
            }}
            className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors ${
              selectedCategory === "All" ? "bg-green-50 text-green-700" : "hover:bg-gray-50 text-gray-700"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">📋</span>
              <span className="text-sm font-medium">All Services</span>
            </div>
            <Badge 
              count={servicesData.length} 
              style={{ 
                backgroundColor: selectedCategory === "All" ? "#16a34a" : "#e5e7eb",
                color: selectedCategory === "All" ? "#fff" : "#374151"
              }} 
            />
          </button>

          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedCategory(category.name);
                setFilterDrawerOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors ${
                selectedCategory === category.name ? "bg-green-50 text-green-700" : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </div>
              <Badge 
                count={category.count} 
                style={{ 
                  backgroundColor: selectedCategory === category.name ? "#16a34a" : "#e5e7eb",
                  color: selectedCategory === category.name ? "#fff" : "#374151"
                }} 
              />
            </button>
          ))}
        </div>
      </Drawer>
    </div>
  );
}