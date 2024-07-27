import React from 'react';
import './store.scss'; // Ensure you have this file for styling

const ProductList = ({ products }) => {
  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product._id} className="product-card">
          {product.photos && product.photos.length > 0 && (
            <img
              src={`http://localhost:3000${product.photos[0]}`} // Display the first photo
              alt={product.name}
              className="product-image"
            />
          )}
          <h2 className="product-name">{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">${product.price}</p>
          <div className="product-options">
            {product.options.map((option, index) => (
              <div key={index} className="product-option">
                <p>Color: {option.color}</p>
                {option.images && option.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={`http://localhost:3000${image}`}
                    alt={`${product.name} - ${option.color}`}
                    className="product-option-image"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
