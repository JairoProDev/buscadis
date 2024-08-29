// useAdFormLogic.js
import { useRef, useState, useEffect } from "react";
import { adTypes } from "../AdTypeButtons/AdTypes";

export function useAdFormLogic(addAdToTop) {
  // Referencias a los elementos del formulario
  const adTypeRef = useRef();
  const categoryRef = useRef();
  const subCategoryRef = useRef();
  const sizeRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const amountRef = useRef();
  const locationRef = useRef();
  const phoneRef = useRef();
  const phone2Ref = useRef();
  const emailRef = useRef();
  const imageRef = useRef();

  // Estados para manejar los datos y la lógica del formulario
  const [adType, setAdType] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [size, setSize] = useState("normal");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  // Función para obtener el valor de un campo a partir de su referencia
  const getRefValue = (ref) => (ref.current ? ref.current.value : "");

  // Validación del formulario
  const validateForm = () => {
    if (
      !getRefValue(adTypeRef) ||
      !getRefValue(categoryRef) ||
      !getRefValue(subCategoryRef) ||
      !getRefValue(titleRef) ||
      !getRefValue(descriptionRef) ||
      !getRefValue(phoneRef)
    ) {
      throw new Error("Por favor, rellena todos los campos obligatorios.");
    }
  };

  // Limpiar el formulario después de enviar los datos
  const clearForm = () => {
    adTypeRef.current.value = "";
    categoryRef.current.value = "";
    subCategoryRef.current.value = "";
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    phoneRef.current.value = "";
    if (amountRef.current) amountRef.current.value = "";
    if (locationRef.current) locationRef.current.value = "";
    if (emailRef.current) emailRef.current.value = "";
    if (imageRef.current) imageRef.current.value = "";
    if (phone2Ref.current) phone2Ref.current.value = "";
    sizeRef.current.value = "normal";
    setImages([]);
  };

  // Manejar el cambio de las imágenes
  const handleImageChange = (event) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setImages(filesArray);
    }
  };

  // Eliminar una imagen de la vista previa
  const handleDeletePreviewImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Manejar el cambio de la descripción para ajustar el tamaño del textarea
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    event.target.style.height = "inherit";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  // Limpiar URLs de las imágenes cuando cambian
  useEffect(() => {
    if (images) {
      images.forEach((url) => URL.revokeObjectURL(url));
    }
  }, [images]);

  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      validateForm();

      const formData = {
        adType: getRefValue(adTypeRef),
        category: getRefValue(categoryRef),
        subCategory: getRefValue(subCategoryRef),
        title: getRefValue(titleRef),
        description: getRefValue(descriptionRef),
        phone: getRefValue(phoneRef),
        phone2: getRefValue(phone2Ref),
        location: getRefValue(locationRef),
        email: getRefValue(emailRef),
        amount: getRefValue(amountRef),
        size: getRefValue(sizeRef),
        images: images.map((image) => URL.createObjectURL(image)),
      };

      console.log("Form Data:", formData);

      // Determina la URL de la API basada en el tipo de anuncio
      let apiEndpoint;
      switch (formData.adType) {
        case "Empleos":
          apiEndpoint = "/api/jobs";
          break;
        case "Inmuebles":
          apiEndpoint = "/api/realestates";
          break;
        case "Vehiculos":
          apiEndpoint = "/api/vehicles";
          break;
        case "Servicios":
          apiEndpoint = "/api/services";
          break;
        case "Productos":
          apiEndpoint = "/api/products";
          break;
        default:
          throw new Error("Tipo de anuncio no válido");
      }

      console.log("API Endpoint:", apiEndpoint);

      const adResponse = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!adResponse.ok) {
        const errorText = await adResponse.text();
        throw new Error(`Error al crear el anuncio: ${errorText}`);
      }

      const responseJson = await adResponse.json();
      console.log("Anuncio creado:", responseJson);
      const anuncio = responseJson.anuncio || responseJson.job || responseJson.realestate || responseJson.vehicle || responseJson.service || responseJson.product;
      addAdToTop(anuncio);
      clearForm();
    } catch (error) {
      setError(error.message);
      console.error("Error details:", error);
    }
  };

  // Actualizar las categorías y subcategorías cuando se selecciona un tipo de anuncio
  useEffect(() => {
    if (adType && adTypes.hasOwnProperty(adType)) {
      setCategories(Object.keys(adTypes[adType]));
      setSubCategories([]);
    } else {
      setCategories([]);
      setSubCategories([]);
    }
  }, [adType]);

  // Manejar el cambio de categoría y actualizar las subcategorías
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSubCategories(adTypes[adType][selectedCategory] || []);
  };

  // Retornar todos los estados y funciones necesarias para el componente del formulario
  return {
    adType,
    setAdType,
    adTypeRef,
    categoryRef,
    subCategoryRef,
    titleRef,
    descriptionRef,
    amountRef,
    locationRef,
    phoneRef,
    phone2Ref,
    emailRef,
    imageRef,
    sizeRef,
    images,
    setImages,
    description,
    setDescription,
    size,
    setSize,
    error,
    setError,
    clearForm,
    handleImageChange,
    handleDeletePreviewImage,
    handleDescriptionChange,
    handleSubmit,
    categories,
    subCategories,
    handleCategoryChange,
  };
}
