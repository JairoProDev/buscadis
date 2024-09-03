import React, { Fragment, useRef, useState, useEffect } from "react";
import { Route, Routes, useParams, useNavigate } from "react-router-dom";
import useAds from "./hooks/useAds";
import useSearch from "./hooks/useSearch";
import Header from "./components/Header/Header";
import AdTypeButtons from "./components/AdTypeButtons/AdTypeButtons";
import NewFeed from "./components/NewFeed/NewFeed";
import AdForm from "./components/AdForm/AdForm";
import Modal from "./components/Modal/Modal";
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
  const { adType, category, subcategory, id } = useParams();
  const navigate = useNavigate();
  const [isAdTypeSelected, setIsAdTypeSelected] = useState(!!adType);
  const [selectedAdType, setSelectedAdType] = useState(adType || null);

  const { ads, addAdToTop, error, isLoading, hasMore, getAds } = useAds();
  const { filteredAds, updateSearchTerm } = useSearch(ads, filter);
  const [selectedAd, setSelectedAd] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const loader = useRef(null);
  const searchInputRef = useRef(null);

  const toggleFormVisibility = () => setIsFormVisible(!isFormVisible);

  const handleAdTypeClick = (adType) => {
    setSelectedAdType(adType);
    setIsAdTypeSelected(true);
    setPage(1);
    getAds(adType);
    navigate(`/${adType}`);
  };

    // Redirigir a /Empleos si el usuario está en la ruta raíz
    useEffect(() => {
      if (!adType) {
        navigate('/Empleos');
      }
    }, [adType, navigate]);
    
  useEffect(() => {
    if (adType) {
      setSelectedAdType(adType);
      setIsAdTypeSelected(true);
      setPage(1);
      getAds(adType, category, subcategory);
    }
  }, [adType, category, subcategory, getAds]);

  useEffect(() => {
    if (id && ads.length > 0) {
      const ad = ads.find((ad) => ad._id === id);
      if (ad) {
        setSelectedAd(ad);
      } else {
        // Si el anuncio no se encuentra, intenta cargar más anuncios
        setPage(1);
        getAds(adType, category, subcategory);
      }
    }
  }, [id, ads, adType, category, subcategory, getAds]);

  const handleScroll = () => {
    if (
      loader.current &&
      loader.current.getBoundingClientRect().bottom <= window.innerHeight &&
      hasMore &&
      !isLoading
    ) {
      setPage((prevPage) => prevPage + 1);
      getAds(selectedAdType, category, subcategory, page + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleCloseModal = () => {
    setSelectedAd(null);
    navigate(`/${adType}/${category || ""}/${subcategory || ""}`);
  };
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const currentIndex = ads.findIndex(ad => ad._id === selectedAd._id);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % ads.length;
      setSelectedAd(ads[nextIndex]);
    }
  };
  
  const handlePrev = () => {
    const currentIndex = ads.findIndex(ad => ad._id === selectedAd._id);
    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + ads.length) % ads.length;
      setSelectedAd(ads[prevIndex]);
    }
  };
  

  return (
    <Fragment>
      <div className="main-container">
        <Header
          toggleForm={toggleFormVisibility}
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
                loader={loader}
                setFilter={setFilter}
                toggleForm={toggleFormVisibility}
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
                addAdToTop={addAdToTop}
                isVisible={isFormVisible}
                hideForm={toggleFormVisibility}
                anuncios={ads}
              />
            )}
            <AdsColumn anuncios={filteredAds} selectedAdType={selectedAdType} />
          </div>
          <SocialMedia />
        </div>
        <BottomNavBar showForm={toggleFormVisibility} searchInputRef={searchInputRef} />
      </div>
      <Routes>
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
      {selectedAd && (
        <Modal
          anuncio={selectedAd}
          onClose={handleCloseModal}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </Fragment>
  );
}

export default HomePage;
