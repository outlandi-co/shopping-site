// Layout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo_gradience.png';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <header>
        <img src={logo} alt="Logo" style={{ width: '150px' }} />
        <nav>
          <Link to="/home">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
