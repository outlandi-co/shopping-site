import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './FileUpload.scss';

const FileUpload = () => {
  const onDrop = useCallback((acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach(file => {
      formData.append('file', file);
    });

    fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="file-upload" {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag and drop some files here, or click to select files</p>
    </div>
  );
};

export default FileUpload;
