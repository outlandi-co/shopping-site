import React from 'react';
import Navbar from './Navbar'; // adjust path if needed
import logo from '../assets/logo_gradience.png';

const Layout = ({ children, isAuthenticated, handleLogout, cartItems }) => {
  return (
    <div className="app-container">
      <header>
        <img src={logo} alt="Logo" style={{ width: '150px' }} />
        <Navbar
          isAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
          cartItems={cartItems}
        />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
