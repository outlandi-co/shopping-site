// src/pages/HomePage.jsx
import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import ApparelContainer from '../components/ApparelContainer';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const HomePage = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  const handleUpload = (url) => {
    setUploadedImageUrl(url);
  };

  return (
    <Container>
      <h1>Shopping Site</h1>
      <FileUpload onUpload={handleUpload} />
      <ApparelContainer overlayImageUrl={uploadedImageUrl} />
    </Container>
  );
};

export default HomePage;
