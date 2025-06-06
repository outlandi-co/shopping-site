// src/pages/AdminArtwork.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/AdminArtwork.module.scss'; // create this file for styling

const AdminArtwork = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/upload/artworks`)
      .then((res) => setArtworks(res.data))
      .catch((err) => console.error('❌ Failed to fetch artwork:', err));
  }, []);

  return (
    <div className={styles.container}>
      <h2>Submitted Artwork for Approval</h2>
      {artworks.length === 0 ? (
        <p>No artwork submitted yet.</p>
      ) : (
        <div className={styles.grid}>
          {artworks.map((art) => (
            <div key={art._id} className={styles.card}>
              <h4>{art.productId?.name}</h4>
              <img
                src={`${import.meta.env.VITE_API_URL}/${art.filePath}`}
                alt="Artwork"
                className={styles.image}
              />
              <p>SKU: {art.productId?.sku}</p>
              <p>Submitted: {new Date(art.createdAt).toLocaleString()}</p>
              <p>Status: {art.approved ? '✅ Approved' : '🕒 Pending'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminArtwork;
