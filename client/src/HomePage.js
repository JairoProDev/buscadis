import React, { Fragment, useState, useEffect, useCallback, useRef } from "react";
import { Route, Routes, useParams, useNavigate } from "react-router-dom";
import useAds from "./hooks/useAds";
import useSearch from "./hooks/useSearch";
import useIntersectionObserver from './hooks/useIntersectionObserver';
import { Helmet } from 'react-helmet';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { motion, AnimatePresence } from 'framer-motion';
import { Suspense } from 'react';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

import Header from "./components/Header/Header";
import AdTypeButtons from "./components/AdTypeButtons/AdTypeButtons";
import NewFeed from "./components/NewFeed/NewFeed";
import AdForm from "./components/AdForm/AdForm";
import AdDetailView from "./components/AdDetailView/AdDetailView";
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
  const [viewMode, setViewMode] = useState("vertical"); // Estado para el modo de vista
  const [isFormVisible, setIsFormVisible] = useState(false);

  const { 
    ads, 
    addAdToTop, 
    isLoading, 
    hasMore, 
    getAds, 
    error 
  } = useAds();
  
  const { filteredAds, updateSearchTerm } = useSearch(ads, filter);
  const [selectedAd, setSelectedAd] = useState(null);

  const loader = useRef(null);
  const searchInputRef = useRef(null);

  // Use custom intersection observer hook
  const entry = useIntersectionObserver(loader, {
    threshold: 0,
    rootMargin: "100px",
  });

  const toggleFormVisibility = useCallback(() => {
    setIsFormVisible(prev => !prev);
  }, []);

  const handleAdTypeClick = useCallback((adType) => {
    setSelectedAdType(adType);
    setIsAdTypeSelected(true);
    setPage(1);
    getAds(adType);
    navigate(`/${adType}`);
  }, [getAds, navigate]);

  const toggleViewMode = useCallback(() => {
    setViewMode(prev => prev === "vertical" ? "horizontal" : "vertical");
  }, []);

  useEffect(() => {
    if (!adType) {
      navigate("/");
    }
  }, [adType, navigate]);

  useEffect(() => {
    if (adType) {
      setSelectedAdType(adType);
      setIsAdTypeSelected(true);
      setPage(1);

      // Si estamos en un modal de adiso (cuando `id` está presente), no filtrar por subcategoría
      if (id) {
        getAds(adType, category); // Solo filtrar por categoría
      } else {
        getAds(adType, category, subcategory); // Filtrar por subcategoría solo si no hay adiso seleccionado
      }
    }
  }, [adType, category, subcategory, id, getAds]);

  useEffect(() => {
    if (entry?.isIntersecting && hasMore && !isLoading) {
      setPage(prevPage => prevPage + 1);
      getAds(selectedAdType, category, subcategory, page + 1);
    }
  }, [entry?.isIntersecting, hasMore, isLoading, selectedAdType, category, subcategory, page, getAds]);

  useEffect(() => {
    if (id && ads.length > 0) {
      const ad = ads.find(ad => ad._id === id);
      if (ad) {
        setSelectedAd(ad);
      } else {
        // Si el adiso no se encuentra, intenta cargar más adisos
        setPage(1);
        getAds(adType, category, subcategory);
      }
    }
  }, [id, ads, adType, category, subcategory, getAds]);

  const handleScroll = useCallback(() => {
    if (
      loader.current &&
      loader.current.getBoundingClientRect().bottom <= window.innerHeight &&
      hasMore &&
      !isLoading
    ) {
      setPage((prevPage) => prevPage + 1);
      getAds(selectedAdType, category, subcategory, page + 1);
    }
  }, [hasMore, isLoading, selectedAdType, category, subcategory, page, getAds]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleCloseDetailView = useCallback(() => {
    setSelectedAd(null);
    navigate(`/${adType}/${category || ""}`);
  }, [adType, category, navigate]);

  const handleNext = useCallback(() => {
    const currentIndex = ads.findIndex(ad => ad._id === selectedAd._id);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % ads.length;
      setSelectedAd(ads[nextIndex]);
    }
  }, [ads, selectedAd]);

  const handlePrev = useCallback(() => {
    const currentIndex = ads.findIndex(ad => ad._id === selectedAd._id);
    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + ads.length) % ads.length;
      setSelectedAd(ads[prevIndex]);
    }
  }, [ads, selectedAd]);

  if (error) {
    return (
      <div className="error-container">
        <h2>Oops! Algo salió mal</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Intentar de nuevo</button>
      </div>
    );
  }

  return (
    <Fragment>
      <Helmet>
        <title>Buscadis - Encuentra lo que buscas</title>
        <meta name="description" content="Marketplace social para encontrar y publicar anuncios de forma fácil y rápida" />
        <meta name="keywords" content="marketplace, anuncios, compra, venta, servicios" />
        <meta property="og:title" content="Buscadis - Marketplace Social" />
        <meta property="og:description" content="Encuentra y publica anuncios de forma fácil y rápida" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <ErrorBoundary>
        <motion.div 
          className="main-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Header
            toggleForm={toggleFormVisibility}
            setFilter={setFilter}
            updateSearchTerm={updateSearchTerm}
            searchInputRef={searchInputRef}
          />

          <div className="container">
            <motion.div 
              className="portal"
              layout
            >
              <AnimatePresence mode="wait">
                {!isAdTypeSelected ? (
                  <motion.div
                    key="adTypeButtons"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <AdTypeButtons
                      adType={selectedAdType}
                      handleAdTypeClick={handleAdTypeClick}
                      getAds={getAds}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="newFeed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <NewFeed
                      className="feed"
                      adisos={filteredAds}
                      setSelectedAd={setSelectedAd}
                      loader={loader}
                      setFilter={setFilter}
                      toggleForm={toggleFormVisibility}
                      updateSearchTerm={updateSearchTerm}
                      searchInputRef={searchInputRef}
                      viewMode={viewMode}
                      toggleViewMode={toggleViewMode}
                      isLoading={isLoading}
                      hasMore={hasMore}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div 
              className="right-sidebar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.button
                type="button"
                className="publish-button"
                onClick={toggleFormVisibility}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isFormVisible ? "buscar adisos gratis" : "publicar adiso"}
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </motion.button>

              <AnimatePresence>
                {isFormVisible && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <AdForm
                      addAdToTop={addAdToTop}
                      isVisible={isFormVisible}
                      hideForm={toggleFormVisibility}
                      adisos={ads}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <AdsColumn 
                adisos={filteredAds} 
                selectedAdType={selectedAdType} 
              />
            </motion.div>

            <SocialMedia />
          </div>

          <BottomNavBar
            showForm={toggleFormVisibility}
            searchInputRef={searchInputRef}
          />
        </motion.div>

        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </Suspense>

        <AnimatePresence>
          {selectedAd && (
            <AdDetailView
              adiso={selectedAd}
              onClose={handleCloseDetailView}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          )}
        </AnimatePresence>
      </ErrorBoundary>
    </Fragment>
  );
}

export default HomePage;