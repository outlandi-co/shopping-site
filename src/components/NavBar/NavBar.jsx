// src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/NavBar.scss';

const Navbar = ({ isAuthenticated, handleLogout, cartItems = [] }) => {
  return (
    <nav className="navbar">
      <ul>
        <li><NavLink to="/home">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        <li><NavLink to="/store">Store</NavLink></li>
        <li><NavLink to="/membership">Membership</NavLink></li>
        {!isAuthenticated ? (
          <>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
            <li><NavLink to="/forgot-password">Forgot Password</NavLink></li>
          </>
        ) : (
          <>
            <li><NavLink to="/checkout">Checkout</NavLink></li>
            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
          </>
        )}
        <li className="cart-count">🛒 {cartItems.length}</li>
      </ul>
    </nav>
  );
};

export default Navbar;
