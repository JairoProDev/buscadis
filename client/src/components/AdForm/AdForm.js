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
  const phone2Ref = useRef();
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
    if (phone2Ref.current) {
      phone2Ref.current.value = "";
    }
  };

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);

      // Create a preview URL for the selected image
      const url = URL.createObjectURL(event.target.files[0]);
      setPreviewUrl(url);
    } else {
      setImage(null);
      setPreviewUrl(null);
    }
  };

  //mantener el valor del textarea en el estado de tu componente:
  const [description, setDescription] = useState("");
  //función que se llame cada vez que cambie el valor del textarea. Esta función puede ajustar la altura del textarea para que se ajuste a su contenido:
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    event.target.style.height = "inherit";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("category", categoryRef.current.value);
    formData.append("title", titleRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("phone", phoneRef.current.value);
    formData.append(
      "location",
      locationRef.current ? locationRef.current.value : ""
    );
    formData.append("email", emailRef.current ? emailRef.current.value : "");
    formData.append("amount", amountRef.current ? amountRef.current.value : "");

    try {
      const response = await fetch("/api/images/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      const imageUrl = data.imageUrl;

      const responseAnuncio = await fetch("/api/anuncios", {
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
          image: imageUrl,
        }),
      });

      if (responseAnuncio.ok) {
        const responseJson = await responseAnuncio.json();
        const anuncio = responseJson.anuncio;
        agregarAnuncioAlPrincipio(anuncio);
        clearForm();
      } else {
        const responseJson = await responseAnuncio.json();
        alert("Error al crear el anuncio: " + responseJson.error);
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
      <button className="form-close-button" onClick={hideForm}>
        X
      </button>
      <form
        id="adForm"
        action="/api/anuncios"
        method="POST"
        onSubmit={handleSubmit}
      >
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
          <label htmlFor="image">Imagen:</label>
          <input
            className="form-input file-input"
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
          {previewUrl && (
            <img src={previewUrl} alt="Preview" className="preview-image" />
          )}

          <button type="button" onClick={handleAdvancedOptionsClick}>
            {showAdvancedOptions ? "Ocultar" : "Mostrar"} opciones avanzadas
          </button>
          {showAdvancedOptions && <></>}
          <PublishButton />
        </fieldset>
      </form>
      <Payment />
    </div>
  );
}

export default AdForm;
