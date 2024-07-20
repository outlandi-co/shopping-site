import axios from 'axios';
import { useState } from 'react';
import './FileUpload.scss'; // Make sure to create and use this stylesheet

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(response.data.message);
      setUploadedImage(response.data.filePath);
    } catch (error) {
      setMessage(`Error uploading file: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="file-upload">
      <h2>File Upload</h2>
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload</button>
      {message && <p>{message}</p>}
      {uploadedImage && (
        <div className="overlay-popup">
          <div className="overlay-content">
            <span className="close-button" onClick={() => setUploadedImage(null)}>×</span>
            <div className="overlay-image">
              <img src={`http://localhost:3000/${uploadedImage}`} alt="Uploaded" className="uploaded-image" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
