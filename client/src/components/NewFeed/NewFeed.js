import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdList from "../AdList/AdList";
import AdTypeButtons from "../AdTypeButtons/AdTypeButtons";
import { adTypes } from "../AdTypeButtons/AdTypes";
import SearchBar from "../SearchBar/SearchBar"; // Importar SearchBar

function Feed({
  adisos = [],
  setSelectedAd,
  error,
  isLoading,
  loader,
  setFilter,
  toggleForm,
  updateSearchTerm,
}) {
  const { adType, category, subcategory } = useParams();
  const navigate = useNavigate();
  const [filteredAnuncios, setFilteredAnuncios] = useState([]);
  const searchInputRef = useRef(null); // Crear una referencia para el SearchBar

  useEffect(() => {
    // Check if adisos is not empty and is an array
    if (Array.isArray(adisos) && adisos.length > 0) {
      let filtered = adisos;

      if (adType) {
        filtered = filtered.filter((adiso) => adiso.adType === adType);
      }
      if (category) {
        filtered = filtered.filter((adiso) => adiso.category === category);
      }
      if (subcategory) {
        filtered = filtered.filter(
          (adiso) => adiso.subCategory === subcategory
        );
      }

      // Only update state if the filtered results have changed
      if (JSON.stringify(filteredAnuncios) !== JSON.stringify(filtered)) {
        setFilteredAnuncios(filtered);
      }
    }
  }, [adisos, adType, category, subcategory]); // Dependencies ensure this runs only when these change

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
      <SearchBar
        updateSearchTerm={updateSearchTerm}
        inputRef={searchInputRef}
      />
      <AdList
        adisos={filteredAnuncios}
        setSelectedAd={setSelectedAd}
        error={error}
        isLoading={isLoading}
        loader={loader}
      />
      {error && <div className="error">{error}</div>}
      {isLoading && (
        <div ref={loader}>Cargando adisos publicados en BuscAdis.com...</div>
      )}
    </div>
  );
}

export default Feed;
