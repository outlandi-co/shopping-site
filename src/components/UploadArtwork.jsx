import React, { useState } from 'react';
import axios from 'axios';

const UploadArtwork = () => {
  const [artworkFile, setArtworkFile] = useState(null);
  const [productId, setProductId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!artworkFile) return alert('Please select a file.');

    const formData = new FormData();
    formData.append('artwork', artworkFile);
    formData.append('productId', productId); // optional

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/upload/upload-artwork`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('✅ Upload successful!');
    } catch (error) {
      console.error('❌ Upload error:', error);
      alert('Upload failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={(e) => setArtworkFile(e.target.files[0])} />
      <input
        type="text"
        placeholder="Product ID (optional)"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <button type="submit">Upload Artwork</button>
    </form>
  );
};

export default UploadArtwork;
