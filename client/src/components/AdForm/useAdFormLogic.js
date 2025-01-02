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
    console.log("Valores del formulario:", {
      adType: getRefValue(adTypeRef),
      category: getRefValue(categoryRef),
      subCategory: getRefValue(subCategoryRef),
      title: getRefValue(titleRef),
      description: getRefValue(descriptionRef),
      phone: getRefValue(phoneRef),
    });

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
    console.log("Tipo de adiso:", adType);

    try {
      // Validar el formulario
      validateForm();

      // Crear un objeto FormData para manejar las imágenes
      const formData = new FormData();
      formData.append("adType", getRefValue(adTypeRef));
      formData.append("category", getRefValue(categoryRef));
      formData.append("subCategory", getRefValue(subCategoryRef));
      formData.append("title", getRefValue(titleRef));
      formData.append("description", getRefValue(descriptionRef));
      formData.append("phone", getRefValue(phoneRef));
      formData.append("phone2", getRefValue(phone2Ref));
      formData.append("location", getRefValue(locationRef));
      formData.append("email", getRefValue(emailRef));
      formData.append("amount", getRefValue(amountRef));
      formData.append("size", getRefValue(sizeRef));

      let imageUrls = [];

      // Añadir imágenes al FormData
      images.forEach((image) => formData.append("image", image));

      // Si hay imágenes, subirlas al backend para obtener las URLs de Cloudinary
      if (images.length > 0) {
        const uploadResponse = await fetch("/api/images/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          const errorText = await uploadResponse.text();
          throw new Error(`Error al subir las imágenes: ${errorText}`);
        }

        const data = await uploadResponse.json();
        imageUrls = data.imageUrls; // Obtener las URLs de las imágenes subidas
      }

      // Preparar los datos para enviar el adiso
      const adData = {
        adType: getRefValue(adTypeRef),
        category: getRefValue(categoryRef),
        subCategory: getRefValue(subCategoryRef),
        title: getRefValue(titleRef),
        description: getRefValue(descriptionRef),
        phone: getRefValue(phoneRef),
        phone2: getRefValue(phone2Ref) || undefined,
        location: getRefValue(locationRef) || undefined,
        email: getRefValue(emailRef) || undefined,
        amount: getRefValue(amountRef) || undefined,
        size: getRefValue(sizeRef),
        images: imageUrls.length > 0 ? imageUrls : [], // Usar URLs de las imágenes subidas, o un array vacío si no hay imágenes
      };

      // Determinar la URL de la API basada en el tipo de adiso
      let apiEndpoint;
      switch (adData.adType) {
        case "Empleos":
          apiEndpoint = "/api/jobs";
          break;
        case "Inmuebles":
          apiEndpoint = "/api/realEstate";
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
          throw new Error("Tipo de adiso no válido");
      }

      const adResponse = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adData),
      });

      if (!adResponse.ok) {
        const errorText = await adResponse.text();
        throw new Error(`Error al crear el adiso: ${errorText}`);
      }

      const createdAd = await adResponse.json();
      console.log("Anuncio creado:", createdAd);

      const createdAdData =
        createdAd.adiso ||
        createdAd.job ||
        createdAd.realEstate ||
        createdAd.vehicle ||
        createdAd.service ||
        createdAd.product;

      if (!createdAdData) {
        console.error("Ad data is missing or undefined", createdAd);
        setError("Error: Ad data is missing.");
        return; // Exit early if there's an issue with the ad data
      }

      addAdToTop(createdAdData); // Now you are sure that `createdAdData` exists
      clearForm();
    } catch (error) {
      setError(error.message);
      console.error("Error:", error);
    }
  };

  // Actualizar las categorías y subcategorías cuando se selecciona un tipo de adiso
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
