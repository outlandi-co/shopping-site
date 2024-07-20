// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FrontPage from './components/FrontPage/frontPage';
import About from './components/About/About';
import Contact from './components/ContactPage/contactPage';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import './app.scss';  // Correct path

const App = () => (
  <Router>
    <div className="app">
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li className="login-link"><Link to="/login">Login</Link></li>
          <li className="register-link"><Link to="/register">Register</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  </Router>
);

export default App;
