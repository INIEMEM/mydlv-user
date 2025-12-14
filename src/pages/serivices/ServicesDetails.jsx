import React, { useState } from 'react';
import { ArrowLeft, Star, Clock, Truck, Heart, Plus, Check, Search, ShoppingCart, MessageCircle, AlertTriangle, X, Send, Paperclip } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// Mock service provider data
const serviceData = {
  id: 1,
  name: "Lagos Continental Carpenters",
  rating: 4.5,
  deliveryTime: "15-30mins",
  priceFrom: "N700",
  minOrder: "N1000",
  openFrom: "9:00am",
  openTo: "9:00pm",
  img: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400",
  distance: "1.2km"
};

const servicesData = {
  "Furniture": [
    {
      id: 1,
      name: "Royal Family Chair Set",
      description: "Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum",
      price: 5000,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300",
      category: "Furniture",
      condition: "Brand New"
    },
    {
      id: 2,
      name: "Royal Family Chair Set",
      description: "Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum",
      price: 5000,
      image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=300",
      category: "Furniture",
      condition: "Used",
      requestQuote: true
    },
    {
      id: 3,
      name: "Royal Family Chair Set",
      description: "Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum",
      price: 5000,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300",
      category: "Furniture",
      condition: "Brand New"
    },
    {
      id: 4,
      name: "Royal Family Chair Set",
      description: "Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum",
      price: 5000,
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=300",
      category: "Furniture",
      condition: "Brand New"
    },
    {
      id: 5,
      name: "Royal Family Chair Set",
      description: "Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum",
      price: 5000,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300",
      category: "Furniture",
      condition: "Used",
      requestQuote: true
    },
    {
      id: 6,
      name: "Royal Family Chair Set",
      description: "Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum",
      price: 5000,
      image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=300",
      category: "Furniture",
      condition: "Brand New"
    }
  ]
};

const safetyTips = [
  "Avoid paying in advance, use MYDLV escrow service",
  "All agreement and contract negotiations should be made in the chat section for insurance and dispute settlement",
  "Meet with the Handyman at a safe space"
];

export default function ServiceProviderDetailsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [addedItems, setAddedItems] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("items");
  const [chatOpen, setChatOpen] = useState(false);
  const [safetyTipsOpen, setSafetyTipsOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "provider",
      text: "Hello! How can I assist you today?"
    },
    {
      id: 2,
      sender: "provider",
      text: "Sure! I can help you with that."
    },
    {
      id: 3,
      sender: "user",
      text: "Thank You :)"
    }
  ]);

  const handleAddToFavorites = (item) => {
    setAddedItems(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => {
        const newState = { ...prev };
        delete newState[item.id];
        return newState;
      });
    }, 2000);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages([...chatMessages, {
        id: chatMessages.length + 1,
        sender: "user",
        text: message
      }]);
      setMessage("");
    }
  };

  const filteredServices = searchQuery
    ? Object.entries(servicesData).reduce((acc, [category, items]) => {
        const filtered = items.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filtered.length > 0) {
          acc[category] = filtered;
        }
        return acc;
      }, {})
    : servicesData;
    const navigate = useNavigate();
  return (
    <div className="min-h-screen ">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={()=> navigate('/services')} className="text-gray-600 font-medium hover:text-gray-700 flex items-center gap-1">
              <ArrowLeft size={16} />
              <span>Services</span>
            </button>
            <span className="text-gray-400">›</span>
            <span className="text-green-600 font-medium">Lagos Continental Carpenters</span>
          </div>
        </div>
      </div>

      <div className="flex  max-w-7xl relative lg:w-[calc(100vh-100px)] 2xl:w-full">
        {/* Main Content */}
        <div className="flex-1 px-4">
          {/* Service Provider Header */}
          <div className="py-6">
            <div className="flex gap-1">
              <div className="w-[72px] h-20  bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={serviceData.img} 
                  alt={serviceData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h1 className="text-md md:text-xl font-bold text-gray-900 mb-1">
                      {serviceData.name}
                    </h1>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Truck size={14} />
                        <span>From {serviceData.priceFrom}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{serviceData.deliveryTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-gray-900">{serviceData.rating}</span>
                        <Star size={14} className="fill-green-500 text-green-500" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mb-3">
                  Min order value: <span className="font-medium text-gray-900">{serviceData.minOrder}</span>
                  <span className="mx-2">•</span>
                  Open From <span className="font-medium text-gray-900">{serviceData.openFrom} - {serviceData.openTo}</span>
                </div>

               
              </div>
            </div>
             {/* Action Buttons - Mobile/Tablet Only */}
             <div 
             
              className="flex gap-2 lg:hidden ">
                  <button
                    onClick={() => setChatOpen(true)}
                    className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-b-lg hover:bg-green-700 transition-colors flex-1"
                  >
                    Chat
                  </button>
                  <button
                    onClick={() => setReviewsOpen(true)}
                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-b-lg hover:bg-gray-50 transition-colors flex-1"
                  >
                    See Reviews
                  </button>
                  <button
                    onClick={() => setSafetyTipsOpen(true)}
                    className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-b-lg hover:bg-orange-600 transition-colors flex-1"
                  >
                    Safety Tips
                  </button>
                </div>
          </div>

          {/* Search Bar */}
          <div className="py-4">
            <div className="relative flex">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-tl-lg rounded-bl-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <div className="bg-gray-900 p-2 rounded-tr-lg rounded-br-lg flex items-center justify-center">
                <Search className="" size={20} color="white"/>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="pb-8">
            {Object.entries(filteredServices).map(([category, items]) => (
              <div key={category} className="mb-8">
                <div className="grid grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 lg:grid-cols-2 gap-2">
                  {items.map((item) => {
                    const isAdded = addedItems[item.id];
                    
                    return (
                      <div
                        key={item.id}
                        className="rounded-lg overflow-hidden hover:shadow-md transition-shadow border border-gray-200"
                      >
                        <div className="relative">
                          <div className="w-full h-48 bg-gray-200 overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {/* <button
                            onClick={() => handleAddToFavorites(item)}
                            className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
                          >
                            <Heart 
                              size={16} 
                              className={isAdded ? 'fill-green-500 text-green-500' : 'text-gray-600'}
                            />
                          </button> */}
                        </div>
                        
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-900 text-sm flex-1">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-1 ml-2">
                              <span className="text-sm font-medium">{serviceData.rating}</span>
                              <Star size={12} className="fill-green-500 text-green-500" />
                            </div>
                          </div>
                          
                          <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                            {item.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div 
                              
                              className="flex w-full justify-between items-center ">
                              <span className="text-xs text-gray-500 bg-[#fcfcfc] p-1 rounded">{item.condition}</span>
                              <span className="text-sm font-bold text-gray-900">
                                {item.requestQuote ? "Request Quote" : `N${item.price.toLocaleString()}`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {Object.keys(filteredServices).length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No items found matching your search</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Desktop Only */}
        <div  
          style={{zIndex: 10}}
          className="hidden lg:block w-96 border-l border-gray-200 p-6 space-y-6 shadow-md bg-[#fcfcfc]  rounded-b-lg fixed right-6 top-[73px] ">
          {/* Request Quote / Chat Button */}
          <button
            onClick={() => setChatOpen(true)}
            className="w-full px-4 py-3 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Request Quote / Chat
          </button>

          {/* Chat Preview */}
          <div className="border border-gray-200 rounded-lg p-4 space-y-3">
            {chatMessages.slice(-2).map((msg) => (
              <div
                key={msg.id}
                className={`${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                    msg.sender === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            <div className="flex gap-2 border border-gray-200 rounded-lg bg-white px-1">
                <input
                  type="text"
                  placeholder="Type a new message here"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Paperclip size={20} />
                </button>
                <button
                  onClick={handleSendMessage}
                  className="p-2  text-gray-400 rounded-lg hover:bg-green-700"
                >
                  <Send size={20} />
                </button>
              </div>
          </div>

          {/* Reviews */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-green-600 font-semibold text-sm">Reviews</span>
              <button
                onClick={() => setReviewsOpen(true)}
                className="text-gray-600 text-sm underline hover:text-gray-900"
              >
                View all 300 Reviews
              </button>
            </div>
          </div>

          {/* Safety Tips */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-orange-500 font-semibold text-sm mb-3">Safety tips</h3>
            <ul className="space-y-2">
              {safetyTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-xs text-gray-700">
                  <span className="text-orange-500 mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {chatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[600px] flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                  <img src={serviceData.img} alt={serviceData.name} className="w-full h-full object-cover" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">{serviceData.name}</h2>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-lg ${
                      msg.sender === 'user'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a new message here"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Paperclip size={20} />
                </button>
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Safety Tips Modal */}
      {safetyTipsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Safety tips</h2>
              <button
                onClick={() => setSafetyTipsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <ul className="space-y-3">
              {safetyTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-orange-500 mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Reviews Modal */}
      {reviewsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Reviews</h2>
              <button
                onClick={() => setReviewsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="text-center py-12">
              <p className="text-gray-500">View all 300 Reviews</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}