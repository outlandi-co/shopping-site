import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './membership.scss'; // Import the membership.scss file

const Membership = () => {
  const [dateStarted, setDateStarted] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [planType, setPlanType] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    setDateStarted(today);
  }, []);

  useEffect(() => {
    if (planType) {
      const startDate = new Date(dateStarted);
      let endDate;
      if (planType === 'basic') {
        endDate = new Date(startDate.setFullYear(startDate.getFullYear() + 1)); // 1 year from start date
      } else if (planType === 'premium') {
        endDate = new Date(startDate.setFullYear(startDate.getFullYear() + 2)); // 2 years from start date
      } else if (planType === 'enterprise') {
        endDate = new Date(startDate.setFullYear(startDate.getFullYear() + 3)); // 3 years from start date
      }
      setExpirationDate(endDate.toISOString().split('T')[0]);
    }
  }, [planType, dateStarted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const membershipDetails = {
      dateStarted,
      expirationDate,
      planType,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/memberships', membershipDetails);
      console.log('Membership Details:', response.data);
    } catch (error) {
      console.error('Error submitting membership details:', error);
    }
  };

  return (
    <div className="membership-form">
      <h2>Membership Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date Started:</label>
          <input type="date" value={dateStarted} readOnly />
        </div>
        <div>
          <label>Expiration Date:</label>
          <input type="date" value={expirationDate} readOnly />
        </div>
        <div>
          <label>Plan Type:</label>
          <select
            value={planType}
            onChange={(e) => setPlanType(e.target.value)}
            required
          >
            <option value="">Select Plan</option>
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Membership;
