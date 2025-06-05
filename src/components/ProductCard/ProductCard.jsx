import React from 'react';
import '../styles/ProductCard.scss';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">${product.price.toFixed(2)}</p>
        <div className="product-buttons">
          <button onClick={() => onAddToCart(product)}>Buy</button>
          <button onClick={() => alert(`Viewing: ${product.name}`)}>View Details</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
