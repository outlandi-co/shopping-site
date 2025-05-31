import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationHandler = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    document.cookie = 'authToken=mockToken';
    setIsAuthenticated(true);
    navigate('/home');
  };

  const handleLogout = () => {
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    setIsAuthenticated(false);
    navigate('/login');
  };

  return { handleLogin, handleLogout };
};

export default NavigationHandler;
