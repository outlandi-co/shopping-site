import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Load Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const MembershipForm = () => {
  const [membershipDetails, setMembershipDetails] = useState({
    dateStarted: '',
    expirationDate: '',
    planType: '',
    userEmail: '',
    paymentMethod: 'stripe'
  });

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    console.log('Stripe API Key:', process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
  }, []);

  const handleChange = (e) => {
    setMembershipDetails({
      ...membershipDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        console.error('Error creating payment method:', error);
        return;
      }

      const response = await axios.post('http://localhost:3000/api/memberships', {
        ...membershipDetails,
        paymentMethodId: paymentMethod.id
      });

      if (response.data) {
        console.log('Membership created successfully:', response.data);
      }
    } catch (error) {
      console.error('Error submitting membership details:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Membership Details</h2>
      <div>
        <label>Date Started:</label>
        <input type="date" name="dateStarted" value={membershipDetails.dateStarted} onChange={handleChange} />
      </div>
      <div>
        <label>Expiration Date:</label>
        <input type="date" name="expirationDate" value={membershipDetails.expirationDate} onChange={handleChange} />
      </div>
      <div>
        <label>Plan Type:</label>
        <select name="planType" value={membershipDetails.planType} onChange={handleChange}>
          <option value="basic">Basic</option>
          <option value="premium">Premium</option>
          <option value="enterprise">Enterprise</option>
        </select>
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="userEmail" value={membershipDetails.userEmail} onChange={handleChange} />
      </div>
      <div>
        <label>Payment Method:</label>
        <select name="paymentMethod" value={membershipDetails.paymentMethod} onChange={handleChange}>
          <option value="stripe">Stripe</option>
          <option value="paypal">PayPal</option>
          <option value="square">Square</option>
        </select>
      </div>
      <div>
        <label>Card Details:</label>
        <CardElement />
      </div>
      <button type="submit" disabled={!stripe}>Submit</button>
    </form>
  );
};

const Membership = () => (
  <Elements stripe={stripePromise}>
    <MembershipForm />
  </Elements>
);

export default Membership;
