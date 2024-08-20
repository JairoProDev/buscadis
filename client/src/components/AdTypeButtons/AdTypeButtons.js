import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdTypeButtons.css';
import JobsIcon from "../../assets/icons/jobs.png";
import EstateIcon from "../../assets/icons/estate.png";
import CarsIcon from "../../assets/icons/vehicles.png";
import ServiceIcon from "../../assets/icons/services.png";
import ProductIcon from "../../assets/icons/products.png";
import OtherIcon from "../../assets/icons/others.png";
import BusinessIcon from "../../assets/icons/business.png";
import PlayStoreIcon from "../../assets/icons/playstore.png";
import { adTypes } from './AdTypes';

const adTypeIcons = {
  Empleos: JobsIcon,
  Inmuebles: EstateIcon,
  Vehicles: CarsIcon,
  Servicios: ServiceIcon,
  Productos: ProductIcon,
  Otros: OtherIcon,
  Negocios: BusinessIcon,
};

function AdTypeButtons({ adType, category, subCategory, handleAdTypeClick, handleCategoryClick, handleSubCategoryClick, getAds }) {
  const navigate = useNavigate();
  const [selectedAdType, setSelectedAdType] = useState(adType || 'Todos');
  const [selectedCategory, setSelectedCategory] = useState(category || null);

  function handleAdTypeSelection(adTypeKey) {
    setSelectedAdType(adTypeKey);
    setSelectedCategory(null);
    handleAdTypeClick(adTypeKey);
    if (getAds) {
      console.log("Llamando a getAds para el tipo:", adTypeKey);
      getAds(adTypeKey, null, null);  // Cargar anuncios según el nuevo tipo seleccionado
    }
  }

  const handleAllClick = () => {
    setSelectedAdType('Todos');
    setSelectedCategory(null);
    handleAdTypeClick('Todos');
    navigate('/');
    if (getAds) {
      getAds(null, null, null);  // Cargar todos los anuncios
    }
  };

  return (
    <div className='adType-container'>
      <div className="adType-section">
        <div className="adType-section-inner scroll-container">
          <button
            onClick={handleAllClick}
            className={`adType-button ${selectedAdType === 'Todos' ? 'selected-all' : ''}`}
          >
            Todo
          </button>
          <a href="https://play.google.com/store/apps/details?id=buscadis.publicadis" className="adType-button download-app-button" target='_blank' rel='noreferrer'>
            <img src={PlayStoreIcon} alt="Play Store" />
          </a>
          {Object.keys(adTypeIcons).map((adTypeKey) => (
            <button
              key={adTypeKey}
              onClick={() => handleAdTypeSelection(adTypeKey)}
              className={`adType-button ${selectedAdType === adTypeKey ? `${adTypeKey.toLowerCase()}-selected` : ''}`}
              data-ad-type={adTypeKey}
            >
              <img src={adTypeIcons[adTypeKey]} alt={adTypeKey} />
              {adTypeKey}
            </button>
          ))}
        </div>
      </div>

      {selectedAdType && adTypes[selectedAdType] && selectedAdType !== 'Todos' && (
        <div className="category-section">
          <div className="category-section-inner scroll-container">
            {Object.keys(adTypes[selectedAdType]).map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  handleCategoryClick(category);
                  if (getAds) {
                    getAds(selectedAdType, category, null);  // Cargar anuncios de la categoría seleccionada
                  }
                }}
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
                onClick={() => {
                  handleSubCategoryClick(subCategory);
                  if (getAds) {
                    getAds(selectedAdType, selectedCategory, subCategory);  // Cargar anuncios de la subcategoría seleccionada
                  }
                }}
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
