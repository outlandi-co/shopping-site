import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import IntroPage from './components/IntroPage/IntroPage';
import FrontPage from './components/FrontPage/frontPage';
import About from './components/About/About';
import Contact from './components/ContactPage/contactPage';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import FileUpload from './components/FileUpload';
import Overlay from './components/Overlay'; // Ensure correct path
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
          <li><Link to="/fileupload">File Upload</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/" element={<FrontPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/fileupload" element={<FileUpload />} />
        <Route path="/overlay" element={<Overlay />} /> {/* Add the overlay route */}
      </Routes>
    </div>
  </Router>
);

export default App;
