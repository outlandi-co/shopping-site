import React, { useState } from 'react';
import { registerUser } from '../../services/api';  // Ensure the path is correct

const RegisterPage = () => {
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission

  // Handle input changes
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!userData.username || !userData.email || !userData.password) {
      alert('All fields are required');
      return;
    }

    // Prevent multiple submissions
    if (isSubmitting) return; 
    
    setIsSubmitting(true); // Disable further submissions

    try {
      console.log('Sending registration data:', userData);
      const response = await registerUser(userData);
      console.log('User registered successfully:', response);
      // Handle successful registration, e.g., redirect to login
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false); // Re-enable submissions
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
