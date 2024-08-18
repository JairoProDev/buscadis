//HomePage.js

// React and Hooks
import React, { Fragment, useRef, useState, useEffect } from "react";
import { Route, Routes, useParams, useNavigate } from "react-router-dom";
import useAds from "./hooks/useAds"; // Importamos el hook
import useSearch from "./hooks/useSearch";
import Header from "./components/Header/Header";
import AdTypeButtons from "./components/AdTypeButtons/AdTypeButtons";
import NewFeed from "./components/NewFeed/NewFeed";
import AdForm from "./components/AdForm/AdForm";
import AdModal from "./components/AdModal/AdModal";
import SocialMedia from "./components/SocialMedia/SocialMedia";
import UserProfile from "./components/UserProfile/UserProfile";
import AdsColumn from "./components/AdsColumn/AdsColumn";
import BottomNavBar from "./components/BottomNavBar/BottomNavBar";
import "./styles/root.css";
import "./styles/reset.css";
import "./styles/body.css";
import "./styles/navigation.css";
import "./styles/responsive.css";
import "./styles/navbar.css";
import "./HomePage.css";

function HomePage() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const { adType, category, subcategory } = useParams();
  const navigate = useNavigate();
  const [isAdTypeSelected, setIsAdTypeSelected] = useState(false);
  const [selectedAdType, setSelectedAdType] = useState(adType || null);

  const { anuncios, agregarAnuncioAlPrincipio, error, isLoading, hasMore, getAds } = useAds();
  console.log(getAds);
  const { filteredAds, updateSearchTerm } = useSearch(anuncios, filter);
  const [selectedAd, setSelectedAd] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => setIsFormVisible(!isFormVisible);
  const showForm = () => setIsFormVisible(true);
  const hideForm = () => setIsFormVisible(false);

  const loader = useRef(null);
  const searchInputRef = useRef(null);

  // Manejar la selección del tipo de anuncio
  const handleAdTypeClick = (adType) => {
    setSelectedAdType(adType);
    setIsAdTypeSelected(true);
    setPage(1); // Reiniciar la página al seleccionar un nuevo tipo de anuncio
    getAds(adType, category, subcategory, 1); // Llamar a la función para obtener los anuncios
    navigate(`/${adType}`); // Navegar a la URL del tipo seleccionado
  };

  // Efecto para cargar anuncios si se accede directamente desde una URL con adType
  useEffect(() => {
    if (adType) {
      setSelectedAdType(adType);
      setIsAdTypeSelected(true);
      setPage(1);
      getAds(adType, category, subcategory, 1);
    }
  }, [adType, category, subcategory, getAds]);

  // Función para manejar el scroll e implementar lazy loading
  const handleScroll = () => {
    if (loader.current && loader.current.getBoundingClientRect().bottom <= window.innerHeight && hasMore && !isLoading) {
      setPage(prevPage => prevPage + 1);
      getAds(selectedAdType, category, subcategory, page + 1); // Obtener más anuncios al hacer scroll
    }
  };

  // Añadir el event listener para el scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  console.log("getAds in HomePage:", getAds);

  useEffect(() => {
    console.log("Probando getAds directamente en HomePage");
    getAds("Inmuebles"); // Prueba para ver si esta llamada funciona
  }, [getAds]);
  
  return (
    <Fragment>
      <div className="main-container">
        <Header
          toggleForm={showForm}
          setFilter={setFilter}
          updateSearchTerm={updateSearchTerm}
          searchInputRef={searchInputRef}
        />
        <div className="container">
          <div className="portal">
            {!isAdTypeSelected ? (
              <AdTypeButtons 
                adType={selectedAdType}
                handleAdTypeClick={handleAdTypeClick} 
                getAds={getAds}
              />

            ) : (
              <NewFeed
                className="feed"
                anuncios={filteredAds}
                setSelectedAd={setSelectedAd}
                loader={loader.current}
                setFilter={setFilter}
                toggleForm={showForm}
              />
            )}
          </div>
          <div className="right-sidebar">
            <button
              type="button"
              className="publish-button"
              onClick={toggleFormVisibility}
            >
              {isFormVisible ? "buscar avisos gratis" : "publicar aviso"}
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>

            {isFormVisible && (
              <AdForm
                agregarAnuncioAlPrincipio={agregarAnuncioAlPrincipio}
                isVisible={isFormVisible}
                hideForm={toggleFormVisibility}
                anuncios={anuncios}
              />
            )}
            <AdsColumn anuncios={filteredAds} selectedAdType={selectedAdType} />
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
