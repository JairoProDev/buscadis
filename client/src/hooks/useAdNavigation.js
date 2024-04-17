// useAdNavigation.js
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function useAdNavigation(anuncios) {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentIndex = anuncios.findIndex((anuncio) => anuncio._id === id);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft' && currentIndex > 0) {
      navigate(`/anuncio/${anuncios[currentIndex - 1]._id}`);
    } else if (event.key === 'ArrowRight' && currentIndex < anuncios.length - 1) {
      navigate(`/anuncio/${anuncios[currentIndex + 1]._id}`);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, anuncios, navigate]);
}

export default useAdNavigation;