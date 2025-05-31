import React from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import HomePage from './pages/Home-Page/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import MembershipPage from './pages/MembershipPage/MembershipPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

const AppRoutes = ({ isAuthenticated, setIsAuthenticated, handleAddToCart }) => {
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

      <Routes>
        <Route path="/home" element={<HomePage onAddToCart={handleAddToCart} />} />
        <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/" element={<HomePage onAddToCart={handleAddToCart} />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
