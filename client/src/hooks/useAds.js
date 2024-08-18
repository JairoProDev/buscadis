import { useState, useCallback, useMemo } from "react";

function useAds() {
    const [anuncios, setAnuncios] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const showAds = useCallback((anunciosData) => {
        if (Array.isArray(anunciosData)) {
            setAnuncios((prevAnuncios) => [...prevAnuncios, ...anunciosData]);
            setHasMore(anunciosData.length > 0);
        } else {
            console.error("anunciosData is not an array:", anunciosData);
            setError("Error: Data received is not an array");
        }
    }, []);

    const getAds = useCallback(async (adType, category, subcategory, page = 1, limit = 20) => {
        setIsLoading(true);
        setError(null);
        try {
            const url = `/api/anuncios?limit=${limit}&page=${page}` +
                        (adType ? `&adType=${adType}` : '') +
                        (category ? `&category=${category}` : '') +
                        (subcategory ? `&subcategory=${subcategory}` : '');
            const respuesta = await fetch(url);
            const anuncios = await respuesta.json();
            if (anuncios) {
                if (page === 1) {
                    setAnuncios(anuncios);
                } else {
                    showAds(anuncios);
                }
            } else {
                console.error('anuncios is null or undefined:', anuncios);
                setError('Error: Data received is null or undefined');
            }
        } catch (error) {
            console.error('Error al obtener los anuncios:', error);
            setError('Error al obtener los anuncios');
        }
        setIsLoading(false);
    }, [showAds]);

    const adsHook = useMemo(() => ({
        anuncios,
        agregarAnuncioAlPrincipio: (anuncio) => setAnuncios((prevAnuncios) => [anuncio, ...prevAnuncios.slice(0, 99)]),
        error,
        isLoading,
        hasMore,
        getAds,
    }), [anuncios, error, isLoading, hasMore, getAds]);

    return adsHook;
}

export default useAds;
