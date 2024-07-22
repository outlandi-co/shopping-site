import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './store.scss';

const Store = () => {
  const [products, setProducts] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (e) => {
    setFilteredCategory(e.target.value);
  };

  const filteredProducts = filteredCategory
    ? products.filter(product => product.category === filteredCategory)
    : products;

  return (
    <div className="store-container">
      <h1>Our Products</h1>
      <div className="category-filter">
        <label htmlFor="category">Filter by Category:</label>
        <select id="category" value={filteredCategory} onChange={handleCategoryChange}>
          <option value="">All</option>
          <option value="Apparel">Apparel</option>
          <option value="Etched Glass">Etched Glass</option>
          <option value="Outdoor Gear">Outdoor Gear</option>
        </select>
      </div>
      <div className="product-grid">
        {filteredProducts.map(product => (
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
    </div>
  );
};

export default Store;
