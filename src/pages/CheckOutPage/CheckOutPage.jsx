// CheckoutPage.jsx

import React from 'react';
import { useLocation } from 'react-router-dom';

const CheckoutPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tier = queryParams.get('tier');

  return (
    <div className="checkout-page" style={{ padding: '2rem' }}>
      <h1>Checkout</h1>
      <p>You selected the <strong>{tier?.charAt(0).toUpperCase() + tier?.slice(1)}</strong> Membership Tier.</p>
      {/* TODO: Integrate payment form or cart component here */}
    </div>
  );
};

export default CheckoutPage;
