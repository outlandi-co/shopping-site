import React, { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = { username, password };
    console.log('Sending login credentials to server:', userData);
    console.log('API URL:', `${API_URL}/api/auth/login`);
    
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log('Response status:', response.status);
      const result = await response.json();

      if (response.status === 200) {
        setMessage('Login successful');
        setError(null);
        setUser(username);  // Set the user name in the parent component
      } else {
        setError(result.message);
        setMessage('');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </form>
  );
};

export default Login;
