import React from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

import HomePage from './pages/Home-Page/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import MembershipPage from './pages/MembershipPage/MembershipPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import CheckoutPage from './pages/CheckOutPage/CheckOutPage';
import Store from './pages/Store';
import ProductDetail from './pages/ProductDetail';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import AdminPage from './pages/AdminPage/AdminPage';



const AppRoutes = ({
  isAuthenticated,
  setIsAuthenticated,
  handleAddToCart,
  handleRemoveFromCart,
  cartItems
}) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    Cookies.set('authToken', 'mockToken');
    setIsAuthenticated(true);
    navigate('/home');
  };

  const handleLogout = () => {
    Cookies.remove('authToken');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <>
      <header className="p-4 border-b flex justify-between items-center">
        <nav className="space-x-4">
          {!isAuthenticated ? (
            <>
              <button onClick={() => navigate('/login')}>Login</button>
              <button onClick={() => navigate('/register')}>Register</button>
              <button onClick={() => navigate('/membership')}>Membership</button>
              <button onClick={() => navigate('/forgot-password')}>Forgot Password</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/home')}>Home</button>
              <button onClick={handleLogout}>Logout</button>
              <button onClick={() => navigate('/store')}>Store</button>
              <button onClick={() => navigate('/checkout')}>Checkout</button>
            </>
          )}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage onAddToCart={handleAddToCart} />} />
        <Route path="/home" element={<HomePage onAddToCart={handleAddToCart} />} />
        <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} />} />
        <Route
          path="/store"
          element={
            <Store
              onAddToCart={handleAddToCart}
              cartItems={cartItems}
              onRemoveFromCart={handleRemoveFromCart}
            />
          }
        />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/admin" element={<AdminPage />} />

      </Routes>
    </>
  );
};

export default AppRoutes;
