import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, X, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import EmptyCart from '../../assets/emptycart.png';

// Customize Order Modal Component
const CustomizeOrderModal = ({ isOpen, onClose, item, restaurantData, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({
    takeaway: '1 Takeaway pack',
    burger: '1 Takeaway pack',
    fries: ['Potato Fries', 'Sweet Potato Fries'],
    protein: ['Goat Meat', 'Cow Beef']
  });

  if (!isOpen) return null;

  const customizationOptions = {
    takeaway: {
      title: "Takeaway",
      subtitle: "Make 1 choice",
      required: true,
      type: "single",
      options: [
        { id: 1, name: "1 Takeaway pack", selected: true },
        { id: 2, name: "2 Takeaway packs", selected: false }
      ]
    },
    burger: {
      title: "Choose your burger",
      subtitle: "Make 1 choice",
      required: false,
      type: "single",
      options: [
        { id: 1, name: "1 Takeaway pack", selected: true },
        { id: 2, name: "King burger", selected: false }
      ]
    },
    fries: {
      title: "Choose your Fries",
      subtitle: "Make up 2 choice",
      required: false,
      type: "multiple",
      maxSelections: 2,
      options: [
        { id: 1, name: "Potato Fries", selected: true },
        { id: 2, name: "Sweet Potato Fries", selected: true },
        { id: 3, name: "Yam Fries", selected: false }
      ]
    },
    protein: {
      title: "Choose select Protein",
      subtitle: "Make up 2 choice",
      required: false,
      type: "multiple",
      maxSelections: 2,
      options: [
        { id: 1, name: "Goat Meat", selected: true },
        { id: 2, name: "Cow Beef", selected: true },
        { id: 3, name: "Yam Fries", selected: false }
      ]
    }
  };

  const handleAddToCart = () => {
    const choices = [
      ...selectedOptions.fries,
      ...selectedOptions.protein,
      selectedOptions.burger,
      selectedOptions.takeaway
    ].filter(Boolean);

    const cartItem = {
      id: item?.id || Date.now(),
      name: item?.name || "Big Boyz Combo",
      price: item?.price || 7000,
      vendorId: restaurantData?.id,
      vendorName: restaurantData?.name,
      image: item?.image,
      category: item?.category,
      choices: choices,
      quantity: quantity
    };

    onAddToCart(cartItem);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center  justify-end p-4 border-b border-gray-200">
          {/* <h2 className="text-lg font-bold text-gray-900">
            {item?.name || "Big Boyz Combo"}
          </h2> */}
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 md:flex overflow-y-auto p-4 flex-col-reverse
flex lg:flex-row">
          {/* Customization Options */}
          <div className="space-y-4 md:w-[400px] flex-2">
            {Object.entries(customizationOptions).map(([key, option]) => (
              <div key={key} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{option.title}</h4>
                    <p className="text-xs text-gray-500">{option.subtitle}</p>
                  </div>
                  {option.required && (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Required</span>
                  )}
                </div>

                <div className="space-y-2">
                  {option.options.map((opt) => (
                    <div
                      key={opt.id}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer ${
                        opt.selected
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-sm text-gray-900">{opt.name}</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        opt.selected ? 'border-green-500 bg-green-500' : 'border-gray-300'
                      }`}>
                        {opt.selected && (
                          <Check size={14} className="text-white" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Item Preview */}
          <div className="flex-1 rounded-xl p-4 mb-4">
            <div className="gap-4">
              <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                {item?.image && (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{item?.name || "Big Boyz Combo"}</h3>
                <p className="text-xs text-gray-500 mb-2">
                  {item?.description || "1 Chief Burger, Potato fries (Regular), Take-away pack (1,000ml with lid) included, beverage drink"}
                </p>
                <p className="text-lg font-bold text-gray-900">₦{((item?.price || 7000) * quantity).toLocaleString()}</p>
              </div>
            </div>
            <div className="border-t border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            {/* <span className="text-sm text-gray-600">Quantity</span> */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              >
                <Minus size={16} />
              </button>
              <span className="text-lg font-semibold min-w-[24px] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Add for ₦{((item?.price || 7000) * quantity).toLocaleString()}
          </button>
        </div>
          </div>
          
        </div>

        {/* Footer */}
        
      </div>
    </div>
  );
};

export const Cart = ({ 
  cartType = 'shoppingList', 
  isOpen, 
  onClose,
  deliveryFee = 600,
  serviceFee = 600,
  className = '',
  isMobile = false,
  onPlaceOrder,
  onAddNewOrder,
  showGroupByVendor = true,
  
  customizeModalOpen = false,
  onCustomizeModalClose,
  selectedItem = null,
  restaurantData = null,
  onEditChoices, 
}) => {
  const { carts, updateQuantity, removeFromCart, getCartTotal, getCartItemCount, addToCart } = useCart();
  const cartItems = carts[cartType] || [];
  const subtotal = getCartTotal(cartType);
  const total = subtotal + deliveryFee + serviceFee;

  // Group items by vendor
  const groupedItems = showGroupByVendor ? cartItems.reduce((acc, item) => {
    const vendorKey = `${item.vendorId}-${item.vendorName}`;
    if (!acc[vendorKey]) {
      acc[vendorKey] = {
        vendorId: item.vendorId,
        vendorName: item.vendorName,
        items: []
      };
    }
    acc[vendorKey].items.push(item);
    return acc;
  }, {}) : { default: { vendorName: '', items: cartItems } };

  const handleModalAddToCart = (cartItem) => {
    addToCart(cartType, cartItem);
    if (onCustomizeModalClose) {
      onCustomizeModalClose();
    }
  };

  const handleAddNewOrder = (item) => {
    // Prepare the item data for duplication but DON'T add to cart yet
    const duplicatedItem = {
      ...item,
      id: Date.now() + Math.random(), // Generate new unique ID
      addedAt: Date.now(),
      quantity: 1, // Start with quantity 1 for the duplicate
      isDuplicate: true // Mark as duplicate
    };
    
    // Only open the customize modal - the item will be added when modal confirms
    if (onEditChoices) {
      onEditChoices(duplicatedItem);
    }
  };
  const CartContent = () => (
    <>
      <div className="bg-[#2B2B2B] text-white px-4 py-3 rounded-t-lg text-sm font-semibold flex items-center justify-between">
        <span>Cart ({getCartItemCount(cartType)})</span>
        {onClose && isMobile && (
          <button onClick={onClose} className="hover:text-gray-300">
            <X size={20} />
          </button>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-b-lg p-4 space-y-3 shadow-sm">
        {/* Cart Items */}
        <div className="overflow-y-auto max-h-[calc(100vh-450px)]">
          {cartItems.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <img src={EmptyCart} alt='empty' className='w-[50px] h-[50px] object-contain md:w-[150px] md:h-[150px] mx-auto mb-2'/>
              <p className="text-sm">Your cart is empty</p>
              <p className='text-sm'>When you add products they will appear here.</p>
            </div>
          ) : (
            Object.values(groupedItems).map((vendor, index) => (
              <div key={vendor.vendorId || index} className="mb-4">
                {showGroupByVendor && vendor.vendorName && (
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 pb-2 border-b">
                    {vendor.vendorName}
                  </h4>
                )}
                
                {vendor.items.map((item) => (
                  <div key={`${item.id}-${item.vendorId}`} className="border border-gray-200 rounded-lg p-3 mb-3">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                            {item.image ? (
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-300"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium text-gray-900 mb-1">
                              {item.name}
                            </div>
                            {item.category && (
                              <div className="text-xs text-gray-500 mb-1">
                                {item.category}
                              </div>
                            )}
                            {item.choices && item.choices.length > 0 && (
                              <div className="text-xs text-gray-500 mt-1">
                                <div className="font-medium mb-0.5">Your choices:</div>
                                {item.choices.map((choice, idx) => (
                                  <div key={idx} className="text-[11px]">• {choice}</div>
                                ))}
                              </div>
                            )}
                            <div className="text-base font-bold text-gray-900 mt-1">
                              ₦{item.price.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(cartType, item.id, item.vendorId)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mb-3">
                      <button
                        onClick={() => updateQuantity(cartType, item.id, item.vendorId, -1)}
                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-semibold min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(cartType, item.id, item.vendorId, 1)}
                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Order Actions */}
                    {cartType !== 'shoppingList' && <div className="bg-gray-50 -mx-3 -mb-3 mt-3 p-3 rounded-b-lg">
                      <div className="bg-white rounded-lg p-3 mb-2">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs font-semibold text-gray-900">Your choices</div>
                          {item.isDuplicate && (
                            <button
                              onClick={() => {
                                if (onEditChoices) {
                                  onEditChoices(item);
                                }
                              }}
                              className="text-xs text-green-600 font-medium hover:text-green-700"
                            >
                              Edit choices
                            </button>
                          )}
                        </div>
                        {item.choices && item.choices.length > 0 ? (
                          <div className="space-y-1">
                            {item.choices.map((choice, idx) => (
                              <div key={idx} className="text-xs text-gray-600">{choice}</div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-xs text-gray-400">No customizations</div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddNewOrder(item)}
                          className="flex-1 bg-green-500 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-green-600 transition-colors"
                        >
                          Add new order
                        </button>
                        <button
                          className="flex-1 bg-gray-900 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                        >
                          Save order
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 2H3.5C2.67157 2 2 2.67157 2 3.5V14L8 11L14 14V3.5C14 2.67157 13.3284 2 12.5 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Totals */}
        {cartItems.length > 0 && (
          <>
            <div className="border-t border-gray-200 pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Sub total ({getCartItemCount(cartType)} items)</span>
                <span className="font-medium text-gray-900">₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery fee</span>
                <span className="font-medium text-gray-900">₦{deliveryFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Service fee</span>
                <span className="font-medium text-gray-900">₦{serviceFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-bold border-t border-gray-200 pt-3">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button 
              onClick={onPlaceOrder}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 text-sm transition-colors"
            >
              PLACE ORDER
            </button>

            <button 
              onClick={onAddNewOrder}
              className="w-full text-green-600 py-2 text-sm flex items-center justify-center gap-2 hover:text-green-700 font-medium"
            >
              <Plus size={16} />
              Add new order
            </button>
          </>
        )}
      </div>
    </>
  );

  // Mobile Modal View
  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
            <div className="bg-white w-full max-h-[85vh] rounded-t-2xl overflow-hidden">
              <CartContent />
            </div>
          </div>
        )}
        
        {/* Customize Order Modal */}
        <CustomizeOrderModal 
          isOpen={customizeModalOpen}
          onClose={onCustomizeModalClose}
          item={selectedItem}
          restaurantData={restaurantData}
          onAddToCart={handleModalAddToCart}
        />
      </>
    );
  }

  // Desktop/Tablet Fixed Sidebar View
  return (
    <>
      <div className={`w-80 flex-shrink-0 ${className}`}>
        <div className="fixed top-20 w-80 max-h-[calc(100vh-5rem)] overflow-hidden">
          <CartContent />
        </div>
      </div>
      
      {/* Customize Order Modal */}
      <CustomizeOrderModal 
        isOpen={customizeModalOpen}
        onClose={onCustomizeModalClose}
        item={selectedItem}
        restaurantData={restaurantData}
        onAddToCart={handleModalAddToCart}
      />
    </>
  );
};