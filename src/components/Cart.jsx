import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Cart.module.scss';

const Cart = ({
  cartItems,
  handleAddToCart,
  handleRemoveFromCart,
  handleUpdateQuantity,
  handleClearCart,
}) => {
  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.quantity * item.listPrice, 0).toFixed(2);

  return (
    <div className={styles.cartContainer}>
      <h2>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id} className={styles.cartItem}>
              <img src={item.image} alt={item.name} className={styles.image} />
              <div className={styles.details}>
                <h4>{item.name}</h4>
                <p>Price: ${item.listPrice.toFixed(2)}</p>
                <div className={styles.controls}>
                  <button onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}>+</button>
                </div>
                <button onClick={() => handleRemoveFromCart(item._id)} className={styles.removeBtn}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className={styles.summary}>
            <p>Total: ${getTotal()}</p>
            <div className={styles.buttons}>
              <button onClick={handleClearCart} className={styles.clearBtn}>Clear Cart</button>
              <Link to="/checkout" className={styles.checkoutBtn}>Proceed to Checkout</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
