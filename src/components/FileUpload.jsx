import React, { useState } from 'react';
import axios from '../../src/api/axios';
import { Rnd } from 'react-rnd';
import './FileUpload.scss';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && /\.(psd|ai|png|jpg|eps)$/.test(selectedFile.name)) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      alert('Please upload a valid file (.psd, .ai, .png, .jpg, .eps)');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      setError(`Error uploading file: ${error.message}`);
      alert(`Error uploading file: ${error.message}`);
    }
  };

  return (
    <div className="file-upload">
      <div className="background-image">
        <img src="http://localhost:3000/images/shirt.png" alt="Shirt" />
        {preview && (
          <Rnd
            bounds="parent"
            default={{
              x: 0,
              y: 0,
              width: 100,
              height: 100,
            }}
            minWidth={50}
            minHeight={50}
            lockAspectRatio={true}
            className="overlay-container"
          >
            <img src={preview} alt="Overlay" className="overlay-image" />
          </Rnd>
        )}
      </div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default FileUpload;
