import React, { useRef } from 'react';
import './adForm.css';

function AdForm({ agregarAnuncioAlPrincipio }) {
    const titleRef = useRef();
    const descriptionRef = useRef();
    const urlRef = useRef();
    const amountRef = useRef();
    const locationRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();

    const clearForm = () => {
        titleRef.current.value = '';
        descriptionRef.current.value = '';
        amountRef.current.value = '';
        locationRef.current.value = '';
        phoneRef.current.value = '';
        emailRef.current.value = '';
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const respuesta = await fetch('/api/anuncios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: titleRef.current.value,
                    description: descriptionRef.current.value,
                    amount: amountRef.current.value,
                    location: locationRef.current.value,
                    phone: phoneRef.current.value,
                    email: emailRef.current.value
                })
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
    }

    return (
        <div className="form-column" id="ad-form">
            <form id="adForm" action="/api/anuncios" method="POST" onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Información del anuncio</legend>
                    <label htmlFor="title">Título:</label>
                    <input type="text" id="title" name="title" required ref={titleRef} />
                    <label htmlFor="description">Descripción:</label>
                    <textarea id="description" name="description" required ref={descriptionRef}></textarea>
                    <label htmlFor="url">URL de imagen:</label>
                    <input type="url" id="url" name="url" ref={urlRef} />
                    <label htmlFor="amount">Precio:</label>
                    <input type="number" id="amount" name="amount"  ref={amountRef} />
                    <label htmlFor="location">Ubicación:</label>
                    <input type="text" id="location" name="location"  ref={locationRef} />
                    <label htmlFor="phone">Teléfono:</label>
                    <input type="tel" id="phone" name="phone"  ref={phoneRef} />
                    <label htmlFor="email">Correo electrónico:</label>
                    <input type="email" id="email" name="email"  ref={emailRef} />
                </fieldset>
                <button type="submit">Publicar anuncio</button>
            </form>
        </div>
    );
}

export default AdForm;