import React, { useState } from 'react';
import { ArrowLeft, Heart, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

export default function ItemsMatchingPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: '2 Yam Tuber', price: 5000, quantity: 1, vendor: 'Local Market Ikot Ekpene Road' },
    { id: 2, name: 'Palmoil one keg', price: 5000, quantity: 1, vendor: 'Local Market Ikot Ekpene Road' },
    { id: 3, name: 'Tomato paste 1 carton', price: 5000, quantity: 1, vendor: 'Local Market Ikot Ekpene Road' },
    { id: 4, name: 'Indomie 1 carton', price: 5000, quantity: 1, vendor: 'Local Market Ikot Ekpene Road' }
  ]);

  const shoppingListItems = [
    'Yams 2 tubers',
    'Palm oil one keg',
    'Palm oil one keg',
    'Palm oil one keg',
    'Palm oil one keg'
  ];

  const matchingProducts = [
    {
      id: 1,
      name: 'Yams 2 tubers',
      vendor: 'Local market Ikot Ekpene road',
      price: 5000,
      weight: '10kg',
      delivery: '5-10mins',
      liked: true
    },
    {
      id: 2,
      name: 'Palm oil one keg',
      vendor: 'Local market Ikot Ekpene road',
      price: 5000,
      weight: '10kg',
      delivery: '5-10mins',
      liked: true
    },
    {
      id: 3,
      name: 'Palm oil one keg',
      vendor: 'Local market Ikot Ekpene road',
      price: 5000,
      weight: '10kg',
      delivery: '5-10mins',
      liked: true
    },
    {
      id: 4,
      name: 'Palm oil one keg',
      vendor: 'Local market Ikot Ekpene road',
      price: 5000,
      weight: '10kg',
      delivery: '5-10mins',
      liked: true
    },
    {
      id: 5,
      name: 'Palm oil one keg',
      vendor: 'Local market Ikot Ekpene road',
      price: 5000,
      weight: '10kg',
      delivery: '5-10mins',
      liked: true
    }
  ];

  const updateQuantity = (id, change) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const scrollContainer = (index, direction) => {
    const container = document.getElementById(`vendor-scroll-${index}`);
    if (container) {
      const scrollAmount = 190;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 600;
  const serviceFee = 600;
  const total = subtotal + deliveryFee + serviceFee;

  return (
    <div className="min-h-screen  relative">
      {/* Header */}
      <div className=" border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back to shopping list</span>
          </button>
          
          <button 
            onClick={() => setCartOpen(!cartOpen)}
            className="lg:hidden bg-gray-900 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2"
          >
            <ShoppingCart size={16} />
            Cart ({cartItems.length})
          </button>
        </div>
      </div>

      <div className="flex max-w-[1400px] mx-auto gap-6 p-">
        {/* Main Content */}
        <div className="flex-1 pb-20 lg:pb-6 min-w-0">
          {/* Product List - Vertical Stack */}
          <div className="space-y-4">
            {shoppingListItems.map((item, index) => {
              const product = matchingProducts[index];
              return (
                <div key={index} className=" rounded-lg  shadow-sm">
                  {/* Product Header */}
                  <div className="flex items-center gap-4 p-4 border-b border-gray-100">
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="w-10 h-10 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base text-gray-900">{item}</h3>
                    </div>
                    <button className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors">
                      <Heart size={20} className={product.liked ? 'fill-green-500 text-green-500' : 'text-gray-400'} />
                    </button>
                  </div>

                  {/* Vendor Cards - Horizontal Scroll */}
                  <div className="p-4 relative">
                    {/* Left Arrow */}
                    <button
                      onClick={() => scrollContainer(index, 'left')}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
                      aria-label="Scroll left"
                    >
                      <ArrowLeft size={16} className="text-gray-700" />
                    </button>

                    {/* Right Arrow */}
                    <button
                      onClick={() => scrollContainer(index, 'right')}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
                      aria-label="Scroll right"
                    >
                      <ArrowLeft size={16} className="text-gray-700 rotate-180" />
                    </button>

                    <div 
                      id={`vendor-scroll-${index}`}
                      className="flex gap-3 overflow-x-auto pb-2 px-10"
                      style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch'
                      }}
                    >
                      <style jsx>{`
                        div::-webkit-scrollbar {
                          display: none;
                        }
                      `}</style>
                      {[1, 2, 3, 4, 5, 6].map((vendor) => (
                        <div 
                          key={vendor} 
                          className="flex-shrink-0 border-2 border-gray-200 rounded-lg p-3 min-w-[170px] hover:border-green-500 hover:shadow-md cursor-pointer transition-all duration-200"
                        >
                          <div className="text-xs text-gray-600 mb-2 h-8 leading-tight">
                            {product.vendor}
                          </div>
                          <div className="font-bold text-lg mb-3 text-gray-900">
                            N{product.price.toLocaleString()}
                          </div>
                          <div className="space-y-1.5">
                            <div className="text-xs text-gray-500 font-medium">
                              {product.weight}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              <span>{product.delivery}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cart Sidebar - Desktop */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-20">
            <div className="bg-gray-900 text-white px-4 py-3 rounded-t-lg text-sm font-semibold">
              Cart
            </div>
            
            <div className="bg-white border border-gray-200 rounded-b-lg p-4 space-y-3 shadow-sm max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Cart Items */}
              <div className='overflow-y-auto max-h-[calc(100vh-500px)]'>
              {cartItems.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-3 mb-3">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-semibold text-gray-900">{item.vendor}</h4>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-gray-600 mb-1">{item.name}</div>
                          <div className="text-base font-bold text-gray-900">N{item.price.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-semibold min-w-[24px] text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
              </div>

              {/* Totals */}
              <div className="border-t border-gray-200 pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Sub total ({cartItems.length} Orders)</span>
                  <span className="font-medium text-gray-900">N{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery fee</span>
                  <span className="font-medium text-gray-900">N{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service fee</span>
                  <span className="font-medium text-gray-900">N{serviceFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base font-bold border-t border-gray-200 pt-3">
                  <span>Total</span>
                  <span>N{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 text-sm transition-colors">
                PLACE ORDER
              </button>

              <button className="w-full text-green-600 py-2 text-sm flex items-center justify-center gap-2 hover:text-green-700 font-medium">
                <Plus size={16} />
                Add new order
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Cart Modal */}
        {cartOpen && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
            <div className="bg-white w-full max-h-[85vh] rounded-t-2xl overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Cart ({cartItems.length})</h2>
                <button onClick={() => setCartOpen(false)} className="text-gray-500">
                  <ArrowLeft size={20} />
                </button>
              </div>

              <div className="p-4 space-y-3">
                {/* Cart Items */}
                {cartItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium mb-1">{item.vendor}</h4>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-8 h-8 bg-gray-200 rounded"></div>
                          <div className="flex-1">
                            <div className="text-xs text-gray-600">{item.name}</div>
                            <div className="text-sm font-semibold">N{item.price.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-medium min-w-[20px] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Totals */}
                <div className="border-t pt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sub total ({cartItems.length} Orders)</span>
                    <span className="font-medium">N{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery fee</span>
                    <span className="font-medium">N{deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service fee</span>
                    <span className="font-medium">N{serviceFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold border-t pt-2">
                    <span>Total</span>
                    <span>N{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 text-sm">
                  PLACE ORDER
                </button>

                <button className="w-full text-green-600 py-2 text-sm flex items-center justify-center gap-2 hover:text-green-700">
                  <Plus size={16} />
                  Add new order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation - Mobile */}
      {/* <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button className="flex flex-col items-center gap-1 text-gray-700">
            <span className="text-xs">📍</span>
            <span className="text-[10px]">Explore</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-700 relative">
            <span className="text-xs">🚗</span>
            <span className="text-[10px]">My Rider</span>
            <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[8px] rounded-full w-3 h-3 flex items-center justify-center">2</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-700 relative">
            <span className="text-xs">📦</span>
            <span className="text-[10px]">My Order</span>
            <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[8px] rounded-full w-3 h-3 flex items-center justify-center">2</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-700">
            <span className="text-xs">⚙️</span>
            <span className="text-[10px]">Services</span>
          </button>
        </div>
      </div> */}
    </div>
  );
}