//HomePage.js

// React and Hooks
import React, { Fragment, useRef, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import useAds from "./hooks/useAds";
import useSearch from "./hooks/useSearch";
// Components
import Header from "./components/Header/Header";
import NewFeed from "./components/NewFeed/NewFeed";
import AdForm from "./components/AdForm/AdForm";
import AdModal from "./components/AdModal/AdModal";
import SocialMedia from "./components/SocialMedia/SocialMedia";
import UserProfile from "./components/UserProfile/UserProfile";
import AdsColumn from "./components/AdsColumn/AdsColumn";
import BottomNavBar from "./components/BottomNavBar/BottomNavBar";
// Styles
import "./styles/root.css";
import "./styles/reset.css";
import "./styles/body.css";
import "./styles/navigation.css";
import "./styles/responsive.css";
import "./styles/navbar.css";
import "./HomePage.css";

function HomePage() {
  const [page] = useState(1);
  const [filter, setFilter] = useState("");
  const { adType, category, subcategory } = useParams();

  const { anuncios, agregarAnuncioAlPrincipio, error, isLoading } = useAds(
    page,
    adType,
    category,
    subcategory,
    filter
  );
  const { filteredAds, updateSearchTerm } = useSearch(anuncios, filter);
  const [selectedAd, setSelectedAd] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => setIsFormVisible(!isFormVisible);
  const showForm = () => setIsFormVisible(true);
  const hideForm = () => setIsFormVisible(false);

  const loader = useRef(null);
  const searchInputRef = useRef(null);

  return (
    <Fragment>
      <div className="main-container">
        <Header
          toggleForm={showForm}
          setFilter={setFilter}
          updateSearchTerm={updateSearchTerm}
          searchInputRef={searchInputRef} // Pasa la referencia al campo de búsqueda
        />
        <div className="container">
          <div className="portal">
            <NewFeed
              className="feed"
              anuncios={filteredAds}
              setSelectedAd={setSelectedAd}
              error={error}
              isLoading={isLoading}
              loader={loader.current}
              setFilter={setFilter}
              toggleForm={showForm}
            />
          </div>
          <div className="right-sidebar">
            <button type="button" className="publish-button" onClick={toggleFormVisibility}>
              {isFormVisible ? 'buscar avisos gratis' : 'publicar aviso'}
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>

            {isFormVisible && (
              <AdForm
                agregarAnuncioAlPrincipio={agregarAnuncioAlPrincipio}
                isVisible={isFormVisible}
                hideForm={toggleFormVisibility} // Usa la misma función para ocultar
                anuncios={anuncios}
              />
            )}
            <AdsColumn anuncios={anuncios} />
          </div>
          <SocialMedia />
        </div>
        <BottomNavBar showForm={showForm} searchInputRef={searchInputRef} />
      </div>
      <Routes>
        <Route path="/profile" element={<UserProfile />} />
        <Route
          path="/:adType/:category/:subcategory/:id"
          element={<AdModal anuncios={anuncios} selectedAd={selectedAd} />}
        />
      </Routes>
    </Fragment>
  );
}

export default HomePage;
