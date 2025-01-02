import React, { useState } from 'react';
import './AdTypeButtons.css';
import JobsIcon from "../../assets/icons/jobs.png";
import EstateIcon from "../../assets/icons/estate.png";
import VehiclesIcon from "../../assets/icons/vehicles.png";
import ServiceIcon from "../../assets/icons/services.png";
import ProductIcon from "../../assets/icons/products.png";
import BusinessIcon from "../../assets/icons/business.png";
import EventosIcon from "../../assets/icons/events.png";
import TurismoIcon from "../../assets/icons/tourism.png";
import EducacionIcon from "../../assets/icons/education.png";
import MascotasIcon from "../../assets/icons/pets.png";
import PlayStoreIcon from "../../assets/icons/playstore.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { adTypes } from './AdTypes';
import { motion, AnimatePresence } from 'framer-motion';

const adTypeIcons = {
  Empleos: JobsIcon,
  Inmuebles: EstateIcon,
  Vehiculos: VehiclesIcon,
  Servicios: ServiceIcon,
  Productos: ProductIcon,
  Eventos: EventosIcon,
  Turismo: TurismoIcon,
  Educación: EducacionIcon,
  Mascotas: MascotasIcon,
  Negocios: BusinessIcon,
};

const adTypeLabels = {
  Empleos: 'Empleos',
  Inmuebles: 'Inmuebles',
  Vehiculos: 'Vehículos',
  Servicios: 'Servicios',
  Productos: 'Productos',
  Eventos: 'Eventos',
  Turismo: 'Turismo',
  Educación: 'Educación',
  Mascotas: 'Mascotas',
  Negocios: 'Negocios',
};

function AdTypeButtons({ adType, category, subCategory, handleAdTypeClick, handleCategoryClick, handleSubCategoryClick, getAds }) {
  const [selectedAdType, setSelectedAdType] = useState(adType || 'Todos');
  const [selectedCategory, setSelectedCategory] = useState(category || null);
  const [isSelected, setIsSelected] = useState(false); // Nuevo estado para la animación

  function handleAdTypeSelection(adTypeKey) {
    setSelectedAdType(adTypeKey);
    setIsSelected(true); // Activar la animación
    setSelectedCategory(null);
    handleAdTypeClick(adTypeKey);
    if (getAds) {
      getAds(adTypeKey, null, null);  // Cargar anuncios según el nuevo tipo seleccionado
    }
  }

  function handleBack() {
    setIsSelected(false);
    setSelectedAdType('Todos');
    setSelectedCategory(null); // Restablecer la categoría seleccionada
    handleAdTypeClick('Todos');
    if (getAds) {
      getAds('Todos', null, null); // Cargar todos los anuncios
    }
  }

  // Generar breadcrumb
  const breadcrumbPath = [];
  breadcrumbPath.push('Inicio');
  if (selectedAdType !== 'Todos') breadcrumbPath.push(adTypeLabels[selectedAdType]);
  if (selectedCategory) breadcrumbPath.push(selectedCategory);
  if (subCategory) breadcrumbPath.push(subCategory);

  // Variantes para Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.6 } },
  };

  const selectedVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.6 } },
  };

  return (
    <div className='adType-container'>
      <div className="breadcrumb">
        <button className='breadcrumb-back-button' onClick={handleBack} aria-label="Volver">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        {breadcrumbPath.map((item, index) => (
          <React.Fragment key={index}>
            <span>{item}</span>
            {index < breadcrumbPath.length - 1 && <span className="breadcrumb-separator">/</span>}
          </React.Fragment>
        ))}
      </div>
      <AnimatePresence>
        {!isSelected ? (
          <motion.div
            className='adType-section'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="adType-section-inner scroll-container">
              <a
                href="https://play.google.com/store/apps/details?id=buscadis.publicadis"
                className="adType-button download-app-button"
                target='_blank'
                rel='noreferrer'
              >
                <img src={PlayStoreIcon} alt="Play Store" className="download-icon" />
                <span className="download-text">App</span>
              </a>
              {Object.keys(adTypeIcons).map((adTypeKey) => (
                <button
                  key={adTypeKey}
                  onClick={() => handleAdTypeSelection(adTypeKey)}
                  className={`adType-button ${selectedAdType === adTypeKey ? 'selected-adType' : ''}`}
                  data-ad-type={adTypeKey}
                  aria-label={`Seleccionar tipo de anuncio ${adTypeLabels[adTypeKey]}`}
                >
                  <img src={adTypeIcons[adTypeKey]} alt={adTypeKey} className="adType-icon" />
                  <span className="adType-label">{adTypeLabels[adTypeKey]}</span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            className='selected-title'
            variants={selectedVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <img src={adTypeIcons[selectedAdType]} alt={selectedAdType} className="selected-icon" />
            <h1 className="selected-label">{adTypeLabels[selectedAdType]}</h1>
          </motion.div>
        )}
      </AnimatePresence>

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
                aria-label={`Seleccionar categoría ${category}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedCategory && adTypes[selectedAdType] && adTypes[selectedAdType][selectedCategory] && (
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
                aria-label={`Seleccionar subcategoría ${subCategory}`}
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