import { useState, useCallback } from "react";

function useAds() {
  const [anuncios, setAnuncios] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Indica si hay más anuncios por cargar

  const showAds = useCallback((anunciosData, page) => {
    if (Array.isArray(anunciosData)) {
      if (page === 1) {
        setAnuncios(anunciosData); // Reinicia los anuncios si es la primera página
      } else {
        setAnuncios((prevAnuncios) => [...prevAnuncios, ...anunciosData]); // Añade más anuncios
      }
      setHasMore(anunciosData.length > 0); // Si no hay más anuncios, desactivamos hasMore
    } else {
      console.error("anunciosData is not an array:", anunciosData);
      setError("Error: Data received is not an array");
    }
  }, []);

  const getAds = useCallback(async (adType, category, subcategory, page = 1, limit = 20) => {
    if (isLoading) return; // Prevenir múltiples solicitudes simultáneas
    setIsLoading(true);
    setError(null);
    try {
      const url = `/api/anuncios?limit=${limit}&page=${page}` +
                  (adType ? `&adType=${adType}` : '') +
                  (category ? `&category=${category}` : '') +
                  (subcategory ? `&subcategory=${subcategory}` : '');
      
      console.log("Fetching ads with URL:", url);
  
      const respuesta = await fetch(url);
      const anuncios = await respuesta.json();
  
      console.log("Anuncios recibidos:", anuncios);
  
      if (anuncios && Array.isArray(anuncios)) {
        showAds(anuncios, page);
      } else {
        console.error('anuncios is null or undefined:', anuncios);
        setError('Error: Data received is null or undefined');
      }
    } catch (error) {
      console.error('Error al obtener los anuncios:', error);
      setError('Error al obtener los anuncios');
    }
    setIsLoading(false);
  }, [isLoading, showAds]);

  const agregarAnuncioAlPrincipio = (anuncio) => {
    setAnuncios((prevAnuncios) => [anuncio, ...prevAnuncios.slice(0, 99)]);
  };

  return {
    anuncios,
    agregarAnuncioAlPrincipio,
    error,
    isLoading,
    hasMore, // Devuelve si hay más anuncios por cargar
    getAds,  // Exponemos la función para obtener los anuncios
  };
}

export default useAds;
