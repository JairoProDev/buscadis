// AdForm.js
import React from "react";
import "./adForm.css";
import PublishButton from "../PublishButton/PublishButton";
import Payment from "../Payment/Payment";
// import ImageUpload from "../FormComponents/ImageUpload";
import { useAdFormLogic } from "./AdFormLogic";

function AdForm({ agregarAnuncioAlPrincipio, isVisible, hideForm }) {
  const {
    categoryRef,
    titleRef,
    descriptionRef,
    amountRef,
    locationRef,
    phoneRef,
    phone2Ref,
    emailRef,
    // imageRef,
    images,
    // setImages,
    description,
    // setDescription,
    error,
    // setError,
    // clearForm,
    handleImageChange,
    handleDeletePreviewImage,
    handleDescriptionChange,
    handleSubmit,
  } = useAdFormLogic(agregarAnuncioAlPrincipio);

  return (
    <div className={`form-container ${isVisible ? "show" : ""}`}>
      <button className="form-close-button" onClick={hideForm}>
        X
      </button>
      <form
        id="adForm"
        action="/api/anuncios"
        method="POST"
        onSubmit={handleSubmit}
      >
        {error && <p className="error-message">{error}</p>}
        <fieldset>
          <legend>!ANUNCIA EN BUSCADIS!</legend>
          <label htmlFor="category">Categoría:</label>
          <select id="category" name="category" required ref={categoryRef}>
            <option value="Empleos">Empleos</option>
            <option value="Inmuebles">Inmuebles</option>
            <option value="Autos">Autos</option>
            <option value="Servicios">Servicios</option>
            <option value="Otros">Otros</option>
          </select>
          <label htmlFor="title">Título de tu aviso:</label>
          <input
            className="form-input"
            type="text"
            id="title"
            name="title"
            required
            ref={titleRef}
            autoFocus
            placeholder="Se busca..."
          />
          
          <label htmlFor="description">Descripción de tu aviso:</label>
          <textarea
            id="description"
            name="description"
            required
            ref={descriptionRef}
            defaultValue={description}
            onInput={handleDescriptionChange}
            placeholder="Escribe una descripción detallada de tu anuncio"
          ></textarea>

          <label htmlFor="phone">Teléfono/WhatsApp:</label>
          <input
            className="form-input"
            type="tel"
            id="phone"
            name="phone"
            ref={phoneRef}
            placeholder="+51 987 654 321"
          />

          <label htmlFor="phone2">Teléfono/WhatsApp 2:</label>
          <input
            className="form-input"
            type="tel"
            id="phone2"
            name="phone2"
            ref={phone2Ref}
            placeholder="+51 987 654 321"
          />

          <label htmlFor="location">Ubicación:</label>
          <input
            className="form-input"
            type="text"
            id="location"
            name="location"
            ref={locationRef}
            placeholder="Escribe tu ubicación"
          />

          <label htmlFor="amount">Monto:</label>
          <input
            className="form-input"
            type="number"
            id="amount"
            name="amount"
            ref={amountRef}
            placeholder="s/100.00"
            min="0"
            step="0.01"
          />

          <label htmlFor="email">Correo electrónico:</label>
          <input
            className="form-input"
            type="email"
            id="email"
            name="email"
            ref={emailRef}
            placeholder="tu-correo@gmail.com"
          />

<label htmlFor="image" className="custom-file-upload-button">
  Subir imágenes
</label>
<input
  className="form-input file-input"
  type="file"
  id="image"
  name="image"
  onChange={handleImageChange}
  multiple
  hidden // Oculta el botón de subida de archivos predeterminado
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

          <PublishButton />
        </fieldset>
      </form>
      <Payment />
    </div>
  );
}

export default AdForm;