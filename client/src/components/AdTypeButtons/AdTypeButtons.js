import React, { useState } from 'react';
import './AdTypeButtons.css';
import JobsIcon from "../../icons/jobs.png";
import EstateIcon from "../../icons/estate.png";
import CarsIcon from "../../icons/vehicles.png";
import ServiceIcon from "../../icons/services.png";
import ProductIcon from "../../icons/products.png";
import OtherIcon from "../../icons/others.png";
import PlayStoreIcon from "../../icons/playstore.png";
import { adTypes } from './AdTypes'; // Import the ad types

const adTypeIcons = {
  Empleos: JobsIcon,
  Inmuebles: EstateIcon,
  Vehicles: CarsIcon,
  Servicios: ServiceIcon,
  Productos: ProductIcon,
  Otros: OtherIcon
};

function AdTypeButtons({ adType, category, subCategory, handleAdTypeClick, handleCategoryClick, handleSubCategoryClick }) {
  const [selectedAdType, setSelectedAdType] = useState(adType || 'Todos');
  const [selectedCategory, setSelectedCategory] = useState(category || null);

  const handleAdTypeSelection = (adTypeKey) => {
    setSelectedAdType(adTypeKey);
    setSelectedCategory(null); // Reset category when adType changes
    handleAdTypeClick(adTypeKey);
  };

  const handleAllClick = () => {
    setSelectedAdType('Todos');
    setSelectedCategory(null);
    handleAdTypeClick(null); // Pasar null para manejar "Todos"
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    handleCategoryClick(category);
  };

  const handleSubCategorySelection = (subCategory) => {
    handleSubCategoryClick(subCategory);
  };

  return (
    <div className='adType-container'>
      <div className="adType-section">
        <div className="adType-section-inner scroll-container">
          <button
            onClick={handleAllClick}
            className={`adType-button ${selectedAdType === 'Todos' ? 'selected-all' : ''}`}
          >
            Todos
          </button>
          {Object.keys(adTypes).map((adTypeKey) => (
            <button
              key={adTypeKey}
              onClick={() => handleAdTypeSelection(adTypeKey)}
              className={`adType-button ${selectedAdType === adTypeKey ? 'selected-adType' : ''}`}
            >
              <img src={adTypeIcons[adTypeKey]} alt={adTypeKey} />
              {adTypeKey}
            </button>
          ))}
          {/* Botón para descargar la app desde la Play Store */}
          <a href="https://play.google.com/store/apps/details?id=buscadis.publicadis" className="adType-button download-app-button" target='_blank'>
            <img src={PlayStoreIcon} alt="Play Store" />
            Descargar App
          </a>
        </div>
      </div>

      {selectedAdType && adTypes[selectedAdType] && selectedAdType !== 'Todos' && (
        <div className="category-section">
          <div className="category-section-inner scroll-container">
            {Object.keys(adTypes[selectedAdType]).map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelection(category)}
                className={`category-button ${selectedCategory === category ? 'selected-category' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedCategory && adTypes[selectedAdType][selectedCategory] && (
        <div className="subcategory-section">
          <div className="subcategory-section-inner scroll-container">
            {adTypes[selectedAdType][selectedCategory].map((subCategory) => (
              <button
                key={subCategory}
                onClick={() => handleSubCategorySelection(subCategory)}
                className="subcategory-button"
              >
                {subCategory}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdTypeButtons;
