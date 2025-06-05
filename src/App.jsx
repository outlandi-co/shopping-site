// App.jsx
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import AppRoutes from './AppRoutes';
import NavBar from './components/NavBar/NavBar'; // ✅ Import NavBar

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAddToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
  };

  return (
    <>
      <NavBar /> {/* ✅ NavBar shows on every page */}
      <AppRoutes
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        handleAddToCart={handleAddToCart}
        handleRemoveFromCart={handleRemoveFromCart}
        cartItems={cartItems}
      />
    </>
  );
};

export default App;
