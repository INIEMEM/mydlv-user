import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, ShoppingCart, Plus, Check, Bike } from 'lucide-react';
import { Cart } from '../../components/carts/CartsComponent';
import { useCart } from '../../context/CartContext';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../utils/api';
export default function ItemsMatchingPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [addedItems, setAddedItems] = useState({});
  const [shoppingData, setShoppingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { getCartItemCount, addToCart } = useCart();
  const navigate = useNavigate();
  const { item: shoppingListId } = useParams(); // Get shopping list ID from URL

  // Fetch shopping list data
  useEffect(() => {
    const fetchShoppingList = async () => {
      try {
        setLoading(true);
        const result = await api.get(`https://mydlv.onrender.com/api/v1/product/shopping/${shoppingListId}`);
        console.log('Fetched shopping list data:', result);
        
       
        
        if ( result?.data?.data?.shoppingList) {
          setShoppingData(result?.data?.data?.shoppingList);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching shopping list:', err);
      } finally {
        setLoading(false);
      }
    };

    if (shoppingListId) {
      fetchShoppingList();
    }
  }, [shoppingListId]);

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

  const handleAddToCart = (product, vendor, vendorIndex, itemQuery) => {
    const cartItem = {
      id: `${product._id}-${vendor._id}-${vendorIndex}`,
      productId: product._id,
      name: product.title,
      price: parseFloat(product.price),
      vendorId: vendor._id,
      vendorName: vendor.business?.businessName || 'Unknown Vendor',
      image: product.images?.[0] || null,
      weight: product.weight || product.guage,
      delivery: '5-10mins', // You might want to calculate this based on vendor location
      query: itemQuery,
    };

    addToCart('shoppingList', cartItem);

    const key = `${product._id}-${vendor._id}-${vendorIndex}`;
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

  // Loading state
  if (loading) {
    return (
      <div className="min-h flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading shopping list...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={() => navigate('../shopping-list')}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Back to Shopping List
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!shoppingData || !shoppingData.items || shoppingData.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No items found in this shopping list</p>
          <button 
            onClick={() => navigate('../shopping-list')}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Back to Shopping List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <div className="px-1 py-3 sticky top-0 z-10 ">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button 
            onClick={() => navigate('../shopping-list')} 
            className="flex items-center gap-2 text-[#222] hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            <span className="text-[16px] font-medium">
              Back to { 'shopping list'}
            </span>
          </button>
          
          <button 
            onClick={() => setCartOpen(!cartOpen)}
            className="lg:hidden bg-gray-900 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2"
          >
            <ShoppingCart size={16} />
            Cart ({getCartItemCount('shoppingList')})
          </button>
        </div>
      </div>

      <div className="flex max-w-[1400px] mx-auto">
        {/* Main Content */}
        <div className="flex-1 pb-20 lg:pb-6 min-w-0">
          {/* Product List - Vertical Stack */}
          <div className="space-y-4">
            {shoppingData.items.map((item, index) => {
              const hasVendors = item.matchedVendors && item.matchedVendors.length > 0;
              
              return (
                <div key={item.itemId} className="rounded-lg shadow-sm">
                  {/* Product Header */}
                  <div className="flex items-center gap-4 border-b border-gray-100 p-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base text-gray-900">{item.query}</h3>
                      {!hasVendors && (
                        <p className="text-sm text-gray-500 mt-1">No vendors available</p>
                      )}
                    </div>
                  </div>

                  {/* Vendor Cards - Horizontal Scroll */}
                  {hasVendors && (
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
                        
                        {item.matchedVendors.map((product, vendorIndex) => {
                          const itemKey = `${product._id}-${product.vendor._id}-${vendorIndex}`;
                          const isAdded = addedItems[itemKey];

                          return (
                            <div 
                              key={`${product._id}-${vendorIndex}`}
                              className="flex-shrink-0 rounded-lg overflow-hidden min-w-[170px] hover:border-green-500 hover:shadow-md transition-all duration-200"
                            >
                              {/* Product Image */}
                              <div className="w-full h-32 bg-white rounded-[10px] flex items-center justify-center overflow-hidden">
                                {product.images && product.images.length > 0 ? (
                                  <img 
                                    src={product.images[0]} 
                                    alt={product.title} 
                                    className="w-full h-full object-cover" 
                                  />
                                ) : (
                                  <Heart size={40} className="text-green-400 fill-green-400 opacity-50" />
                                )}
                              </div>

                              {/* Card Content */}
                              <div className="p-3">
                                {/* Vendor Name */}
                                <div className="text-xs text-gray-600  line-clamp-2 leading-tight ">
                                  {product?.business?.businessName || product?.vendor.address?.city || 'Local Vendor'}
                                </div>

                                {/* Price, Weight, Delivery in one line */}
                                <div className="flex items-center gap-2 text-xs text-gray-700 mt-1">
                                  <span className="font-bold text-base">
                                    ₦{parseFloat(product.price).toLocaleString()}
                                  </span>
                                  <span className="text-gray-400">•</span>
                                  <span>{product.weight || product.guage}</span>
                                  <span className="text-gray-400">•</span>
                                  <div className="flex items-center gap-1">
                                    <Bike size={12} />
                                    <span>5-10mins</span>
                                  </div>
                                </div>

                                {/* Add to Cart Button */}
                                <button
                                  onClick={() => handleAddToCart(product, product.vendor, vendorIndex, item.query)}
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
                  )}
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