import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/login">Login</Link></li> {/* You might want to remove or modify this line based on your inline login */}
            </ul>
        </nav>
    );
};

export default NavBar;
