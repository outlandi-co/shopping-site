import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import ShoppingCart from './components/ShoppingCart';
import AppRoutes from './AppRoutes';

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
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <>
      <ShoppingCart
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
      />
      <AppRoutes
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        handleAddToCart={handleAddToCart}
      />
    </>
  );
};

export default App;
