// React and Hooks
import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import useAds from "./hooks/useAds";
import useIntersectionObserver from "./hooks/useIntersectionObserver";

// Components
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import AdList from "./components/AdList/AdList";
import AdForm from "./components/AdForm/AdForm";
import AdModal from "./components/AdModal/AdModal";
import SocialMedia from "./components/SocialMedia/SocialMedia";
import NavList from "./components/NavList/NavList";

// Styles
import "./styles/root.css";
import "./styles/reset.css";
import "./styles/body.css"; 
import "./styles/navigation.css";
import "./styles/responsive.css";
import "./styles/navbar.css";
import "./styles/PublishButton.css";
import "./MainComponent.css";

function MainComponent() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const { anuncios, agregarAnuncioAlPrincipio, error, hasMore, isLoading } =
    useAds(page, filter);
  const [selectedAd, setSelectedAd] = useState(null);

  const filteredAds = filter
    ? anuncios.filter((ad) => ad.category === filter)
    : anuncios;

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const showForm = () => setIsFormVisible(true);
  const hideForm = () => setIsFormVisible(false);

  const hideAdModal = useCallback(() => setSelectedAd(null), []);
  const loadMore = useCallback(() => setPage((prevPage) => prevPage + 1), []);

  const loader = useRef(null);
  useIntersectionObserver(loader, loadMore, hasMore, isLoading);


  return (
    <Fragment>
      <Header setFilter={setFilter} toggleSidebar={toggleSidebar} />
      <div className="container">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="portal">
          <AdList anuncios={filteredAds} setSelectedAd={setSelectedAd} />
          {error && <div className="error">{error}</div>}
          {isLoading && <div ref={loader}>Loading...</div>}
        </div>
        <AdForm
          agregarAnuncioAlPrincipio={agregarAnuncioAlPrincipio}
          isVisible={isFormVisible}
          hideForm={hideForm}
        />
        <SocialMedia />
        <AdModal ad={selectedAd} onHide={hideAdModal} />
      </div>
      <NavList toggleForm={showForm} setFilter={setFilter} />    
    </Fragment>
  );
}

export default MainComponent;