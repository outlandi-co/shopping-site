import React from 'react';

const UploadArtwork = ({ onUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = /\.(png|jpe?g|svg|ai|psd)$/i;

    if (file && allowedTypes.test(file.name)) {
      const reader = new FileReader();
      reader.onload = () => onUpload(reader.result); // ✅ Send base64 string
      reader.readAsDataURL(file);
    } else {
      alert('Unsupported file format. Please upload PNG, JPG, SVG, AI, or PSD.');
    }
  };

  return (
    <div className="upload-artwork mb-6">
      <label htmlFor="upload" className="block mb-2 font-semibold">
        Upload Your Artwork:
      </label>
      <input
        type="file"
        id="upload"
        accept=".png,.jpg,.jpeg,.svg,.ai,.psd"
        onChange={handleFileChange}
        className="block w-full border border-gray-300 p-2 rounded-md cursor-pointer"
      />
    </div>
  );
};

export default UploadArtwork;
