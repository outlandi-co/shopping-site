import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './membership.scss'; // Import the membership.scss file

const Membership = ({ user }) => {
  const [dateStarted, setDateStarted] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [planType, setPlanType] = useState('');
  const [memberships, setMemberships] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/memberships');
        setMemberships(response.data);
      } catch (error) {
        console.error('Error fetching memberships:', error);
      }
    };

    fetchMemberships();
  }, []);

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
      userId: user ? user.id : 'guest' // Use a unique identifier for the user, e.g., user.id or 'guest' for non-logged-in users
    };

    try {
      const response = await axios.post('http://localhost:3000/api/memberships', membershipDetails);
      setMemberships([...memberships, response.data]);
      setError('');
      console.log('Membership Details:', response.data);
    } catch (error) {
      console.error('Error submitting membership details:', error);
      setError(error.response.data.error);
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
        {error && <p className="error">{error}</p>}
      </form>
      <h2>Existing Memberships</h2>
      <ul>
        {memberships.map((membership) => (
          <li key={membership._id}>
            {membership.planType} - Expires on: {new Date(membership.expirationDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Membership;
