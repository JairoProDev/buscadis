import React from 'react';
import './adCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function AdCard({ anuncio }) {
    return <li>{anuncio.title}</li>;
}

export default AdCard;