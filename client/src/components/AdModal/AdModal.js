// AdModal.js
import React, { useState, useEffect } from "react";
import ContactButtons from '../ContactButtons/ContactButtons';
import "./adModal.css";

function AdModal({ ad, onHide }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(!!ad);
    }, [ad]);

    if (!ad) return null;

    return (
        <div className={`modal ${isOpen ? 'show' : ''}`} onClick={onHide}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">{ad.title}</h2>
                    <button className="close-button" onClick={onHide}>
                        X
                    </button>
                </div>
                <div className="modal-body">
                    {ad.images && ad.images.map((image, index) => (
                        <img key={index} src={image} alt={`Imagen ${index + 1} de ${ad.title}`} />
                    ))}
                    <p>{ad.description}</p>
                    {ad.amount && <p><span>Precio:</span> {ad.amount}</p>}
                    {ad.location && <p><span>Ubicación:</span> {ad.location}</p>}
                    {ad.phone && <p><span>Teléfono:</span> {ad.phone}</p>}
                    {ad.email && <p><span>Email:</span> {ad.email}</p>}
                    {ad.category && <p><span>Categoría:</span> {ad.category}</p>}
                </div>
                <div className="modal-footer">
                    <button onClick={onHide}>Cerrar</button>
                    <ContactButtons phone={ad.phone} />
                </div>
            </div>
        </div>
    );
}

export default AdModal;