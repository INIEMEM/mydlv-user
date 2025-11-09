import React, { useState } from 'react';
import { ArrowLeft, Heart, ShoppingCart, Plus, Check, Bike } from 'lucide-react';
import { Cart } from '../../components/carts/CartsComponent';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
export default function ItemsMatchingPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [addedItems, setAddedItems] = useState({});
  const { getCartItemCount, addToCart } = useCart();
  const navigate = useNavigate()
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
      vendorId: 'vendor-1',
      price: 5000,
      weight: '10kg',
      delivery: '5-10mins',
      liked: true,
      image: null
    },
    {
      id: 2,
      name: 'Palm oil one keg',
      vendor: 'Local market Ikot Ekpene road',
      vendorId: 'vendor-1',
      price: 5000,
      weight: '10kg',
      delivery: '5-10mins',
      liked: true,
      image: null
    },
    {
      id: 3,
      name: 'Palm oil one keg',
      vendor: 'Local market Ikot Ekpene road',
      vendorId: 'vendor-1',
      price: 5000,
      weight: '10kg',
      delivery: '5-10mins',
      liked: true,
      image: null
    },
    {
      id: 4,
      name: 'Palm oil one keg',
      vendor: 'Local market Ikot Ekpene road',
      vendorId: 'vendor-1',
      price: 5000,
      weight: '10kg',
      delivery: '5-10mins',
      liked: true,
      image: null
    },
    {
      id: 5,
      name: 'Palm oil one keg',
      vendor: 'Local market Ikot Ekpene road',
      vendorId: 'vendor-1',
      price: 5000,
      weight: '10kg',
      delivery: '5-10mins',
      liked: true,
      image: null
    }
  ];

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

  const handleAddToCart = (product, vendorIndex) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      vendorId: `${product.vendorId}-${vendorIndex}`,
      vendorName: product.vendor,
      image: product.image,
      weight: product.weight,
      delivery: product.delivery,
    };

    addToCart('shoppingList', cartItem);

    const key = `${product.id}-${vendorIndex}`;
    setAddedItems(prev => ({ ...prev, [key]: true }));

    setTimeout(() => {
      setAddedItems(prev => {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      });
    }, 2000);
  };

  const handlePlaceOrder = () => {
    console.log('Place order clicked');
  };

  const handleAddNewOrder = () => {
    console.log('Add new order clicked');
  };

  return (
    <div className="min-h-screen relative ">
      {/* Header */}
      <div className=" px-4 py-3 sticky top-0 z-10 ">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button onClick={()=> navigate('../shopping-list')} className="flex items-center gap-2 text-[#222] hover:text-gray-900">
            <ArrowLeft size={20} />
            <span className="text-[16px] font-medium">Back to shopping list</span>
          </button>
          
          <button 
            onClick={() => setCartOpen(!cartOpen)}
            className="hidden lg:hidden bg-gray-900 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2"
          >
            <ShoppingCart size={16} />
            Cart ({getCartItemCount('shoppingList')})
          </button>
        </div>
      </div>

      <div className="flex max-w-[1400px] mx-auto ">
        {/* Main Content */}
        <div className="flex-1 pb-20 lg:pb-6 min-w-0">
          {/* Product List - Vertical Stack */}
          <div className="space-y-4">
            {shoppingListItems.map((item, index) => {
              const product = matchingProducts[index];
              return (
                <div key={index} className="rounded-lg shadow-sm ">
                  {/* Product Header */}
                  <div className="flex items-center gap-4  border-b border-gray-100">
                    <div className="relative flex-shrink-0">
                      {/* <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        {product.image ? (
                          <img src={product.image} alt={item} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-10 h-10 bg-gray-300 rounded"></div>
                        )}
                      </div> */}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base text-gray-900">{item}</h3>
                    </div>
                    {/* <button className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors">
                      <Heart size={20} className={product.liked ? 'fill-green-500 text-green-500' : 'text-gray-400'} />
                    </button> */}
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
                      {[1, 2, 3, 4, 5, 6].map((vendorIndex) => {
                        const itemKey = `${product.id}-${vendorIndex}`;
                        const isAdded = addedItems[itemKey];

                        return (
                          <div 
                            key={vendorIndex} 
                            className="flex-shrink-0  rounded-lg overflow-hidden min-w-[170px] hover:border-green-500 hover:shadow-md transition-all duration-200 "
                          >
                            {/* Product Image */}
                            <div className="w-full h-32 bg-white rounded-[10px] flex items-center justify-center">
                              {product.image ? (
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                              ) : (
                                <Heart size={40} className="text-green-400 fill-green-400 opacity-50" />
                              )}
                            </div>

                            {/* Card Content */}
                            <div className="p-3">
                              {/* Vendor Name */}
                              <div className="text-xs text-gray-600 mb-2 line-clamp-2 leading-tight min-h-[32px]">
                                {product.vendor}
                              </div>

                              {/* Price, Weight, Delivery in one line */}
                              <div className="flex items-center gap-2 text-xs text-gray-700 mb-3">
                                <span className="font-bold text-base">₦{product.price.toLocaleString()}</span>
                                <span className="text-gray-400">•</span>
                                <span>{product.weight}</span>
                                <span className="text-gray-400">•</span>
                                <div className="flex items-center gap-1">
                                  <Bike size={12} className="" />
                                  <span>{product.delivery}</span>
                                </div>
                              </div>

                              {/* Add to Cart Button */}
                              <button
                                onClick={() => handleAddToCart(product, vendorIndex)}
                                className={`w-full py-2 rounded-lg font-semibold text-xs transition-all duration-200 flex items-center justify-center gap-1.5 ${
                                  isAdded 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-200'
                                }`}
                              >
                                {isAdded ? (
                                  <>
                                    <Check size={14} />
                                    Added
                                  </>
                                ) : (
                                  <>
                                    <Plus size={14} />
                                    Add to Cart
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cart Sidebar - Desktop */}
        <div className="hidden lg:block">
          <Cart 
            cartType="shoppingList"
            deliveryFee={600}
            serviceFee={600}
            showGroupByVendor={true}
            onPlaceOrder={handlePlaceOrder}
            onAddNewOrder={handleAddNewOrder}
            // className='mt-[100px]'
          />
        </div>

        {/* Mobile Cart Modal */}
        <Cart 
          cartType="shoppingList"
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          isMobile={true}
          deliveryFee={600}
          serviceFee={600}
          showGroupByVendor={true}
          onPlaceOrder={handlePlaceOrder}
          onAddNewOrder={handleAddNewOrder}
        />
      </div>
    </div>
  );
}