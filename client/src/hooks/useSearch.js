import { useState, useMemo } from 'react';

function useSearch(anuncios) {
    const [searchTerm, setSearchTerm] = useState("");

    const updateSearchTerm = (newSearchTerm) => {
        setSearchTerm(newSearchTerm);
    };

    const filteredAds = useMemo(() => {
        if (!searchTerm) {
            return anuncios;
        }

        return anuncios.filter((ad) =>
            ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ad.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ad.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [anuncios, searchTerm]);

    return {
        filteredAds,
        updateSearchTerm,
    };
}

export default useSearch;