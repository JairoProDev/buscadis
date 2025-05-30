import React, { useState, useEffect } from 'react';

function ImageUpload({ onImageChange }) {
    const [images, setImages] = useState([]);

    const handleImageChange = (event) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files).map(file =>
                URL.createObjectURL(file)
            );
            setImages(filesArray);
            onImageChange(event.target.files);
        }
    };

    useEffect(() => {
        return () => {
            // Revocar los object URLs
            images.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [images]);

    return (
        <div>
            <label htmlFor="image">Imagen:</label>
            <input
                className="form-input file-input"
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                multiple
            />
            {images && images.map((url, index) => (
                <img key={index} src={url} alt="Preview" className="preview-image" />
            ))}
        </div>
    );
}

export default ImageUpload;