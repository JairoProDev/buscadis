import { useState, useEffect, useCallback } from "react";

function useAds(adType, category, subcategory) {
    const [anuncios, setAnuncios] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const showAds = useCallback((anunciosData) => {
        if (Array.isArray(anunciosData)) {
            setAnuncios(anunciosData);
        } else {
            console.error("anunciosData is not an array:", anunciosData);
            setError("Error: Data received is not an array");
        }
    }, []);

    const getAds = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const url = `/api/anuncios?limit=400` + 
                        (adType ? `&adType=${adType}` : '') + 
                        (category ? `&category=${category}` : '') + 
                        (subcategory ? `&subcategory=${subcategory}` : ''); 
            const respuesta = await fetch(url);
            const anuncios = await respuesta.json();
            if (anuncios) {
                showAds(anuncios);
            } else {
                console.error('anuncios is null or undefined:', anuncios);
                setError('Error: Data received is null or undefined');
            }
        } catch (error) {
            console.error('Error al obtener los anuncios:', error);
            setError('Error al obtener los anuncios');
        }
        setIsLoading(false);
    }, [showAds, adType, category, subcategory]);

    useEffect(() => {
        getAds();
    }, [getAds]);

    const agregarAnuncioAlPrincipio = (anuncio) => {
        setAnuncios((prevAnuncios) => [anuncio, ...prevAnuncios.slice(0, 99)]);
    };

    return {
        anuncios,
        agregarAnuncioAlPrincipio,
        error,
        isLoading,
    };
}

export default useAds;