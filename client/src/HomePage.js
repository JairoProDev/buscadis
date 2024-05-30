// React and Hooks
import React, { Fragment, useCallback, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import useAds from "./hooks/useAds";
import useSearch from "./hooks/useSearch";
import { useParams } from 'react-router-dom';


// Components
import Header from "./components/Header/Header";
import Feed from "./components/Feed/Feed";
import Sidebar from "./components/Sidebar/Sidebar";
import AdForm from "./components/AdForm/AdForm";
import AdModal from "./components/AdModal/AdModal";
import SocialMedia from "./components/SocialMedia/SocialMedia";
import RegisterForm from "./components/AuthForm/RegisterForm";
import LoginForm from "./components/AuthForm/LoginForm";
import Modal from "./components/Modal";
import UserProfile from "./components/UserProfile/UserProfile";

// Styles
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
  const { category, subcategory } = useParams();

  const { anuncios, agregarAnuncioAlPrincipio, error, hasMore, isLoading } =
    useAds(page, category, subcategory, filter);
  const { filteredAds, updateSearchTerm } = useSearch(anuncios, filter);
  const [selectedAd, setSelectedAd] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () =>
    setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const showForm = () => setIsFormVisible(true);
  const hideForm = () => setIsFormVisible(false);
  const loader = useRef(null);

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const openLoginForm = () => {
    setShowLoginForm(true);
    setIsFormVisible(false);
  };

  const openRegisterForm = () => {
    setShowRegisterForm(true);
    setIsFormVisible(false);
  };

  const closeLoginForm = () => setShowLoginForm(false);
  const closeRegisterForm = () => setShowRegisterForm(false);

  return (
    <Fragment>
      <div className="main-container">
        <Header
          toggleForm={showForm}
          setFilter={setFilter}
          toggleSidebar={toggleSidebar}
          openLoginForm={openLoginForm}
          openRegisterForm={openRegisterForm}
          updateSearchTerm={updateSearchTerm}
        />
        {showLoginForm && (
          <Modal onClose={closeLoginForm}>
            <LoginForm onClose={closeLoginForm} />
          </Modal>
        )}
        {showRegisterForm && (
          <Modal onClose={closeRegisterForm}>
            <RegisterForm onClose={closeRegisterForm} />
          </Modal>
        )}
        <div className="container">
          <Sidebar isOpen={isSidebarOpen} />
          <div className="portal">
            <Feed
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
          <AdForm
            agregarAnuncioAlPrincipio={agregarAnuncioAlPrincipio}
            isVisible={isFormVisible}
            hideForm={hideForm}
            anuncios={anuncios}
          />
          <SocialMedia />
        </div>
      </div>
      <Routes>
        <Route path="/profile" element={<UserProfile />} />
        <Route
          path="/anuncio/:id"
          element={<AdModal anuncios={anuncios} selectedAd={selectedAd} />}
        />
      </Routes>
    </Fragment>
  );
}

export default HomePage;
