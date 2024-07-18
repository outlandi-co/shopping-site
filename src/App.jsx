import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FrontPage from './components/FrontPage/frontPage';
import About from './components/About/About';
import Contact from './components/ContactPage';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import './App.scss';

const App = () => (
  <Router>
    <div className="app">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  </Router>
);

export default App;
