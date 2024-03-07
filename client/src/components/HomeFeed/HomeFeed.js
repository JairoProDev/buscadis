import React, { useState } from "react";
import AdList from "../AdList/AdList";

function HomeFeed({ anuncios }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const filteredAds = anuncios.filter(
    (ad) =>
      ad.category === selectedCategory && ad.subcategory === selectedSubcategory
  );

  return (
    <div>
      {selectedCategory && selectedSubcategory ? (
        <AdList anuncios={filteredAds} />
      ) : (
        <div>
          <Category
            title="Empleos"
            subcategories={["Cocina", "Docencia" /* ... */]}
            onCategoryClick={handleCategoryClick}
            onSubcategoryClick={handleSubcategoryClick}
          />
          {/* Más categorías aquí... */}
        </div>
      )}
    </div>
  );
}

function Category({
  title,
  subcategories,
  onCategoryClick,
  onSubcategoryClick,
}) {
  return (
    <div>
      <h2 onClick={() => onCategoryClick(title)}>{title}</h2>
      <div style={{ display: "flex", overflowX: "scroll" }}>
        {subcategories.map((subcategory) => (
          <div onClick={() => onSubcategoryClick(subcategory)}>
            {subcategory}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeFeed;
