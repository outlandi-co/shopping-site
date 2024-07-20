// src/components/Register/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './register.scss';

const Register = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(credentials);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          placeholder="Username"
        />
        <input
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          placeholder="Password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
