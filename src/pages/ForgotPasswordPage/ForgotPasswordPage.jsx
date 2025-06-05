// src/pages/ForgotPasswordPage/ForgotPasswordPage.jsx
import React, { useState } from 'react';
import '../../styles/ForgotPasswordPage.scss'; // optional if you want custom styling

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // ✅ Replace this with API call later
    setMessage(`If an account exists for ${email}, a reset link will be sent.`);
    setEmail('');
  };

  return (
    <div className="forgot-password-page">
      <h2>Forgot Your Password?</h2>
      <p>Enter your email address and we’ll send you a link to reset your password.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
