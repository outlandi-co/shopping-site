import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage/homePage';
import IntroPage from './components/IntroPage/IntroPage';
import About from './components/About/About';
import Contact from './components/ContactPage/contactPage';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import FileUpload from './components/FileUpload';
import Overlay from './components/Overlay';
import Membership from './components/Membership/Membership'; // Import the Membership component
import Logout from './components/Logout/Logout';
import './app.scss';

const App = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();

  const shouldShowSidebar = location.pathname !== '/';

  console.log("User in App component:", user); // Debugging log

  return (
    <div className="app">
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {!user && <li className="login-link"><Link to="/login">Login</Link></li>}
          {!user && <li className="register-link"><Link to="/register">Register</Link></li>}
          {user && <li><Link to="/fileupload">File Upload</Link></li>}
          <li><Link to="/membership">Membership</Link></li>
          {user && (
            <li>
              <Logout setUser={setUser} />
            </li>
          )}
        </ul>
      </nav>
      <div className={`main-container ${shouldShowSidebar ? 'with-sidebar' : ''}`}>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/home" element={<HomePage user={user} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            {user && <Route path="/profile" element={<Profile />} />}
            {user && <Route path="/fileupload" element={<FileUpload />} />}
            <Route path="/membership" element={<Membership user={user} />} />
            {user && <Route path="/overlay" element={<Overlay />} />}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          {user && <h1>Welcome, {user}!</h1>}
        </div>
        {user && shouldShowSidebar && (
          <div className="sidebar">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/settings">Settings</Link></li>
              <li><Link to="/help">Help</Link></li>
              {/* Add more links as needed */}
            </ul>
            <div className="badge-container">
              <h3>Badges</h3>
              <p>Future badges will be displayed here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </Router>
);

export default AppWrapper;
