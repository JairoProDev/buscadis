import { useState, useCallback } from "react";

const useAds = () => {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const showAds = useCallback((adsData) => {
    console.log(adsData);
    if (Array.isArray(adsData)) {
      setAds((prevAds) => [...prevAds, ...adsData]);
      setHasMore(adsData.length > 0); // Actualiza hasMore basado en la longitud de adsData
    } else {
      console.error("adsData is not an array:", adsData);
      setError("Error: Data received is not an array");
    }
  }, []);

  const getAds = useCallback(
    async (adType, category, subcategory, page = 1, limit = 20) => {
      setIsLoading(true);
      setError(null);

      try {
        // Determinar la URL correcta de la API basada en el tipo de adiso
        let url;
        switch (adType) {
          case "Empleos":
            url = `/api/jobs?limit=${limit}&page=${page}`;
            break;
          case "Inmuebles":
            url = `/api/realestate?limit=${limit}&page=${page}`;
            break;
          case "Vehiculos":
            url = `/api/vehicles?limit=${limit}&page=${page}`;
            break;
          case "Servicios":
            url = `/api/services?limit=${limit}&page=${page}`;
            break;
          case "Productos":
            url = `/api/products?limit=${limit}&page=${page}`;
            break;
          case "Negocios":
            url = `/api/businesses?limit=${limit}&page=${page}`;
            break;
          default:
            url = `/api/ads?limit=${limit}&page=${page}`; // Para cualquier otro caso, tal vez un tipo de adiso genérico
            break;
        }

        if (category) {
          url += `&category=${encodeURIComponent(category)}`;
        }
        if (subcategory) {
          url += `&subcategory=${encodeURIComponent(subcategory)}`;
        }

        const response = await fetch(url);

        // Verifica si la respuesta es correcta y es JSON
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const adsData = await response.json();

          console.log("Datos recibidos desde la API:", adsData); // <-- Añade este log

          if (adsData) {
            if (page === 1) {
              setAds(adsData); // Si es la primera página, reemplaza el estado con los nuevos adisos
            } else {
              showAds(adsData); // Si es una página posterior, añade los adisos al estado existente
            }
          } else {
            setError("Error: Data received is null or undefined");
          }
        } else {
          throw new Error("Expected JSON, but received: " + contentType);
        }
      } catch (error) {
        console.error("Error fetching ads:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [showAds]
  );

  return {
    ads,
    addAdToTop: (ad) => setAds((prevAds) => [ad, ...prevAds.slice(0, 99)]), // Agrega un nuevo adiso al principio
    error,
    isLoading,
    hasMore,
    getAds,
  };
};

export default useAds;
