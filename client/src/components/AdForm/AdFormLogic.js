import { useRef, useState, useEffect } from "react";

export function useAdFormLogic(agregarAnuncioAlPrincipio) {
  const adTypeRef = useRef();
  const categoryRef = useRef();
  const subCategoryRef = useRef();
  const [adType, setAdType] = useState("");
  const setAdTypeRef = (ref) => {
    adTypeRef.current = ref;
    setAdType(ref.value);
  };
  const titleRef = useRef();
  const descriptionRef = useRef();
  const amountRef = useRef();
  const locationRef = useRef();
  const phoneRef = useRef();
  const phone2Ref = useRef();
  const emailRef = useRef();
  const imageRef = useRef();

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
    return () => {
      if (images) {
        images.forEach((url) => URL.revokeObjectURL(url));
      }
    };
  }, [images]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      validateForm();

      const formData = {
        adType: adTypeRef.current.value,
        category: categoryRef.current ? categoryRef.current.value : "",
        subCategory: subCategoryRef.current
          ? subCategoryRef.current.value
          : "",
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        phone: phoneRef.current.value,
        phone2: phone2Ref.current ? phone2Ref.current.value : "",
        location: locationRef.current ? locationRef.current.value : "",
        email: emailRef.current ? emailRef.current.value : "",
        amount: amountRef.current ? amountRef.current.value : "",
        images: images.map((image) => URL.createObjectURL(image)),
      };

      const adResponse = await fetch("/api/anuncios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!adResponse.ok) {
        throw new Error("Error al crear el anuncio");
      }

      const responseJson = await adResponse.json();
      const anuncio = responseJson.anuncio;
      agregarAnuncioAlPrincipio(anuncio);
      clearForm();
    } catch (error) {
      setError(error.message);
    }
  };

  return {
    adType,
    setAdType,
    adTypeRef,
    categoryRef,
    subCategoryRef,
    setAdTypeRef,
    titleRef,
    descriptionRef,
    amountRef,
    locationRef,
    phoneRef,
    phone2Ref,
    emailRef,
    imageRef,
    images,
    setImages,
    description,
    setDescription,
    error,
    setError,
    clearForm,
    handleImageChange,
    handleDeletePreviewImage,
    handleDescriptionChange,
    handleSubmit,
  };
}
