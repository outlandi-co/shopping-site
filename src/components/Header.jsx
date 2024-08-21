// src/components/Header.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { authToken, login, logout } = useContext(AuthContext);

  const handleLogin = () => {
    // Replace with actual user data input or form submission logic
    const userData = { username: 'test', password: 'password' };
    login(userData);
  };

  return (
    <header>
      <h1>My App</h1>
      {authToken ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </header>
  );
};

export default Header;
