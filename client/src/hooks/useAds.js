import { useState, useEffect, useCallback, useMemo } from 'react';

function useAds() {
    const [anuncios, setAnuncios] = useState([]);
    const [error, setError] = useState(null);

    const reversedAnuncios = useMemo(() => [...anuncios].reverse(), [anuncios]);

    const showAds = useCallback((anunciosData) => {
        console.log('showAds anunciosData:', anunciosData);
        if (Array.isArray(anunciosData)) {
            setAnuncios(anunciosData);
        } else {
            console.error('anunciosData is not an array:', anunciosData);
            setError('Error: Data received is not an array');
        }
    }, []);

    const getAds = useCallback(async () => {
        setError(null);
        try {
            const respuesta = await fetch("/api/anuncios");
            console.log('getAds respuesta:', respuesta);
            const anuncios = await respuesta.json();
            if (anuncios) {
                showAds(anuncios);
            } else {
                console.error('anuncios is null or undefined:', anuncios);
                setError('Error: Data received is null or undefined');
            }
        } catch (error) {
            console.error('Error al obtener los anuncios:', error);
            setError("Error al obtener los anuncios");
        }
    }, [showAds]);

    useEffect(() => {
        getAds();
    }, [getAds]);

    const agregarAnuncioAlPrincipio = (anuncio) => {
        setAnuncios(prevAnuncios => [...prevAnuncios, anuncio]);
    }

    return { anuncios: reversedAnuncios, agregarAnuncioAlPrincipio, error };
}

export default useAds;