import React, { useState, useEffect } from "react";
import "./adForm.css";
import PublishButton from "../PublishButton/PublishButton";
import Payment from "../Payment/Payment";
import { useAdFormLogic } from "./AdFormLogic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

function AdForm({ agregarAnuncioAlPrincipio, isVisible, hideForm, anuncios }) {
  const {
    adType,
    setAdType,
    adTypeRef,
    categoryRef,
    subCategoryRef,
    setAdTypeRef,
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

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const categoriesMap = {
      Empleos: [
        "Restaurantes y Bares",
        "Hoteles y Alojamiento",
        "Ventas",
        "Marketing y Publicidad",
        "Administración",
        "Finanzas",
        "Construcción",
        "Logística",
        "Educación",
        "Salud",
        "Desarrollo de Software",
        "Soporte Técnico",
        "Limpieza y Mantenimiento",
        "Seguridad",
        "Transporte",
        "Movilidad",
        "Diseño Gráfico",
        "Artes y Oficios",
      ],
      Inmuebles: ["Apartamentos", "Casas", "Oficinas", "Terrenos", "Locales"],
      Vehicles: ["Autos", "Camionetas", "Motos", "Bicicletas", "Otros"],
      Servicios: ["Educación", "Reparaciones", "Salud", "Técnicos", "Otros"],
      Productos: [
        "Tecnología",
        "Hogar",
        "Moda",
        "Deportes",
        "Mascotas",
        "Libros",
        "Otros",
      ],
      Otros: ["Eventos", "Mascotas", "Perdidos", "Otros"],
    };

    const subCategoriesMap = {
      "Restaurantes y Bares": [
        "Mozo/Moza",
        "Pizzero/Ayudante Pizzero",
        "Ayudante de Cocina",
        "Maestro Parrillero/Especialista en Fast Food",
        "Cajero/Cajera",
        "Cocinero",
        "Bartender",
      ],
      "Hoteles y Alojamiento": [
        "Recepcionista",
        "Personal de Housekeeping",
        "Personal de Cafetería",
        "Mantenimiento",
        "Atención al Cliente",
      ],
      Ventas: [
        "Vendedor(a)",
        "Promotor(a) de Ventas",
        "Ejecutivo de Ventas",
        "Asistente de Ventas",
      ],
      "Marketing y Publicidad": [
        "Especialista en Marketing Digital",
        "Diseñador Gráfico",
        "Publicidad Turística",
        "Community Manager",
      ],
      Administración: [
        "Asistente Administrativo",
        "Secretario(a)",
        "Recepcionista Administrativa",
        "Personal de Atención al Cliente",
      ],
      Finanzas: [
        "Contador",
        "Técnico Contable",
        "Asistente Contable",
        "Auditor",
        "Gestor de Recuperaciones",
      ],
      Construcción: [
        "Albañil",
        "Ingeniero Civil",
        "Arquitecto",
        "Maestro de Obra",
      ],
      Logística: [
        "Chofer de Distribución",
        "Almacenero",
        "Auxiliar de Almacén",
        "Coordinador Logístico",
      ],
      Educación: ["Profesor(a)", "Asistente Educativo", "Instructor(a)", "Tutor(a)"],
      Salud: [
        "Médico(a)",
        "Enfermero(a)",
        "Asistente Dental",
        "Técnico en Enfermería",
        "Psicólogo(a)",
      ],
      "Desarrollo de Software": [
        "Desarrollador Frontend",
        "Desarrollador Backend",
        "Desarrollador Full Stack",
      ],
      "Soporte Técnico": [
        "Técnico en Informática",
        "Soporte Técnico",
        "Administrador de Sistemas",
      ],
      "Limpieza y Mantenimiento": [
        "Personal de Limpieza",
        "Mantenimiento",
        "Jardinería",
      ],
      Seguridad: ["Guardia de Seguridad", "Personal de Seguridad"],
      Transporte: ["Chofer", "Conductor"],
      Movilidad: ["Motorizado", "Repartidor"],
      "Diseño Gráfico": [
        "Diseñador Gráfico",
        "Diseñador Web",
        "Ilustrador",
      ],
      "Artes y Oficios": ["Artista", "Artesano"],
    };

    if (adType) {
      setCategories(categoriesMap[adType] || []);
      setSubCategories([]);
    }
  }, [adType]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    const subCategoriesMap = {
      "Restaurantes y Bares": [
        "Mozo/Moza",
        "Pizzero/Ayudante Pizzero",
        "Ayudante de Cocina",
        "Maestro Parrillero/Especialista en Fast Food",
        "Cajero/Cajera",
        "Cocinero",
        "Bartender",
      ],
      "Hoteles y Alojamiento": [
        "Recepcionista",
        "Personal de Housekeeping",
        "Personal de Cafetería",
        "Mantenimiento",
        "Atención al Cliente",
      ],
      Ventas: [
        "Vendedor(a)",
        "Promotor(a) de Ventas",
        "Ejecutivo de Ventas",
        "Asistente de Ventas",
      ],
      "Marketing y Publicidad": [
        "Especialista en Marketing Digital",
        "Diseñador Gráfico",
        "Publicidad Turística",
        "Community Manager",
      ],
      Administración: [
        "Asistente Administrativo",
        "Secretario(a)",
        "Recepcionista Administrativa",
        "Personal de Atención al Cliente",
      ],
      Finanzas: [
        "Contador",
        "Técnico Contable",
        "Asistente Contable",
        "Auditor",
        "Gestor de Recuperaciones",
      ],
      Construcción: [
        "Albañil",
        "Ingeniero Civil",
        "Arquitecto",
        "Maestro de Obra",
      ],
      Logística: [
        "Chofer de Distribución",
        "Almacenero",
        "Auxiliar de Almacén",
        "Coordinador Logístico",
      ],
      Educación: ["Profesor(a)", "Asistente Educativo", "Instructor(a)", "Tutor(a)"],
      Salud: [
        "Médico(a)",
        "Enfermero(a)",
        "Asistente Dental",
        "Técnico en Enfermería",
        "Psicólogo(a)",
      ],
      "Desarrollo de Software": [
        "Desarrollador Frontend",
        "Desarrollador Backend",
        "Desarrollador Full Stack",
      ],
      "Soporte Técnico": [
        "Técnico en Informática",
        "Soporte Técnico",
        "Administrador de Sistemas",
      ],
      "Limpieza y Mantenimiento": [
        "Personal de Limpieza",
        "Mantenimiento",
        "Jardinería",
      ],
      Seguridad: ["Guardia de Seguridad", "Personal de Seguridad"],
      Transporte: ["Chofer", "Conductor"],
      Movilidad: ["Motorizado", "Repartidor"],
      "Diseño Gráfico": [
        "Diseñador Gráfico",
        "Diseñador Web",
        "Ilustrador",
      ],
      "Artes y Oficios": ["Artista", "Artesano"],
    };

    setSubCategories(subCategoriesMap[selectedCategory] || []);
  };

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
          <label htmlFor="adType">Tipo de anuncio:</label>
          <select
            id="adType"
            name="adType"
            required
            ref={adTypeRef}
            className="adForm-input"
            onChange={(e) => setAdType(e.target.value)}
          >
            <option value="Empleos">Empleos</option>
            <option value="Inmuebles">Inmuebles</option>
            <option value="Vehicles">Vehicles</option>
            <option value="Servicios">Servicios</option>
            <option value="Productos">Productos</option>
            <option value="Otros">Otros</option>
          </select>

          <label htmlFor="category">Categoría:</label>
          <select
            id="category"
            name="category"
            required
            ref={categoryRef}
            className="adForm-input"
            onChange={handleCategoryChange}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <label htmlFor="subCategory">Subcategoría:</label>
          <select
            id="subCategory"
            name="subCategory"
            required
            ref={subCategoryRef}
            className="adForm-input"
          >
            {subCategories.map((subCat) => (
              <option key={subCat} value={subCat}>
                {subCat}
              </option>
            ))}
          </select>

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
      <div className="columna-anuncios">
        {anuncios && anuncios.map((anuncio) => (
          <Anuncio key={anuncio.id} anuncio={anuncio} />
        ))}
      </div>
    </div>
  );
}

function Anuncio({ anuncio }) {
  const { title, description, phone } = anuncio;
  const halfDescription = description.substring(0, description.length / 2);
  const message = encodeURIComponent(`Hola, estoy interesado en el anuncio: ${title}`);
  const href = `https://wa.me/${phone}?text=${message}`;

  return (
    <div className="anuncio separador">
      <p>{halfDescription} <a href={href} target="_blank" rel="noopener noreferrer">Contactar</a></p>
    </div>
  );
}

export default AdForm;
