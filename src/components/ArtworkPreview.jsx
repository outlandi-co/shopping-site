import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArtworkPreview = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [artworkFile, setArtworkFile] = useState(null);
  const [overlayUrl, setOverlayUrl] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/products`).then(res => {
      setProducts(res.data);
    });
  }, []);

  const handleArtworkChange = (e) => {
    const file = e.target.files[0];
    setArtworkFile(file);
    setOverlayUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('productId', selectedProduct._id);
    formData.append('artwork', artworkFile);

    await axios.post(`${import.meta.env.VITE_API_URL}/artwork-preview`, formData);
    alert('Submitted for approval!');
  };

  return (
    <div>
      <h2>Upload Artwork for Preview</h2>
      <select onChange={(e) => setSelectedProduct(products.find(p => p._id === e.target.value))}>
        <option>Select Product</option>
        {products.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
      </select>

      {selectedProduct && (
        <div style={{ position: 'relative', marginTop: '1rem' }}>
          <img src={selectedProduct.image} alt="product" style={{ width: 300 }} />
          {overlayUrl && (
            <img
              src={overlayUrl}
              alt="artwork overlay"
              style={{
                position: 'absolute',
                top: 20,
                left: 20,
                width: 100,
                opacity: 0.8
              }}
            />
          )}
        </div>
      )}

      <input type="file" onChange={handleArtworkChange} accept="image/*,.ai,.psd,.svg" />
      <button onClick={handleSubmit} disabled={!selectedProduct || !artworkFile}>Submit for Approval</button>
    </div>
  );
};

export default ArtworkPreview;
