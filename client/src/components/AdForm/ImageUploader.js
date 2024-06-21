import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const ImageUploader = ({ images, handleImageChange, handleDeletePreviewImage }) => (
  <>
    <label htmlFor="image" className="custom-file-upload-button">
      <FontAwesomeIcon icon={faUpload} /> Subir imágenes
    </label>
    <input
      className="adForm-input file-input"
      type="file"
      id="image"
      name="image"
      onChange={handleImageChange}
      multiple
      hidden
    />
    <div className="preview-images-container">
      {images &&
        images.map((image, index) => (
          <div key={index} className="preview-image-container">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="preview-image"
            />
            <button
              type="button"
              className="delete-preview-image-button"
              onClick={() => handleDeletePreviewImage(index)}
            >
              Eliminar
            </button>
          </div>
        ))}
    </div>
  </>
);

export default ImageUploader;
