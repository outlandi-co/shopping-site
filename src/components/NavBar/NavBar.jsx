import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../styles/navBar.scss';

const Navbar = ({ isAuthenticated, handleLogout, cartItems = [] }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <ul className="nav-left">
        <li><NavLink to="/home" className="nav-link">Home</NavLink></li>
        <li><NavLink to="/store" className="nav-link">Store</NavLink></li>
        <li><NavLink to="/membership" className="nav-link">Membership</NavLink></li>
        <li><NavLink to="/upload" className="nav-link">Upload Artwork</NavLink></li>
        <li><NavLink to="/checkout" className="nav-link">Checkout</NavLink></li>
      </ul>

      <ul className="nav-right">
        {!isAuthenticated ? (
          <>
            <li><NavLink to="/login" className="nav-link">Login</NavLink></li>
            <li><NavLink to="/register" className="nav-link">Register</NavLink></li>
            <li><NavLink to="/forgot-password" className="nav-link">Forgot Password</NavLink></li>
          </>
        ) : (
          <>
            <li><NavLink to="/admin" className="admin-link">Admin</NavLink></li> {/* ✅ Admin Access */}
            <li className="cart-count">🛒 {cartItems.length}</li>
            <li>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
