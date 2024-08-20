import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdList from '../AdList/AdList';
import AdTypeButtons from '../AdTypeButtons/AdTypeButtons';
import { adTypes } from '../AdTypeButtons/AdTypes';

function Feed({ anuncios, setSelectedAd, error, isLoading, loader, setFilter, toggleForm }) {
  const { adType, category, subcategory } = useParams();
  const navigate = useNavigate();
  const [filteredAnuncios, setFilteredAnuncios] = useState([]);

  useEffect(() => {
    console.log("Anuncios antes del filtrado:", anuncios);
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
    console.log("Anuncios después del filtrado:", filtered);
    setFilteredAnuncios(filtered);
  }, [anuncios, adType, category, subcategory]);

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
