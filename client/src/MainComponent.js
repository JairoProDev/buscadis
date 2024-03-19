// React and Hooks
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Route, Routes } from "react-router-dom";
import useAds from "./hooks/useAds";
import useSearch from "./hooks/useSearch";
import useIntersectionObserver from "./hooks/useIntersectionObserver";

// Components
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import AdList from "./components/AdList/AdList";
import AdForm from "./components/AdForm/AdForm";
import AdModal from "./components/AdModal/AdModal";
import SocialMedia from "./components/SocialMedia/SocialMedia";
import NavList from "./components/NavList/NavList";
import SearchBar from "./components/SearchBar/SearchBar";
import HomeFeed from "./components/HomeFeed/HomeFeed";

import RegisterForm from "./components/RegisterForm/RegisterForm";
import LoginForm from "./components/LoginForm/LoginForm";
import Modal from './components/Modal/Modal'; // Asegúrate de que esta ruta es correcta
// Styles
import "./styles/root.css";
import "./styles/reset.css";
import "./styles/body.css";
import "./styles/navigation.css";
import "./styles/responsive.css";
import "./styles/navbar.css";
import "./MainComponent.css";

function MainComponent() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const { anuncios, agregarAnuncioAlPrincipio, error, hasMore, isLoading } =
    useAds(page, filter);
  const { filteredAds, updateSearchTerm } = useSearch(anuncios, filter);
  const [selectedAd, setSelectedAd] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () =>
    setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const showForm = () => setIsFormVisible(true);
  const hideForm = () => setIsFormVisible(false);
  const hideAdModal = useCallback(() => setSelectedAd(null), []);
  const loadMore = useCallback(() => setPage((prevPage) => prevPage + 1), []);
  const loader = useRef(null);
  useIntersectionObserver(loader, loadMore, hasMore, isLoading);

const [isLoginOpen, setIsLoginOpen] = useState(false);
const [isRegisterOpen, setIsRegisterOpen] = useState(false);

const openLoginModal = () => setIsLoginOpen(true);
const closeLoginModal = () => setIsLoginOpen(false);

const openRegisterModal = () => setIsRegisterOpen(true);
const closeRegisterModal = () => setIsRegisterOpen(false);

  return (
    <Fragment>
      <div className="main-container">
        <Header
          toggleForm={showForm}
          setFilter={setFilter}
          toggleSidebar={toggleSidebar}
          openLoginModal={openLoginModal}
          openRegisterModal={openRegisterModal}
        />
      {isLoginOpen && (
        <Modal onClose={closeLoginModal}>
          <LoginForm onSuccess={closeLoginModal} />
        </Modal>
      )}
      {isRegisterOpen && (
        <Modal onClose={closeRegisterModal}>
          <RegisterForm onSuccess={closeRegisterModal} />
        </Modal>
      )}
        <div className="container">
          <Sidebar isOpen={isSidebarOpen} />
          <div className="portal">
            <SearchBar updateSearchTerm={updateSearchTerm} />
            <AdList anuncios={filteredAds} setSelectedAd={setSelectedAd} />
            {error && <div className="error">{error}</div>}
            {isLoading && (
              <div ref={loader}>
                Cargando anuncios publicados en BuscAdis.com...
              </div>
            )}
            <HomeFeed anuncios={filteredAds} />
          </div>
          <AdForm
            agregarAnuncioAlPrincipio={agregarAnuncioAlPrincipio}
            isVisible={isFormVisible}
            hideForm={hideForm}
          />
          <SocialMedia />
          <Routes>
            <Route
              path="/anuncio/:id"
              element={<AdModal anuncios={anuncios} />}
            />
              {/* <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />  */}
          </Routes>
        </div>
        <NavList className="nav-list nav-list-bottom" toggleForm={showForm} setFilter={setFilter} />      </div>
    </Fragment>
  );
}

export default MainComponent;
