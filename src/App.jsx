import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import HomePage from './pages/Home-Page/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import MembershipPage from './pages/MembershipPage/MembershipPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ShoppingCart from './components/shoppingCart';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState([]); // Initialize cartItems state
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    // Mock authentication for simplicity
    Cookies.set('authToken', 'mockToken');
    setIsAuthenticated(true);
    navigate('/home');
  };

  const handleLogout = () => {
    Cookies.remove('authToken');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]); // Add item to cart
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId)); // Remove item from cart
  };

  return (
    <div>
      <header>
        <nav>
          {!isAuthenticated ? (
            <>
              <button onClick={() => navigate('/login')}>Login</button>
              <button onClick={() => navigate('/register')}>Register</button>
              <button onClick={() => navigate('/membership')}>Membership</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/home')}>Home</button>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </nav>
      </header>

      <ShoppingCart 
        cartItems={cartItems} 
        onRemoveFromCart={handleRemoveFromCart} 
      /> {/* This will show the cart status and allow item removal */}

      <Routes>
        <Route path="/home" element={<HomePage onAddToCart={handleAddToCart} />} /> {/* Pass handleAddToCart */}
        <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/" element={<HomePage onAddToCart={handleAddToCart} />} /> {/* Pass handleAddToCart */}
      </Routes>
    </div>
  );
};

export default App;
