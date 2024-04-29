import React, { useState, useEffect } from "react";
import AdList from "../AdList/AdList";

function HomeFeed() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    // Aquí deberías hacer la solicitud a la API para obtener las categorías
    // Por ahora, solo estableceremos algunas categorías de ejemplo
    setCategories([
      {
        title: "Empleos",
        subcategories: ["Cocina", "Docencia" /* ... */],
      },
      // Más categorías aquí...
    ]);
  }, []);

  useEffect(() => {
    if (selectedCategory && selectedSubcategory) {
      // Aquí deberías hacer la solicitud a la API para obtener los anuncios
      // que corresponden a la categoría y subcategoría seleccionadas
      // Por ahora, solo estableceremos algunos anuncios de ejemplo
      setAds([
        {
          id: 1,
          title: "Anuncio 1",
          category: selectedCategory,
          subcategory: selectedSubcategory,
        },
        // Más anuncios aquí...
      ]);
    }
  }, [selectedCategory, selectedSubcategory]);

  return (
    <div>
      {selectedCategory && selectedSubcategory ? (
        <AdList anuncios={ads} />
      ) : (
        categories.map((category) => (
          <Category
            key={category.title}
            title={category.title}
            subcategories={category.subcategories}
            onCategoryClick={setSelectedCategory}
            onSubcategoryClick={setSelectedSubcategory}
          />
        ))
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
          <div key={subcategory} onClick={() => onSubcategoryClick(subcategory)}>
            {subcategory}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeFeed;