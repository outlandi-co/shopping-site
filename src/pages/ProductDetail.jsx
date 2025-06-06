import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/ProductDetail.module.scss';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [artwork, setArtwork] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error('❌ Error loading product detail:', err));
  }, [id]);

  const handleArtworkChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArtwork(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!artwork || !product?._id) return;

    const formData = new FormData();
    formData.append('artwork', artwork);
    formData.append('productId', product._id);

    axios.post(`${import.meta.env.VITE_API_URL}/api/upload/upload-artwork`, formData)
      .then((res) => {
        console.log('✅ Upload success:', res.data);
        alert('✅ Artwork submitted for approval');
      })
      .catch((err) => {
        console.error('❌ Submission failed:', err.response?.data || err.message);
        alert('❌ Failed to submit artwork');
      });
  };

  if (!product) return <div className={styles.loading}>Loading product...</div>;

  return (
    <div className={styles.productDetail}>
      <div className={styles.imageWrapper}>
        <img
          src={product.image || 'https://via.placeholder.com/300'}
          alt={product.name}
          className={styles.image}
        />
        {previewUrl && (
          <img src={previewUrl} alt="Artwork Preview" className={styles.overlay} />
        )}
      </div>

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

        <div className={styles.uploadSection}>
          <h3>Upload Artwork</h3>
          <input type="file" accept="image/*" onChange={handleArtworkChange} />
          {artwork && <button onClick={handleSubmit}>Submit for Approval</button>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
