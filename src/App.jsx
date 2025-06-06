import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import AppRoutes from './AppRoutes';
import './styles/app.scss';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const AppContent = () => {
  const { darkMode } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const token = Cookies.get('authToken');
    setIsAuthenticated(!!token);
  }, []);

  // ✅ Toggle dark class on body tag
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleAddToCart = (item) => setCartItems((prev) => [...prev, item]);
  const handleRemoveFromCart = (itemId) =>
    setCartItems((prev) => prev.filter((item) => item._id !== itemId));

  return (
    <AppRoutes
      isAuthenticated={isAuthenticated}
      setIsAuthenticated={setIsAuthenticated}
      handleAddToCart={handleAddToCart}
      handleRemoveFromCart={handleRemoveFromCart}
      cartItems={cartItems}
    />
  );
};

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
