import React, { useState } from 'react';

const FileUploadImage = () => {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <div className="file-upload-image">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {image && <img src={image} alt="Preview" />}
        </div>
    );
};

export default FileUploadImage;
