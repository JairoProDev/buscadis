import React from 'react';
import './adCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function AdCard({ anuncio }) {
    const { title, description, amount, location, phone } = anuncio;

    return (
        <div className="ad-card">
            <div className="ad-card__content">
                <h3 className="ad-card__title">{title}</h3>
                <p className="ad-card__description">{description}</p>
                <div className="ad-card__details">
                    <p className="ad-card__price">{amount}</p>
                    <p className="ad-card__location">{location}</p>
                </div>
                <div className="ad-card__buttons">
                    <a href={`tel:${phone}`} className="ad-card__button ad-card__button--details" aria-label="Call">
                        <FontAwesomeIcon icon={faPhone} />
                    </a>
                    <a href={`https://wa.me/${phone}?text=${encodeURIComponent("Hola, vi su anuncio en PublicAdis.com y me interesa, podría proporcionarme más información por favor?")}`} className="ad-card__button ad-card__button--contact" aria-label="Contact on WhatsApp">
                        <FontAwesomeIcon icon={faWhatsapp} size='2x' />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default AdCard;