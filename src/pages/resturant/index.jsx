import React, { useState } from "react";
import { Input, Button, Drawer, Checkbox, Slider } from "antd";
import { SearchOutlined, FilterOutlined, HeartOutlined, HeartFilled, ClockCircleOutlined, StarFilled, EnvironmentOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Bike } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const vendorsData = [
  {
    id: 1,
    name: "Chicken Republic",
    rating: 4.5,
    deliveryTime: "15-30mins",
    priceFrom: "N700",
    img: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400",
    category: "Restaurant",
    distance: "1.2km"
  },
  {
    id: 2,
    name: "Dominos Pizza",
    rating: 4.8,
    deliveryTime: "20-35mins",
    priceFrom: "N2500",
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
    category: "Restaurant",
    distance: "2.1km"
  },
  {
    id: 3,
    name: "KFC",
    rating: 4.6,
    deliveryTime: "15-25mins",
    priceFrom: "N1500",
    img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400",
    category: "Restaurant",
    distance: "0.8km"
  },
  {
    id: 4,
    name: "Sharwarma Express",
    rating: 4.3,
    deliveryTime: "10-20mins",
    priceFrom: "N800",
    img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400",
    category: "Restaurant",
    distance: "1.5km"
  },
  {
    id: 5,
    name: "Sweet Sensation",
    rating: 4.7,
    deliveryTime: "15-30mins",
    priceFrom: "N1200",
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
    category: "Restaurant",
    distance: "3.0km"
  },
  {
    id: 6,
    name: "Mama's Kitchen",
    rating: 4.9,
    deliveryTime: "25-40mins",
    priceFrom: "N1000",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    category: "Restaurant",
    distance: "2.5km"
  },
  {
    id: 7,
    name: "Buka Stop",
    rating: 4.4,
    deliveryTime: "20-35mins",
    priceFrom: "N600",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
    category: "Restaurant",
    distance: "1.8km"
  },
  {
    id: 8,
    name: "The Place",
    rating: 4.8,
    deliveryTime: "30-45mins",
    priceFrom: "N3000",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
    category: "Restaurant",
    distance: "4.2km"
  }
];

export default function RestaurantListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState([]);
  const [nearYouScroll, setNearYouScroll] = useState(0);
  const [hotScroll, setHotScroll] = useState(0);
  const navigate = useNavigate()
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const filteredVendors = vendorsData.filter((vendor) => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const vendorPrice = parseInt(vendor.priceFrom.replace(/[^0-9]/g, ""));
    const matchesPrice = vendorPrice >= priceRange[0] && vendorPrice <= priceRange[1];
    
    const matchesRating = selectedRatings.length === 0 || selectedRatings.some(rating => vendor.rating >= rating);
    
    const vendorDistance = parseFloat(vendor.distance);
    const matchesDistance = selectedDistance.length === 0 || selectedDistance.some(dist => {
      if (dist === "0-2") return vendorDistance <= 2;
      if (dist === "2-5") return vendorDistance > 2 && vendorDistance <= 5;
      if (dist === "5+") return vendorDistance > 5;
      return true;
    });
    
    return matchesSearch && matchesPrice && matchesRating && matchesDistance;
  });

  const resetFilters = () => {
    setPriceRange([0, 5000]);
    setSelectedRatings([]);
    setSelectedDistance([]);
  };

  const activeFilterCount = 
    (priceRange[0] !== 0 || priceRange[1] !== 5000 ? 1 : 0) +
    (selectedRatings.length > 0 ? 1 : 0) +
    (selectedDistance.length > 0 ? 1 : 0);

  const scrollNearYou = (direction) => {
    const newScroll = nearYouScroll + (direction === 'left' ? -300 : 300);
    setNearYouScroll(Math.max(0, newScroll));
  };

  const scrollHot = (direction) => {
    const newScroll = hotScroll + (direction === 'left' ? -300 : 300);
    setHotScroll(Math.max(0, newScroll));
  };

  return (
    <div className="min-h-screen ">
      {/* Breadcrumb & Search Section */}
      <div className=" top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-4">
            <span className="text-green-600 font-medium cursor-pointer">Explore</span>
            <span className="text-gray-400">›</span>
            <span className="text-gray-800 font-medium">Restaurant</span>
          </div>

          {/* Search Bar */}
          <div className="flex  ">
            <Button
              size="large"
              className="bg-[#222] text-white rounded-none px-6 hover:bg-[#333]"
            >
              Restaurant
            </Button>
            <Input
              size="large"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              suffix={<SearchOutlined className="text-gray-400" />}
              className="flex-1 rounded-none"
            />
            {activeFilterCount > 0 && (
              <Button
                size="large"
                className="bg-transparent text-[#222] rounded-none px-4 hover:bg-green-700"
              >
                {activeFilterCount}
              </Button>
            )}
            <Button
              size="large"
              icon={<FilterOutlined />}
              onClick={() => setFilterDrawerOpen(true)}
              className="bg-[#222] text-white rounded-none px-6 hover:bg-[#333]"
            >
              Filter
            </Button>
          </div>

          {/* Results count */}
          <div className="mt-3 text-sm text-gray-600">
            {filteredVendors.length} results found
          </div>
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Near you section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              Near you <span className="text-green-600">💚</span>
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={() => scrollNearYou('left')}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                ←
              </button>
              <button 
                onClick={() => scrollNearYou('right')}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                →
              </button>
            </div>
          </div>

          <div className="overflow-x-hidden pb-2">
            <div 
              className="flex gap-4 transition-transform duration-300 ease-in-out" 
              style={{ 
                minWidth: 'max-content',
                transform: `translateX(-${nearYouScroll}px)`
              }}
            >
              {filteredVendors.slice(0, 6).map((vendor) => (
                <motion.div
                  key={vendor.id}
                  whileHover={{ y: -4 }}
                  className=" rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
                  style={{ minWidth: '280px', maxWidth: '280px' }}
                  onClick={()=>navigate(`./${vendor.id}`)}
                >
                  <div className="relative">
                    <img
                      src={vendor.img}
                      alt={vendor.name}
                      className="w-full h-40 object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(vendor.id);
                      }}
                      className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform"
                    >
                      {favorites.includes(vendor.id) ? (
                        <HeartFilled className="text-red-500" />
                      ) : (
                        <HeartOutlined className="text-gray-600" />
                      )}
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-800 text-base">
                        {vendor.name}
                      </h3>
                      <div className="flex items-center gap-1  px-2 py-1 rounded-md">
                        
                        <span className="text-sm font-medium text-gray-800">
                          {vendor.rating}
                        </span>
                        <span className="text-yellow-500 text-xs">
                        <StarFilled className="text-yellow-500 text-xs" />
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                      <ClockCircleOutlined className="text-gray-500" />
                        <span>{vendor.deliveryTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bike size={12} className="" />
                        <span>From {vendor.priceFrom}</span>
                      </div>
                    </div>

                    {/* <div className="mt-2 text-xs text-gray-400">
                      📍 {vendor.distance} away
                    </div> */}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Hot section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              Hot <span className="text-orange-600">🔥</span>
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={() => scrollHot('left')}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                ←
              </button>
              <button 
                onClick={() => scrollHot('right')}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                →
              </button>
            </div>
          </div>

          <div className="overflow-x-hidden pb-2">
            <div 
              className="flex gap-4 transition-transform duration-300 ease-in-out" 
              style={{ 
                minWidth: 'max-content',
                transform: `translateX(-${hotScroll}px)`
              }}
            >
              {filteredVendors.filter(v => v.rating >= 4.6).map((vendor) => (
                <motion.div
                  key={vendor.id}
                  whileHover={{ y: -4 }}
                  className=" rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
                  style={{ minWidth: '280px', maxWidth: '280px' }}
                >
                  <div className="relative">
                    <img
                      src={vendor.img}
                      alt={vendor.name}
                      className="w-full h-40 object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(vendor.id);
                      }}
                      className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform"
                    >
                      {favorites.includes(vendor.id) ? (
                        <HeartFilled className="text-red-500" />
                      ) : (
                        <HeartOutlined className="text-gray-600" />
                      )}
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-800 text-base">
                        {vendor.name}
                      </h3>
                      <div className="flex items-center gap-1  px-2 py-1 rounded-md">
                        
                        <span className="text-sm font-medium text-gray-800">
                          {vendor.rating}
                        </span>
                        <span className="text-yellow-500 text-xs">
                        <StarFilled className="text-yellow-500 text-xs" />
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                      <ClockCircleOutlined className="text-gray-500" />
                        <span>{vendor.deliveryTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                      <Bike size={12} className="" />
                        <span>From {vendor.priceFrom}</span>
                      </div>
                    </div>

                    {/* <div className="mt-2 text-xs text-gray-400">
                      📍 {vendor.distance} away
                    </div> */}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* All Products section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              All Products
            </h2>
            {/* <div className="flex gap-2">
              <Button size="small" className="rounded-full border-gray-300">
                <span className="text-lg">🌐</span>
              </Button>
              <Button size="small" className="rounded-full border-gray-300">
                <span className="text-lg">🗺️</span>
              </Button>
            </div> */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredVendors.map((vendor) => (
              <motion.div
                key={vendor.id}
                whileHover={{ y: -4 }}
                className=" rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={vendor.img}
                    alt={vendor.name}
                    className="w-full h-40 object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(vendor.id);
                    }}
                    className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform"
                  >
                    {favorites.includes(vendor.id) ? (
                      <HeartFilled className="text-red-500" />
                    ) : (
                      <HeartOutlined className="text-gray-600" />
                    )}
                  </button>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800 text-base">
                      {vendor.name}
                    </h3>
                    <div className="flex items-center gap-1  px-2 py-1 rounded-md">
                      
                      <span className="text-sm font-medium text-gray-800">
                        {vendor.rating}
                      </span>
                      <span className="text-yellow-500 text-xs">
                        <StarFilled className="text-yellow-500 text-xs" />
                        </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                    <ClockCircleOutlined className="text-gray-500" />
                      <span>{vendor.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                    <Bike size={12} className="" />
                      <span>From {vendor.priceFrom}</span>
                    </div>
                  </div>

                  {/* <div className="mt-2 text-xs text-gray-400">
                    📍 {vendor.distance} away
                  </div> */}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredVendors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No vendors found matching your criteria</p>
              <Button 
                onClick={resetFilters}
                className="mt-4"
                type="primary"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Filter Drawer */}
      <Drawer
        title="Filter Options"
        placement="right"
        onClose={() => setFilterDrawerOpen(false)}
        open={filterDrawerOpen}
        width={340}
      >
        <div className="space-y-6">
          {/* Price Range */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-800">Price Range</h3>
            <Slider
              range
              min={0}
              max={5000}
              step={100}
              value={priceRange}
              onChange={setPriceRange}
              tooltip={{ formatter: (value) => `₦${value}` }}
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>₦{priceRange[0]}</span>
              <span>₦{priceRange[1]}</span>
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-800">Minimum Rating</h3>
            <Checkbox.Group
              value={selectedRatings}
              onChange={setSelectedRatings}
              className="flex flex-col gap-2"
            >
              <Checkbox value={4.5}>4.5+ ⭐</Checkbox>
              <Checkbox value={4.0}>4.0+ ⭐</Checkbox>
              <Checkbox value={3.5}>3.5+ ⭐</Checkbox>
              <Checkbox value={3.0}>3.0+ ⭐</Checkbox>
            </Checkbox.Group>
          </div>

          {/* Distance Filter */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-800">Distance</h3>
            <Checkbox.Group
              value={selectedDistance}
              onChange={setSelectedDistance}
              className="flex flex-col gap-2"
            >
              <Checkbox value="0-2">0-2 km</Checkbox>
              <Checkbox value="2-5">2-5 km</Checkbox>
              <Checkbox value="5+">5+ km</Checkbox>
            </Checkbox.Group>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              onClick={resetFilters}
              className="flex-1"
            >
              Reset
            </Button>
            <Button
              type="primary"
              onClick={() => setFilterDrawerOpen(false)}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}