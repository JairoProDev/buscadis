// Advertisement.js
import React from 'react';

function Advertisement({ ad }) {
    return (
        <div>
            <h2>{ad.title}</h2>
            <p>{ad.description}</p>
            {/* Renderiza los demás detalles del anuncio como desees */}
        </div>
    );
}

export default Advertisement;