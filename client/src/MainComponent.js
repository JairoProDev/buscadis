// Styles
import "./styles/root.css";
import "./styles/reset.css";
import "./styles/body.css";
import "./styles/navigation.css";
import "./styles/responsive.css";
import "./styles/navbar.css";
import "./styles/mainContent.css";
import "./styles/PublishButton.css";
import "./MainComponent.css";

// Components
import React, { Fragment, useState } from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import AdList from "./components/AdList/AdList";
import AdForm from "./components/AdForm/AdForm";
import SocialMedia from "./components/SocialMedia/SocialMedia";
import useAds from "./hooks/useAds";

function MainComponent() {
  const { anuncios, agregarAnuncioAlPrincipio, error } = useAds();
  const [filter, setFilter] = useState('');

  const filteredAds = filter ? anuncios.filter(ad => ad.category === filter) : anuncios;
  return (
    <Fragment>
      <Header setFilter={setFilter} />
      <div className="container">
        <div className="main-content">
          <Sidebar />
          <AdList anuncios={filteredAds} />
          <AdForm agregarAnuncioAlPrincipio={agregarAnuncioAlPrincipio} />
          <SocialMedia />          
          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </Fragment>
  );
}

export default MainComponent;
