import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import AppRoutes from './AppRoutes';
import './styles/app.scss';
import { ThemeProvider, useTheme } from './context/ThemeContext';

import {
  handleAddToCart as addCartHandler,
  handleRemoveFromCart as removeCartHandler,
  handleUpdateQuantity as updateCartHandler,
  handleClearCart as clearCartHandler
} from './handlers/cartHandlers';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppContent = () => {
  const { darkMode } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // 🔐 On mount: check auth token + cart state
  useEffect(() => {
    const token = Cookies.get('authToken');
    setIsAuthenticated(!!token);

    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (err) {
        console.error('🛒 Failed to parse cart from localStorage:', err);
      }
    }
  }, []);

  // 💾 Sync cart to localStorage when cart updates
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // 🌙 Sync theme preference
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // ➕ Add to cart
  const handleAddToCart = (item) => {
    setCartItems((prev) => addCartHandler(prev, item));
  };

  // ➖ Remove from cart
  const handleRemoveFromCart = (itemId) => {
    setCartItems((prev) => removeCartHandler(prev, itemId));
  };

  // 🔁 Update cart quantity
  const handleUpdateQuantity = (itemId, quantity) => {
    setCartItems((prev) => updateCartHandler(prev, itemId, quantity));
  };

  // 🧹 Clear cart
  const handleClearCart = () => {
    setCartItems(clearCartHandler());
    toast.info('🧹 Cart has been cleared.');
  };

  return (
    <>
      <AppRoutes
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        handleAddToCart={handleAddToCart}
        handleRemoveFromCart={handleRemoveFromCart}
        handleUpdateQuantity={handleUpdateQuantity}
        handleClearCart={handleClearCart}
        cartItems={cartItems}
      />
      <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar />
    </>
  );
};

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
