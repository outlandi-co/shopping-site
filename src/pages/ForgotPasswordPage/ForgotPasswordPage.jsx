import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/ForgotPasswordPage.scss'; // optional for custom styles

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    console.log('📨 Attempting password reset for:', email);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/forgot-password`,
        { email }
      );
      console.log('✅ Reset email sent:', response.data);
      setMessage(`If an account exists for ${email}, a reset link will be sent.`);
    } catch (err) {
      console.error('❌ Error:', err.response?.data || err.message);
      setError('There was a problem sending the reset link. Please try again.');
    }

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

      {message && <p className="message success">{message}</p>}
      {error && <p className="message error">{error}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
