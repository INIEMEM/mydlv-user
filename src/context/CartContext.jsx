import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Initialize state from localStorage or use default empty carts
  const [carts, setCarts] = useState(() => {
    try {
      const savedCarts = localStorage.getItem('mydlv-carts');
      if (savedCarts) {
        return JSON.parse(savedCarts);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
    
    // Default empty carts if nothing in localStorage
    return {
      shoppingList: [],
      restaurant: [],
      grocery: [],
      pharmacy: [],
      fashion: [],
      electronics: [],
    };
  });

  // Save to localStorage whenever carts state changes
  useEffect(() => {
    try {
      localStorage.setItem('mydlv-carts', JSON.stringify(carts));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [carts]);

  const addToCart = (cartType, item) => {
    setCarts(prev => {
      // If item is marked as duplicate, always add as new item
      if (item.isDuplicate) {
        const newItem = {
          ...item,
          quantity: item.quantity || 1,
          addedAt: item.addedAt || Date.now()
        };
        return {
          ...prev,
          [cartType]: [...prev[cartType], newItem]
        };
      }

      // For non-duplicate items, check if exists and increment
      const existingItemIndex = prev[cartType].findIndex(
        cartItem => cartItem.id === item.id && cartItem.vendorId === item.vendorId
      );

      if (existingItemIndex > -1) {
        // Item exists - increment quantity
        const updatedCart = [...prev[cartType]];
        updatedCart[existingItemIndex].quantity += (item.quantity || 1);
        return { ...prev, [cartType]: updatedCart };
      } else {
        // New item - add with specified quantity or default to 1
        const newItem = {
          ...item,
          quantity: item.quantity || 1,
          addedAt: item.addedAt || Date.now()
        };
        return {
          ...prev,
          [cartType]: [...prev[cartType], newItem]
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

  const clearAllCarts = () => {
    setCarts({
      shoppingList: [],
      restaurant: [],
      grocery: [],
      pharmacy: [],
      fashion: [],
      electronics: [],
    });
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

  const getTotalItemsAllCarts = () => {
    return Object.values(carts).reduce(
      (total, cart) => total + cart.reduce((sum, item) => sum + item.quantity, 0),
      0
    );
  };

  const value = {
    carts,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    clearAllCarts,
    getCartTotal,
    getCartItemCount,
    getTotalItemsAllCarts,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};