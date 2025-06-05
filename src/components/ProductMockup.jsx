// 🔷 shopping-site/src/components/ProductMockup.jsx
import React, { useState } from 'react';
import UploadArtwork from './UploadArtwork';
import styles from '../styles/ProductMockup.module.scss';

const ProductMockup = ({ product }) => {
  const [artworkUrl, setArtworkUrl] = useState(null);

  return (
    <div className={styles.mockupWrapper}>
      <h2>Customize: {product.name}</h2>
      <div className={styles.previewContainer}>
        <img src={product.imageUrl} alt={product.name} className={styles.baseProduct} />
        {artworkUrl && (
          <img src={artworkUrl} alt="Overlay" className={styles.overlayArtwork} />
        )}
      </div>
      <UploadArtwork onUpload={setArtworkUrl} />
    </div>
  );
};

export default ProductMockup;
