// src/components/ProductList.jsx
import { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import styled from 'styled-components';
import axios from '../api/axios';

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
`;

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <ProductGrid>
      {products.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ProductGrid>
  );
};

export default ProductList;
