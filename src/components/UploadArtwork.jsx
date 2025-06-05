// 🔷 shopping-site/src/components/UploadArtwork.jsx
import React from 'react';

const UploadArtwork = ({ onUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && /\.(png|jpe?g|svg|ai|psd)$/i.test(file.name)) {
      const reader = new FileReader();
      reader.onload = () => onUpload(reader.result); // Pass base64 to parent
      reader.readAsDataURL(file);
    } else {
      alert('Unsupported file format.');
    }
  };

  return (
    <div>
      <label htmlFor="upload">Upload Your Artwork:</label>
      <input type="file" id="upload" accept=".png,.jpg,.jpeg,.svg,.ai,.psd" onChange={handleFileChange} />
    </div>
  );
};

export default UploadArtwork;
