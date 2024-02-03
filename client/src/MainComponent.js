import "./styles/root.css";
import "./styles/reset.css";
import "./styles/body.css";

import "./MainComponent.css";

import "./styles/navigation.css";
import "./styles/responsive.css";
import "./styles/navbar.css";
import "./styles/mainContent.css";
import "./styles/PublishButton.css";
import "./components/AdCard/adCard.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import React, { Fragment } from "react";
import AdList from "./components/AdList/AdList";
import Sidebar from "./components/Sidebar/Sidebar";
import AdForm from "./components/AdForm/AdForm";
// import NavBar from './components/NavBar';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Home from './pages/Home';
import Header from "./components/Header/Header";
import useAds from "./hooks/useAds";

function MainComponent() {
  const { anuncios, agregarAnuncioAlPrincipio, error } = useAds();

  return (
    <Fragment>
      <Header />
      <div className="container">
        <div className="main-content">
          <Sidebar />
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
          <AdForm agregarAnuncioAlPrincipio={agregarAnuncioAlPrincipio} />
          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </Fragment>
  );
}
export default MainComponent;
