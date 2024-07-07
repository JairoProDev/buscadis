// useAdFormLogic.js
import { useRef, useState, useEffect } from "react";
import { adTypes } from "../AdTypeButtons/AdTypes";

export function useAdFormLogic(agregarAnuncioAlPrincipio) {
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

  const [adType, setAdType] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [size, setSize] = useState("normal");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const getRefValue = (ref) => (ref.current ? ref.current.value : "");

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

  const clearForm = () => {
    adTypeRef.current.value = "";
    categoryRef.current.value = "";
    subCategoryRef.current.value = "";
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    phoneRef.current.value = "";
    if (amountRef.current) {
      amountRef.current.value = "";
    }
    if (locationRef.current) {
      locationRef.current.value = "";
    }
    if (emailRef.current) {
      emailRef.current.value = "";
    }
    if (imageRef.current) {
      imageRef.current.value = "";
    }
    if (phone2Ref.current) {
      phone2Ref.current.value = "";
    }
    sizeRef.current.value = "normal";
    setImages([]);
  };

  const handleImageChange = (event) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setImages(filesArray);
    }
  };

  const handleDeletePreviewImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    event.target.style.height = "inherit";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  useEffect(() => {
    if (images) {
      images.forEach((url) => URL.revokeObjectURL(url));
    }
  }, [images]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      validateForm();
  
      const formData = {
        adType: adTypeRef.current.value,
        category: categoryRef.current ? categoryRef.current.value : "",
        subCategory: subCategoryRef.current ? subCategoryRef.current.value : "",
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        phone: phoneRef.current.value,
        phone2: phone2Ref.current ? phone2Ref.current.value : "",
        location: locationRef.current ? locationRef.current.value : "",
        email: emailRef.current ? emailRef.current.value : "",
        amount: amountRef.current ? amountRef.current.value : "",
        size: sizeRef.current ? sizeRef.current.value : "normal",
        images: images.map((image) => URL.createObjectURL(image)),
      };

    // Log formData to ensure it's correctly formatted
    console.log("Form Data:", formData);

      const adResponse = await fetch("/api/anuncios", {
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
      const anuncio = responseJson.anuncio;
      agregarAnuncioAlPrincipio(anuncio);
      clearForm();
    } catch (error) {
      setError(error.message);
      console.error("Error details:", error); // Log the error details
    }
  };

  useEffect(() => {
    if (adType) {
      setCategories(Object.keys(adTypes[adType] || {}));
      setSubCategories([]);
    }
  }, [adType]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSubCategories(adTypes[adType][selectedCategory] || []);
  };

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
