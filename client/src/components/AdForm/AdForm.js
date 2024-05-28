// AdForm.js
import React from "react";
import "./adForm.css";
import PublishButton from "../PublishButton/PublishButton";
import Payment from "../Payment/Payment";
import { useAdFormLogic } from "./AdFormLogic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

function AdForm({ agregarAnuncioAlPrincipio, isVisible, hideForm }) {
  const {
    category,
    setCategory,
    categoryRef,
    subcategory,
    subcategoryRef,
    setCategoryRef,
    titleRef,
    descriptionRef,
    amountRef,
    locationRef,
    phoneRef,
    phone2Ref,
    emailRef,
    images,
    description,
    error,
    handleImageChange,
    handleDeletePreviewImage,
    handleDescriptionChange,
    handleSubmit,
  } = useAdFormLogic(agregarAnuncioAlPrincipio);

  return (
    <div className={`adForm form-container ${isVisible ? "show" : ""}`}>
      <button className="form-close-button" onClick={hideForm}>
        X
      </button>
      <form
        id="adForm"
        className="adForm"
        action="/api/anuncios"
        method="POST"
        onSubmit={handleSubmit}
      >
        {error && <p className="error-message">{error}</p>}
        <fieldset>
          <legend>!ANUNCIA EN BUSCADIS!</legend>
          <label htmlFor="category">Categoría:</label>
          <select
            id="category"
            name="category"
            required
            ref={categoryRef}
            className="adForm-input"
            onChange={(e) => setCategory(e.target.value)}
          >
            {" "}
            <option value="Empleos">Empleos</option>
            <option value="Inmuebles">Inmuebles</option>
            <option value="Vehicles">Vehicles</option>
            <option value="Servicios">Servicios</option>
            <option value="Productos">Productos</option>
            <option value="Otros">Otros</option>
          </select>

          <label htmlFor="subcategory">Subcategoría:</label>
          {category === "Inmuebles" && (
            <select
              id="subcategory"
              name="subcategory"
              required
              ref={subcategoryRef}
              className="adForm-input"
            >
              <option value="Habitaciones">Habitaciones</option>
              <option value="Apartamentos">Apartamentos</option>
              <option value="Minidepartamentos">Minidepartamentos</option>
              <option value="Casas">Casas</option>
              <option value="Terrenos">Terrenos</option>
              <option value="Locales">Locales</option>
              <option value="Oficinas">Oficinas</option>
              <option value="Otros">Otros</option>
            </select>
          )}
          {category === "Empleos" && (
            <select
              id="subcategory"
              name="subcategory"
              required
              ref={subcategoryRef}
              className="adForm-input"
            >
              <option value="Tecnología">Tecnología</option>
              <option value="Salud">Salud</option>
              <option value="Educación">Educación</option>
              <option value="Construcción">Construcción</option>
              <option value="Ventas">Ventas</option>
              <option value="Servicio al Cliente">Servicio al Cliente</option>
              <option value="Transporte">Transporte</option>
              <option value="Administración">Administración</option>
              <option value="Otros">Otros</option>
            </select>
          )}
          {category === "Servicios" && (
            <select
              id="subcategory"
              name="subcategory"
              required
              ref={subcategoryRef}
              className="adForm-input"
            >
              <option value="Técnicos">Técnicos</option>
              <option value="Domésticos">Domésticos</option>
              <option value="Eventos">Eventos</option>
              <option value="Salud">Salud</option>
              <option value="Educación">Educación</option>
              <option value="Reparaciones">Reparaciones</option>
              <option value="Otros">Otros</option>
            </select>
          )}
          {category === "Vehicles" && (
            <select
              id="subcategory"
              name="subcategory"
              required
              ref={subcategoryRef}
              className="adForm-input"
            >
              <option value="Autos">Autos</option>
              <option value="Camionetas">Camionetas</option>
              <option value="Motos">Motos</option>
              <option value="Bicicletas">Bicicletas</option>
              <option value="Maquinaria">Maquinaria</option>
              <option value="Otros">Otros</option>
            </select>
          )}
          {category === "Productos" && (
            <select
              id="subcategory"
              name="subcategory"
              required
              ref={subcategoryRef}
              className="adForm-input"
            >
              <option value="Tecnología">Tecnología</option>
              <option value="Hogar">Hogar</option>
              <option value="Moda">Moda</option>
              <option value="Deportes">Deportes</option>
              <option value="Mascotas">Mascotas</option>
              <option value="Juguetes">Juguetes</option>
              <option value="Libros">Libros</option>
              <option value="Otros">Otros</option>
            </select>
          )}
          {category === "Otros" && (
            <select
              id="subcategory"
              name="subcategory"
              required
              ref={subcategoryRef}
              className="adForm-input"
            >
              <option value="Eventos">Eventos</option>
              <option value="Mascotas">Mascotas</option>
              <option value="Perdidos">Perdidos</option>
              <option value="Coleccionables">Coleccionables</option>
              <option value="Ofertas">Ofertas</option>
              <option value="Otros">Otros</option>
            </select>
          )}

          <label htmlFor="title">Título de tu aviso:</label>
          <input
            className="adForm-input"
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
            className="adForm-input"
          ></textarea>

          <label htmlFor="phone">Teléfono/WhatsApp:</label>
          <input
            className="adForm-input"
            type="tel"
            id="phone"
            name="phone"
            ref={phoneRef}
            placeholder="+51 987 654 321"
          />

          <label htmlFor="phone2">Teléfono/WhatsApp 2:</label>
          <input
            className="adForm-input"
            type="tel"
            id="phone2"
            name="phone2"
            ref={phone2Ref}
            placeholder="+51 987 654 321"
          />

          <label htmlFor="location">Ubicación:</label>
          <input
            className="adForm-input"
            type="text"
            id="location"
            name="location"
            ref={locationRef}
            placeholder="Escribe tu ubicación"
          />

          <label htmlFor="amount">Monto:</label>
          <input
            className="adForm-input"
            type="text"
            id="amount"
            name="amount"
            ref={amountRef}
            placeholder="s/100.00"
            min="0"
            step="0.01"
          />

          <label htmlFor="email">Correo electrónico:</label>
          <input
            className="adForm-input"
            type="email"
            id="email"
            name="email"
            ref={emailRef}
            placeholder="tu-correo@gmail.com"
          />

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
