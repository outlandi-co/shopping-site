import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import MembershipPage from './pages/MembershipPage/MembershipPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import FileUploadImage from './pages/FileUploadImage/FileUploadImage';
import HomePage from './pages/Home-Page/HomePage';
import IntroPage from './pages/IntroPage/IntroPage';
import ProductsPage from './pages/ProductsPage/productsPage';
import ProfilePage from './pages/ProfilePage/profilePage';
import CheckOutPage from './pages/CheckOut-Page/CheckOutPage'; // Ensure this is the correct path and casing
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'; // Ensure this is the correct path and casing
import LogoutButton from './pages/LogoutButton/LogoutButton';

import './styles/app.scss';

// Define the HeaderButtons component here
const HeaderButtons = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  return (
    <div className="header-buttons">
      {!isAuthenticated ? (
        <>
          <button className="btn-primary" onClick={handleLoginClick}>Login</button>
          <button className="btn-secondary" onClick={() => navigate('/register')}>Register</button>
          <button className="btn-secondary" onClick={() => navigate('/membership')}>Membership</button>
        </>
      ) : (
        <LogoutButton />
      )}
      <button className="btn-primary" onClick={() => navigate('/view-cart')}>View Cart</button>
      <button className="btn-secondary" onClick={() => navigate('/checkout')}>Checkout</button>
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <HeaderButtons isAuthenticated={isAuthenticated} />
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/file-upload" element={<FileUploadImage />} />
            <Route path="/intro" element={<IntroPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/checkout" element={<CheckOutPage />} />
            <Route path="*" element={<NotFoundPage />} /> {/* Add NotFoundPage route */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
