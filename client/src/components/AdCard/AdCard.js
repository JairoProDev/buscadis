import React from 'react';
import './adCard.css';

function AdCard({ anuncio, setSelectedAd }) {
    console.log('AdCard anuncio:', anuncio)

    const { category, title, description, amount, location, phone } = anuncio;

    const adClass = `ad-card ${category.toLowerCase()}`;

    return (
        <div className={adClass} onClick={() => setSelectedAd(anuncio)}>
            <div className="ad-card__content">
                
                <h3 className="ad-card__title">{title}</h3>
                <p className="ad-card__description">{description}</p>
                <div className="ad-card__details">
                    <p className="ad-card__category">{category}</p>
                    <p className="ad-card__price">{amount}</p>
                    <p className="ad-card__location">{location}</p>
                </div>
            </div>
            
            {/* <div className="ad-card__buttons">
                <a href={`tel:${phone}`} className="ad-card__button ad-card__button--details" aria-label="Call">
                    <FontAwesomeIcon icon={faPhone} />
                </a>
                <a href={`https://wa.me/${phone}?text=${encodeURIComponent("Hola, vi su anuncio en PublicAdis.com y me interesa, podría proporcionarme más información por favor?")}`} className="ad-card__button ad-card__button--contact" aria-label="Contact on WhatsApp">
                    <FontAwesomeIcon icon={faWhatsapp} size='2x' />
                </a>
            </div> */}
        </div>
    );
}

export default AdCard;