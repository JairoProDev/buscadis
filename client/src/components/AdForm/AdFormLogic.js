// AdFormLogic.js
import { useRef, useState, useEffect } from "react";

export function useAdFormLogic(agregarAnuncioAlPrincipio) {
    const categoryRef = useRef();
    const subcategoryRef = useRef();
    const [category, setCategory] = useState("");
    const setCategoryRef = (ref) => {
        categoryRef.current = ref;
        setCategory(ref.value);
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

    const getRefValue = (ref) => ref.current ? ref.current.value : "";

    const validateForm = () => {
        if (
            !getRefValue(categoryRef) ||
            !getRefValue(titleRef) ||
            !getRefValue(descriptionRef) ||
            !getRefValue(phoneRef)
        ) {
            throw new Error("Por favor, rellena todos los campos obligatorios.");
        }
    };

    const clearForm = () => {
        categoryRef.current.value = "";
        subcategoryRef.current.value = "";
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
            // Revocar las URLs de las imágenes cuando el componente se desmonta
            if (images) {
                images.forEach((url) => URL.revokeObjectURL(url));
            }
        };
    }, [images]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            validateForm();

        const formData = new FormData();
        // Verificar si 'images' existe antes de intentar llamar a 'forEach' en él
        if (images) {
            images.forEach((image) => {
                formData.append('image', image);
            });

            images.forEach((url) => URL.revokeObjectURL(url)); // Revocar las URLs de objeto después de cargar las imágenes
        }

        formData.append("category", categoryRef.current.value);
        if (subcategoryRef.current) {
            formData.append("subcategory", subcategoryRef.current.value);
        }
        formData.append("title", titleRef.current.value);
        formData.append("description", descriptionRef.current.value);
        formData.append("phone", phoneRef.current.value);

        if (phone2Ref.current && phone2Ref.current.value !== "") {
            formData.append("phone2", phone2Ref.current.value);
        }

        if (locationRef.current && locationRef.current.value !== "") {
            formData.append("location", locationRef.current.value);
        }

        if (emailRef.current && emailRef.current.value !== "") {
            formData.append("email", emailRef.current.value);
        }

        if (amountRef.current && amountRef.current.value !== "") {
            formData.append("amount", amountRef.current.value);
        }

        try {
            const response = await fetch("/api/images/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Error al cargar las imágenes");
            }

            const data = await response.json();
            const imageUrls = data.imageUrls;

            const adResponse = await fetch("/api/anuncios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    category: categoryRef.current.value,
                    subcategory: subcategoryRef.current ? subcategoryRef.current.value : "",
                    title: titleRef.current.value,
                    description: descriptionRef.current.value,
                    amount: amountRef.current && amountRef.current.value !== "" ? amountRef.current.value : "",
                    location: locationRef.current && locationRef.current.value !== "" ? locationRef.current.value : "",
                    phone: phoneRef.current.value,
                    phone2: phone2Ref.current ? phone2Ref.current.value : "",
                    email: emailRef.current ? emailRef.current.value : "",
                    images: imageUrls,
                }),
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
    } catch (error) {
        setError(error.message);
    }
};

    return {
        category,
        setCategory,
        categoryRef,
        subcategoryRef,
        setCategoryRef,
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
