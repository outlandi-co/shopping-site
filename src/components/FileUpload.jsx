// src/components/FileUpload.jsx
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import axios from '../api/axios';

const FileUpload = ({ onUpload }) => {
    const onDrop = useCallback(acceptedFiles => {
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);

        axios.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
            onUpload(response.data.fileUrl);
        }).catch(error => {
            console.error('Error uploading file:', error);
        });
    }, [onUpload]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
            <input {...getInputProps()} />
            <p>Drag &apos;n&apos; drop a file here, or click to select a file</p>
        </div>
    );
};

FileUpload.propTypes = {
    onUpload: PropTypes.func.isRequired,
};

export default FileUpload;
