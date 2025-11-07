import React, { createContext, useContext, useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react';


export const Cart = ({ 
  cartType = 'shoppingList', 
  isOpen, 
  onClose,
  deliveryFee = 600,
  serviceFee = 600,
  className = '',
}) => {
  const { carts, updateQuantity, removeFromCart, getCartTotal, getCartItemCount } = useCart();
  const cartItems = carts[cartType] || [];
  const subtotal = getCartTotal(cartType);
  const total = subtotal + deliveryFee + serviceFee;

  // Group items by vendor
  const groupedItems = cartItems.reduce((acc, item) => {
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
  }, {});

  const CartContent = () => (
    <>
      <div className="bg-gray-900 text-white px-4 py-3 rounded-t-lg text-sm font-semibold flex items-center justify-between">
        <span>Cart ({getCartItemCount(cartType)})</span>
        {onClose && (
          <button onClick={onClose} className="lg:hidden">
            <X size={20} />
          </button>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-b-lg p-4 space-y-3 shadow-sm">
        {/* Cart Items */}
        <div className="overflow-y-auto max-h-[calc(100vh-400px)]">
          {cartItems.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <ShoppingCart size={48} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">Your cart is empty</p>
            </div>
          ) : (
            Object.values(groupedItems).map((vendor) => (
              <div key={vendor.vendorId} className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2 pb-2 border-b">
                  {vendor.vendorName}
                </h4>
                
                {vendor.items.map((item) => (
                  <div key={`${item.id}-${item.vendorId}`} className="border border-gray-200 rounded-lg p-3 mb-3">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                            {item.image && (
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover"
                              />
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
                    <div className="flex items-center gap-3">
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
            <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 text-sm transition-colors">
              PLACE ORDER
            </button>

            <button className="w-full text-green-600 py-2 text-sm flex items-center justify-center gap-2 hover:text-green-700 font-medium">
              <Plus size={16} />
              Add new order
            </button>
          </>
        )}
      </div>
    </>
  )};
