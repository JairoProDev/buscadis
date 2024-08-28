import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdList from '../AdList/AdList';
import AdTypeButtons from '../AdTypeButtons/AdTypeButtons';
import { adTypes } from '../AdTypeButtons/AdTypes';

function Feed({ anuncios = [], setSelectedAd, error, isLoading, loader, setFilter, toggleForm }) {
  const { adType, category, subcategory } = useParams();
  const navigate = useNavigate();
  const [filteredAnuncios, setFilteredAnuncios] = useState([]);

  useEffect(() => {
    // Check if anuncios is not empty and is an array
    if (Array.isArray(anuncios) && anuncios.length > 0) {
      let filtered = anuncios;

      if (adType) {
        filtered = filtered.filter(anuncio => anuncio.adType === adType);
      }
      if (category) {
        filtered = filtered.filter(anuncio => anuncio.category === category);
      }
      if (subcategory) {
        filtered = filtered.filter(anuncio => anuncio.subCategory === subcategory);
      }

      // Only update state if the filtered results have changed
      if (JSON.stringify(filteredAnuncios) !== JSON.stringify(filtered)) {
        setFilteredAnuncios(filtered);
      }
    }
  }, [anuncios, adType, category, subcategory]); // Dependencies ensure this runs only when these change

  const handleAdTypeClick = (adType) => {
    navigate(`/${adType}`);
  };

  const handleCategoryClick = (category) => {
    navigate(`/${adType}/${category}`);
  };

  const handleSubCategoryClick = (subcategory) => {
    navigate(`/${adType}/${category}/${subcategory}`);
  };

  return (
    <div className="feed">
      <AdTypeButtons
        adTypes={adTypes}
        adType={adType}
        category={category}
        subCategory={subcategory}
        handleAdTypeClick={handleAdTypeClick}
        handleCategoryClick={handleCategoryClick}
        handleSubCategoryClick={handleSubCategoryClick}
      />
      <AdList
        anuncios={filteredAnuncios}
        setSelectedAd={setSelectedAd}
        error={error}
        isLoading={isLoading} 
        loader={loader}
      />
      {error && <div className="error">{error}</div>}
      {isLoading && (
        <div ref={loader}>
          Cargando anuncios publicados en BuscAdis.com...
        </div>
      )}
    </div>
  );
}

export default Feed;
