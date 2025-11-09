import React, { useState } from 'react';
import { ArrowLeft, Star, Clock, Bike, Heart, Plus, Check, Search, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Cart } from '../../components/carts/CartsComponent';
import CheckoutModal from '../../components/carts/CheckoutModal';
// Mock restaurant data - replace with actual data from API/props
const restaurantData = {
  id: 1,
  name: "Chicken Republic Ikot Ekpene Road",
  rating: 4.5,
  deliveryTime: "15-30mins",
  priceFrom: "N700",
  minOrder: "N1000",
  openFrom: "9:00am",
  openTo: "9:00pm",
  img: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400",
  distance: "1.2km"
};

const menuData = {
  "BURGERS & SANDWICHES": [
    {
      id: 1,
      name: "Caribbean Special Combo",
      description: "Soulfully Spiced Basmati rice garnished with veggies, diced chicken and plantain served with Quarter Rotisserie chicken and a PET drink.",
      price: 2000,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300",
      category: "BURGERS & SANDWICHES"
    },
    {
      id: 2,
      name: "Big Boyz Combo",
      description: "Chicken Republic's signature burger with beef patty, cheese, lettuce and special sauce.",
      price: 3500,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=300",
      category: "BURGERS & SANDWICHES"
    },
    {
      id: 3,
      name: "Crispy Chicken Sandwich",
      description: "Crispy fried chicken fillet with mayo, lettuce and tomatoes in soft bun.",
      price: 2500,
      image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=300",
      category: "BURGERS & SANDWICHES"
    },
    {
      id: 4,
      name: "Beef Burger Deluxe",
      description: "Premium beef patty with caramelized onions, cheese and special sauce.",
      price: 3000,
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300",
      category: "BURGERS & SANDWICHES"
    }
  ],
  "TASTY SIDES": [
    {
      id: 5,
      name: "Crispy Fries",
      description: "Golden crispy potato fries seasoned to perfection.",
      price: 800,
      image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300",
      category: "TASTY SIDES"
    },
    {
      id: 6,
      name: "Plantain Chips",
      description: "Thinly sliced plantain fried until crispy.",
      price: 700,
      image: "https://images.unsplash.com/photo-1621336129821-6dadf6297733?w=300",
      category: "TASTY SIDES"
    },
    {
      id: 7,
      name: "Coleslaw",
      description: "Fresh cabbage salad with creamy dressing.",
      price: 600,
      image: "https://images.unsplash.com/photo-1596097635242-f0c5e6c75f5e?w=300",
      category: "TASTY SIDES"
    },
    {
      id: 8,
      name: "Chicken Wings (6pcs)",
      description: "Spicy chicken wings with special sauce.",
      price: 2000,
      image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=300",
      category: "TASTY SIDES"
    }
  ],
  "CITIZENS MEALS": [
    {
      id: 9,
      name: "Jollof Rice & Chicken",
      description: "Nigerian style jollof rice with grilled chicken quarter.",
      price: 2500,
      image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=300",
      category: "CITIZENS MEALS"
    },
    {
      id: 10,
      name: "Fried Rice Special",
      description: "Vegetable fried rice served with chicken and plantain.",
      price: 2800,
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300",
      category: "CITIZENS MEALS"
    },
    {
      id: 11,
      name: "Refuel Max",
      description: "Complete meal with rice, chicken, plantain and coleslaw.",
      price: 3500,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300",
      category: "CITIZENS MEALS"
    }
  ],
  "POT MEALS": [
    {
      id: 12,
      name: "Chicken Pot",
      description: "Whole rotisserie chicken with seasoning.",
      price: 5500,
      image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300",
      category: "POT MEALS"
    },
    {
      id: 13,
      name: "Family Pot",
      description: "Large meal pot for the whole family with rice, chicken and sides.",
      price: 8000,
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300",
      category: "POT MEALS"
    }
  ]
};

export default function RestaurantDetailsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("BURGERS & SANDWICHES");
  const [cartOpen, setCartOpen] = useState(false);
  const [addedItems, setAddedItems] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [customizeModalOpen, setCustomizeModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const { getCartItemCount, carts, getCartTotal } = useCart();

  const categories = Object.keys(menuData);
  const handlePlaceOrder = () => {
    setCheckoutModalOpen(true);
    setCartOpen(false); // Close the cart modal if open
  };
  const handleAddToCart = (item) => {
    // Open customize modal
    setSelectedItem(item);
    setCustomizeModalOpen(true);
  };

  const handleCustomizeModalClose = () => {
    setCustomizeModalOpen(false);
    setSelectedItem(null);
    
    // Show "Added" feedback
    if (selectedItem) {
      setAddedItems(prev => ({ ...prev, [selectedItem.id]: true }));
      setTimeout(() => {
        setAddedItems(prev => {
          const newState = { ...prev };
          delete newState[selectedItem.id];
          return newState;
        });
      }, 2000);
    }
  };

  const handleAddNewOrder = () => {
    setCustomizeModalOpen(true);
    setCartOpen(false);
  };

  const handleEditChoices = (item) => {
    // Set the item and open customize modal to edit choices
    setSelectedItem(item);
    setCustomizeModalOpen(true);
    setCartOpen(false);
  };

  const filteredMenu = searchQuery
    ? Object.entries(menuData).reduce((acc, [category, items]) => {
        const filtered = items.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filtered.length > 0) {
          acc[category] = filtered;
        }
        return acc;
      }, {})
    : menuData;

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm">
            <button className="text-green-600 font-medium hover:text-green-700 flex items-center gap-1">
              <ArrowLeft size={16} />
              <span>Restaurants</span>
            </button>
            <span className="text-gray-400">›</span>
            <span className="text-gray-800 font-medium">Chicken Republic</span>
          </div>
        </div>
      </div>

      <div className="flex max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Restaurant Header */}
          <div className="border-b border-gray-200">
            <div className="px-4 py-6">
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={restaurantData.img} 
                    alt={restaurantData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h1 className="text-xl font-bold text-gray-900">
                      {restaurantData.name}
                    </h1>
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <Heart 
                        size={20} 
                        className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                      />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <Bike size={14} />
                      <span>From {restaurantData.priceFrom}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{restaurantData.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-gray-900">{restaurantData.rating}</span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500">
                    Min order value: <span className="font-medium text-gray-900">{restaurantData.minOrder}</span>
                    <span className="mx-2">•</span>
                    Open From <span className="font-medium text-gray-900">{restaurantData.openFrom} - {restaurantData.openTo}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-4 py-4">
            <div className="relative flex">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <div className='bg-[#222] p-2'>
                <Search className="" size={20} color='white'/>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="border-b border-gray-200">
            <div className="overflow-x-auto">
              <div className="flex gap-2 px-4 py-3 min-w-max">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      activeCategory === category
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-4">
            {Object.entries(filteredMenu).map(([category, items]) => (
              <div key={category} className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4">{category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {items.map((item) => {
                    const isAdded = addedItems[item.id];
                    
                    return (
                      <div
                        key={item.id}
                        className="rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="flex gap-3 p-4">
                          <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                              {item.name}
                            </h3>
                            <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                              {item.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-gray-900">
                                ₦{item.price.toLocaleString()}
                              </span>
                              <button
                                onClick={() => handleAddToCart(item)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                                  isAdded
                                    ? 'bg-green-500 text-white'
                                    : 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-200'
                                }`}
                              >
                                {isAdded ? (
                                  <>
                                    <Check size={12} />
                                    Added
                                  </>
                                ) : (
                                  <>
                                    <Plus size={12} />
                                    Add
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {Object.keys(filteredMenu).length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No items found matching your search</p>
              </div>
            )}
          </div>
        </div>

        {/* Cart Sidebar - Desktop */}
        <Cart 
          cartType="restaurant"
          deliveryFee={600}
          serviceFee={600}
          showGroupByVendor={false}
          onPlaceOrder={handlePlaceOrder}
          onAddNewOrder={handleAddNewOrder}
          customizeModalOpen={customizeModalOpen}
          onCustomizeModalClose={handleCustomizeModalClose}
          selectedItem={selectedItem}
          restaurantData={restaurantData}
          onEditChoices={handleEditChoices}
          className="hidden lg:block"
        />
      </div>

      {/* Mobile Cart Modal */}
      <Cart 
        cartType="restaurant"
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        isMobile={true}
        deliveryFee={600}
        serviceFee={600}
        showGroupByVendor={false}
        onPlaceOrder={handlePlaceOrder}
        onAddNewOrder={handleAddNewOrder}
        customizeModalOpen={customizeModalOpen}
        onCustomizeModalClose={handleCustomizeModalClose}
        selectedItem={selectedItem}
        restaurantData={restaurantData}
        onEditChoices={handleEditChoices}
      />

      {/* Mobile Cart Button */}
      {getCartItemCount('restaurant') > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="lg:hidden fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 font-semibold z-50"
        >
          <ShoppingCart size={20} />
          Cart ({getCartItemCount('restaurant')})
        </button>
      )}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        cartItems={carts.restaurant || []}
        subtotal={getCartTotal('restaurant')}
        deliveryFee={600}
        serviceFee={600}
        total={getCartTotal('restaurant') + 600 + 600}
        restaurantData={restaurantData}
      />
    </div>
  );
}