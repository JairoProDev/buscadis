import { useState, useEffect, useCallback, useMemo } from "react";

function useAds(page, category, subcategory) {
    const [anuncios, setAnuncios] = useState([]);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [lastPageLoaded, setLastPageLoaded] = useState(0);

    const reversedAnuncios = useMemo(() => [...anuncios].reverse(), [anuncios]);

    const showAds = useCallback((anunciosData) => {
        if (Array.isArray(anunciosData)) {
            setAnuncios((oldAnuncios) => {
                const newAnuncios = anunciosData.filter(
                    (anuncio) => !oldAnuncios.find((a) => a.id === anuncio.id)
                );
                return [...oldAnuncios, ...newAnuncios];
            });
            setHasMore(anunciosData.length > 0);
            setLastPageLoaded(page);
        } else {
            console.error("anunciosData is not an array:", anunciosData);
            setError("Error: Data received is not an array");
        }
    }, [page]);

    const getAds = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
        const url = `/api/anuncios?page=${page}` + (category ? `&category=${category}` : '') + (subcategory ? `&subcategory=${subcategory}` : '');
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        if (data && data.anuncios) {
        showAds(data.anuncios);
        setHasMore(data.hasMore);
        } else {
        console.error('anuncios is null or undefined:', data);
        setError('Error: Data received is null or undefined');
        }
    } catch (error) {
        console.error('Error al obtener los anuncios:', error);
        setError('Error al obtener los anuncios');
    }
    setIsLoading(false);
    }, [showAds, page, category]);

    useEffect(() => {
        if (page > lastPageLoaded && hasMore && !isLoading) {
            getAds();
        }
    }, [getAds, page, lastPageLoaded, hasMore, isLoading]);

    const agregarAnuncioAlPrincipio = (anuncio) => {
        setAnuncios((prevAnuncios) => [...prevAnuncios, anuncio]);
    };

    return {
        anuncios: reversedAnuncios,
        agregarAnuncioAlPrincipio,
        error,
        hasMore,
        isLoading,
    };
}

export default useAds;