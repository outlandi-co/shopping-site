// src/components/ProductCard/ProductCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/ProductCard.scss';

const ProductCard = ({ product, onAddToCart }) => {
  const imageUrl = product.imageUrl || 'https://via.placeholder.com/100';

  return (
    <div className="product-card">
      <img src={imageUrl} alt={product.name} className="product-image" />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
