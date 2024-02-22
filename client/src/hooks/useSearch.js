import { useState, useMemo } from 'react';

function useSearch(anuncios, filter) {
    const [searchTerm, setSearchTerm] = useState("");

    const updateSearchTerm = (newSearchTerm) => {
        setSearchTerm(newSearchTerm);
    };

    const filteredAds = useMemo(() => {
        let filtered = anuncios;

        if (searchTerm) {
            filtered = filtered.filter((ad) =>
                ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ad.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ad.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filter) {
            filtered = filtered.filter((ad) => ad.category === filter);
        }

        return filtered;
    }, [anuncios, searchTerm, filter]);

    return {
        filteredAds,
        updateSearchTerm,
    };
}

export default useSearch;