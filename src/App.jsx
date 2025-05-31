import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import ShoppingCart from './components/shoppingCart';
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
    setCartItems([...cartItems, item]);
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  return (
    <div>
      <ShoppingCart
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
      />
      <AppRoutes
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default App;
