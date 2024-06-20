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
              ad.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              ad.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              ad.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              ad.adType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              ad.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              ad.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              ad.phone2?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              ad.email?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filter) {
            filtered = filtered.filter((ad) => ad.adType === filter);
        }

        return filtered;
    }, [anuncios, searchTerm, filter]);

    return {
        filteredAds,
        updateSearchTerm,
    };
}

export default useSearch;