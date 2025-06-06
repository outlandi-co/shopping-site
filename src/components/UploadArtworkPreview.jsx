import React, { useState } from 'react';
import styles from '../styles/UploadArtworkPreview.module.scss';

const UploadArtworkPreview = ({ product }) => {
  const [artwork, setArtwork] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setArtwork(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image (PNG, JPG, SVG)');
    }
  };

  const handleSubmit = () => {
    alert('Submitted for approval!');
    // TODO: Connect this with your backend/API
  };

  return (
    <div className={styles.previewContainer}>
      <div className={styles.imageWrapper}>
        <img
          src={product.image || 'https://via.placeholder.com/300'}
          alt="Product"
          className={styles.baseImage}
        />
        {artwork && <img src={artwork} alt="Artwork" className={styles.overlay} />}
      </div>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Submit for Approval</button>
    </div>
  );
};

export default UploadArtworkPreview;
