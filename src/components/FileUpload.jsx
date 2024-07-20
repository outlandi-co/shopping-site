import axios from 'axios';
import { useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
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
      
      // Sending the email
      await axios.post('http://localhost:3000/api/send-email', {
        email: email,
        filePath: response.data.filePath
      });
      setMessage('File uploaded and email sent successfully');
    } catch (error) {
      setMessage(`Error uploading file: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <input type="file" onChange={onFileChange} />
      <input type="email" placeholder="Enter email" value={email} onChange={onEmailChange} />
      <button onClick={onFileUpload}>Upload and Send Email</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUpload;
