import React from 'react';
import PropTypes from 'prop-types';

const ShoppingCart = ({ cartItems, onRemoveFromCart }) => {
  if (!cartItems || cartItems.length === 0) {
    return <div>Your cart is empty</div>;
  }

  const total = cartItems.reduce((acc, item) => acc + item.price, 0); // Calculate total price

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price.toFixed(2)}
            <button onClick={() => onRemoveFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
};

ShoppingCart.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
};

export default ShoppingCart;
