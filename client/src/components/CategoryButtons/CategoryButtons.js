// CategoryButtons.js
import React, { useState } from 'react';
import './CategoryButtons.css';
import JobsIcon from "../../icons/jobs.png";
import EstateIcon from "../../icons/estate.png";
import CarsIcon from "../../icons/vehicles.png";
import ServiceIcon from "../../icons/services.png";
import ProductIcon from "../../icons/products.png";
import OtherIcon from "../../icons/others.png";

const categoryIcons = {
  Empleos: JobsIcon,
  Inmuebles: EstateIcon,
  Vehicles: CarsIcon,
  Servicios: ServiceIcon,
  Productos: ProductIcon,
  Otros: OtherIcon
};

function CategoryButtons({ categories, handleCategoryClick, handleSubcategoryClick }) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const handleCategorySelection = (categoryKey) => {
    setSelectedCategory(categoryKey);
    handleCategoryClick(categoryKey);
  };

  const handleAllClick = () => {
    setSelectedCategory('Todos');
    handleCategoryClick(null); // Pasar null para manejar "Todos"
  };

  return (
    <div className='category-container'>
      <div className="category-section">
        <div className="category-section-inner scroll-container">
          <button
            onClick={handleAllClick}
            className={`category-button ${selectedCategory === 'Todos' ? 'selected-all' : ''}`}
          >
            Todos
          </button>
          {Object.keys(categories).map((categoryKey) => (
            <button
              key={categoryKey}
              onClick={() => handleCategorySelection(categoryKey)}
              className={`category-button ${selectedCategory === categoryKey ? 'selected-category' : ''}`}
            >
              <img src={categoryIcons[categoryKey]} alt={categoryKey} />
              {categoryKey}
            </button>
          ))}
        </div>
      </div>

      {selectedCategory && categories[selectedCategory] && selectedCategory !== 'Todos' && (
        <div className="subcategory-section">
          <div className="subcategory-section-inner scroll-container">
            {categories[selectedCategory].map((subcategory) => (
              <button
                key={subcategory}
                onClick={() => handleSubcategoryClick(subcategory)}
                className="subcategory-button"
              >
                {subcategory}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryButtons;
