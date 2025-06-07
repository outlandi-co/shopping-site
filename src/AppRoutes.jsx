import React, { useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useTheme } from './context/ThemeContext';

import HomePage from './pages/Home-Page/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import MembershipPage from './pages/MembershipPage/MembershipPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import CheckoutPage from './pages/CheckOutPage/CheckOutPage';
import ThankYouPage from './pages/ThankYouPage';
import Store from './pages/Store';
import ProductDetail from './pages/ProductDetail';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage'; // ✅ Correct import
import AdminPage from './pages/AdminPage/AdminPage';
import AboutPage from './pages/AboutPage/AboutPage';
import UploadArtwork from './components/UploadArtwork';
import Cart from './components/Cart';
import Navbar from './components/NavBar/NavBar';
import AdminArtwork from './pages/AdminArtwork';

const AppRoutes = ({
  isAuthenticated,
  setIsAuthenticated,
  handleAddToCart,
  handleRemoveFromCart,
  handleUpdateQuantity,
  handleClearCart,
  cartItems,
}) => {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

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
      <Navbar
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
        cartItems={cartItems}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <Routes>
        <Route path="/" element={<HomePage onAddToCart={handleAddToCart} />} />
        <Route path="/home" element={<HomePage onAddToCart={handleAddToCart} />} />
        <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} handleClearCart={handleClearCart} />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/upload" element={<UploadArtwork />} />
        <Route path="/store" element={<Store onAddToCart={handleAddToCart} cartItems={cartItems} />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} /> {/* ✅ Password reset route */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/artworks" element={<AdminArtwork />} />
        <Route path="/cart" element={
          <Cart
            cartItems={cartItems}
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
            handleUpdateQuantity={handleUpdateQuantity}
            handleClearCart={handleClearCart}
          />
        } />
      </Routes>
    </>
  );
};

export default AppRoutes;
