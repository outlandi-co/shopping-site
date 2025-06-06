import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('❌ Passwords do not match.');
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`,
        { password }
      );

      setMessage('✅ Password reset successful! Redirecting to login...');
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Reset failed.';
      console.error('❌ Reset failed:', errorMsg);
      setMessage(errorMsg);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Reset Your Password</h2>
      {message && (
        <>
          <p style={{ color: success ? 'green' : 'red', fontWeight: 'bold' }}>{message}</p>
          {message.includes('expired') && (
            <p>Click <a href="/forgot-password">here</a> to request a new reset link.</p>
          )}
        </>
      )}
      <form onSubmit={handleReset}>
        <label htmlFor="password">New Password</label><br />
        <input
          id="password"
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />

        <label htmlFor="confirmPassword">Confirm Password</label><br />
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        /><br /><br />

        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
