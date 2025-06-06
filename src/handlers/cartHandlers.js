// src/handlers/cartHandlers.js

export const handleAddToCart = (cartItems, product) => {
  const existingItem = cartItems.find(item => item._id === product._id);

  if (existingItem) {
    return cartItems.map(item =>
      item._id === product._id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cartItems, { ...product, quantity: 1 }];
};

export const handleRemoveFromCart = (cartItems, productId) => {
  const item = cartItems.find(p => p._id === productId);

  if (item && item.quantity === 1) {
    return cartItems.filter(p => p._id !== productId);
  }

  return cartItems.map(p =>
    p._id === productId
      ? { ...p, quantity: item.quantity - 1 }
      : p
  );
};

/**
 * Update item quantity directly.
 * @param {Array} cartItems
 * @param {string} productId
 * @param {number} quantity
 */
export const handleUpdateQuantity = (cartItems, productId, quantity) => {
  if (quantity <= 0) {
    return cartItems.filter(item => item._id !== productId);
  }

  return cartItems.map(item =>
    item._id === productId ? { ...item, quantity } : item
  );
};

/**
 * Clears the entire cart.
 * @returns {Array} Empty cart array
 */
export const handleClearCart = () => {
  return [];
};
