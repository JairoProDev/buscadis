import React, { useRef, useState } from "react";
import "./adForm.css";
import PublishButton from "../PublishButton/PublishButton";
import Payment from "../Payment/Payment";

function AdForm({ agregarAnuncioAlPrincipio, isVisible, hideForm }) {
  const categoryRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  //   const urlRef = useRef();
  const amountRef = useRef();
  const locationRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const imageRef = useRef();

  const clearForm = () => {
    categoryRef.current.value = "";
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    phoneRef.current.value = "";
    if (amountRef.current) {
      amountRef.current.value = "";
    }
    if (locationRef.current) {
      locationRef.current.value = "";
    }
    if (emailRef.current) {
      emailRef.current.value = "";
    }
    if (imageRef.current) {
      imageRef.current.value = "";
    }
  };

  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const respuesta = await fetch("/api/anuncios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: categoryRef.current.value,
          title: titleRef.current.value,
          description: descriptionRef.current.value,
          amount: amountRef.current ? amountRef.current.value : "",
          location: locationRef.current ? locationRef.current.value : "",
          phone: phoneRef.current.value,
          email: emailRef.current ? emailRef.current.value : "",
          image: imageRef.current ? imageRef.current.value : "",
        }),
      });
      if (respuesta.ok) {
        const respuestaJson = await respuesta.json();
        const anuncio = respuestaJson.anuncio;
        agregarAnuncioAlPrincipio(anuncio);
        clearForm();
      } else {
        const respuestaJson = await respuesta.json();
        alert("Error al crear el anuncio: " + respuestaJson.error);
      }
    } catch (error) {
      alert("Error de red: " + error);
    }
  };

  const handleAdvancedOptionsClick = () => {
    setShowAdvancedOptions(!showAdvancedOptions);
  };

  return (
    <div className={`form-container ${isVisible ? "show" : ""}`}>
      <button onClick={hideForm}>Cerrar</button>
      <form
        id="adForm"
        action="/api/anuncios"
        method="POST"
        onSubmit={handleSubmit}
      >
        <fieldset>
          <legend>Publica tu anuncio!</legend>
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
  className= "form-inputs"
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
            placeholder="Escribe una descripción detallada de tu anuncio"
          ></textarea>
          <label htmlFor="phone">Teléfono/WhatsApp:</label>
          <input
  className= "form-inputs"
            type="tel"
            id="phone"
            name="phone"
            ref={phoneRef}
            placeholder="+51 987 654 321"
          />

          <button type="button" onClick={handleAdvancedOptionsClick}>
            {showAdvancedOptions ? "Ocultar" : "Mostrar"} opciones avanzadas
          </button>
          {showAdvancedOptions && (
            <>
              <label htmlFor="amount">Monto:</label>
              <input
  className= "form-inputs"
                type="number"
                id="amount"
                name="amount"
                ref={amountRef}
                placeholder="s/100.00"
                min="0"
                step="0.01"
              />
              <label htmlFor="location">Ubicación:</label>
              <input
  className= "form-inputs"
                type="text"
                id="location"
                name="location"
                ref={locationRef}
                placeholder="Escribe tu ubicación"
              />
              <label htmlFor="email">Correo electrónico:</label>
              <input
  className= "form-inputs"
                type="email"
                id="email"
                name="email"
                ref={emailRef}
                placeholder=""
              />
              <label htmlFor="image">Imagen:</label>
              <input
  className= "form-inputs" type="file" id="image" name="image" ref={imageRef} />
            </>
          )}
          <PublishButton />
        </fieldset>
      </form>
      <Payment />
    </div>
  );
}

export default AdForm;
