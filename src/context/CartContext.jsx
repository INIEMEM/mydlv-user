import React, { createContext, useContext, useState, useEffect } from 'react';


// Cart Context
const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState({
    shoppingList: [],
    restaurant: [],
    grocery: [],
    pharmacy: [],
    fashion: [],
    electronics: [],
  });

  const addToCart = (cartType, item) => {
    setCarts(prev => {
      const existingItemIndex = prev[cartType].findIndex(
        cartItem => cartItem.id === item.id && cartItem.vendorId === item.vendorId
      );

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const updatedCart = [...prev[cartType]];
        updatedCart[existingItemIndex].quantity += 1;
        return { ...prev, [cartType]: updatedCart };
      } else {
        // Add new item
        return {
          ...prev,
          [cartType]: [...prev[cartType], { ...item, quantity: 1, addedAt: Date.now() }]
        };
      }
    });
  };

  const removeFromCart = (cartType, itemId, vendorId) => {
    setCarts(prev => ({
      ...prev,
      [cartType]: prev[cartType].filter(
        item => !(item.id === itemId && item.vendorId === vendorId)
      )
    }));
  };

  const updateQuantity = (cartType, itemId, vendorId, change) => {
    setCarts(prev => ({
      ...prev,
      [cartType]: prev[cartType].map(item =>
        item.id === itemId && item.vendorId === vendorId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    }));
  };

  const clearCart = (cartType) => {
    setCarts(prev => ({
      ...prev,
      [cartType]: []
    }));
  };

  const getCartTotal = (cartType) => {
    return carts[cartType].reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );
  };

  const getCartItemCount = (cartType) => {
    return carts[cartType].reduce((sum, item) => sum + item.quantity, 0);
  };

  const value = {
    carts,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
