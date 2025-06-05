// 🔷 Frontend: shopping-site

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/ProductDetail.module.scss';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`)

      .then((res) => setProduct(res.data))
      .catch((err) => console.error('❌ Error loading product detail:', err));
  }, [id]);

  if (!product) return <div className={styles.loading}>Loading product...</div>;

  return (
    <div className={styles.productDetail}>
      <img src={product.image || 'https://via.placeholder.com/300'} alt={product.name} className={styles.image} />
      <div className={styles.info}>
        <h2>{product.name}</h2>
        <p className={styles.sku}>SKU: {product.sku || 'N/A'}</p>
        <p className={styles.vendor}>Vendor: {product.vendor}</p>
        {product.vendors && <p>Other Vendors: {product.vendors}</p>}
        <p className={styles.description}>{product.description || 'No description provided.'}</p>
        <p>Category: {product.category || 'N/A'}</p>
        <p>Quantity: {product.quantity}</p>
        <p>Colors: {product.colors || 'N/A'}</p>
        <p>Sizes: {product.sizes || 'N/A'}</p>
        <p className={styles.price}>Wholesale: ${product.cost?.toFixed(2)}</p>
        <p className={styles.price}>List Price: ${product.listPrice?.toFixed(2)}</p>
        <button className={styles.buyButton}>Buy Now</button>
      </div>
    </div>
  );
};

export default ProductDetail;
