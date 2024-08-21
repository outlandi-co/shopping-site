// src/components/ShoppingCart/ShoppingCart.jsx

import React from 'react';
import PropTypes from 'prop-types';

const ShoppingCart = ({ cartItems, onRemoveFromCart }) => {
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="shopping-cart">
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price.toFixed(2)}
              <button onClick={() => onRemoveFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty</p>
      )}
      <p>Total: ${totalAmount.toFixed(2)}</p>
      <button onClick={() => alert('Proceed to checkout')}>Checkout</button>
    </div>
  );
};

ShoppingCart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
};

export default ShoppingCart;
