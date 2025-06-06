// CheckoutPage.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CheckoutPage = ({ cartItems, handleClearCart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const tier = queryParams.get('tier');

  const handleCompleteOrder = () => {
    handleClearCart();
    navigate('/thank-you');
  };

  return (
    <div className="checkout-page" style={{ padding: '2rem' }}>
      <h1>Checkout</h1>
      <p>You selected the <strong>{tier?.charAt(0).toUpperCase() + tier?.slice(1)}</strong> Membership Tier.</p>

      {/* Simulated checkout button */}
      <button
        onClick={handleCompleteOrder}
        style={{ marginTop: '2rem', padding: '1rem 2rem' }}
      >
        Complete Order
      </button>
    </div>
  );
};

export default CheckoutPage;
