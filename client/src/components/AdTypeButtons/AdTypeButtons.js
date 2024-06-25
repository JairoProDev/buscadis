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

function AdTypeButtons({ adType, category, subCategory, handleAdTypeClick, handleCategoryClick, handleSubCategoryClick }) {
  const navigate = useNavigate();
  const [selectedAdType, setSelectedAdType] = useState(adType || 'Todos');
  const [selectedCategory, setSelectedCategory] = useState(category || null);

  const handleAdTypeSelection = (adTypeKey) => {
    setSelectedAdType(adTypeKey);
    setSelectedCategory(null);
    handleAdTypeClick(adTypeKey);
  };
const handleAllClick = () => {
  // Restablecer el tipo de anuncio seleccionado a 'Todos' y la categoría seleccionada a null
  setSelectedAdType('Todos');
  setSelectedCategory(null);
  // Si es necesario, llamar a las funciones de manejo para reflejar el cambio
  // Por ejemplo, si hay alguna acción que deba realizarse cuando se selecciona 'Todos'
  handleAdTypeClick('Todos');
  // Opcionalmente, navegar a la ruta raíz o a una ruta específica que muestre todos los anuncios
  navigate('/');
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
          <a href="https://play.google.com/store/apps/details?id=buscadis.publicadis" className="adType-button download-app-button" target='_blank'>
            <img src={PlayStoreIcon} alt="Play Store" />
            Bajar App
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
