// src/pages/HomePage.jsx
import { useState } from 'react';
import ProductList from '../components/ProductList';
import FileUpload from '../components/FileUpload';

const HomePage = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  const handleUpload = (url) => {
    setUploadedImageUrl(url);
  };

  return (
    <div>
      <h1>Shopping Site</h1>
      <FileUpload onUpload={handleUpload} />
      <ProductList uploadedImageUrl={uploadedImageUrl} />
    </div>
  );
};

export default HomePage;
