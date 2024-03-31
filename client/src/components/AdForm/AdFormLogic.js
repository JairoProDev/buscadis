// AdFormLogic.js
import { useRef, useState, useEffect } from "react";

export function useAdFormLogic(agregarAnuncioAlPrincipio) {
    const categoryRef = useRef();
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

    const clearForm = () => {
        categoryRef.current.value = "";
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
        setImages(null);
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

        // Validar los campos del formulario antes de enviarlos
        if (
            !categoryRef.current.value ||
            !titleRef.current.value ||
            !descriptionRef.current.value ||
            !phoneRef.current.value
        ) {
            setError("Por favor, rellena todos los campos obligatorios.");
            return;
        }
        const formData = new FormData();
        // Verificar si 'images' existe antes de intentar llamar a 'forEach' en él
        if (images) {
            images.forEach((image) => {
                formData.append('image', image);
            });

            images.forEach((url) => URL.revokeObjectURL(url)); // Revocar las URLs de objeto después de cargar las imágenes
        }
        formData.append("category", categoryRef.current.value);
        formData.append("title", titleRef.current.value);
        formData.append("description", descriptionRef.current.value);
        formData.append("phone", phoneRef.current.value);
        formData.append("phone2", phone2Ref.current ? phone2Ref.current.value : "");
        formData.append(
            "location",
            locationRef.current ? locationRef.current.value : ""
        );
        formData.append("email", emailRef.current ? emailRef.current.value : "");
        formData.append("amount", amountRef.current ? amountRef.current.value : "");

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

            console.log({
                category: categoryRef.current.value,
                title: titleRef.current.value,
                description: descriptionRef.current.value,
                amount: amountRef.current ? amountRef.current.value : "",
                location: locationRef.current ? locationRef.current.value : "",
                phone: phoneRef.current.value,
                phone2: phone2Ref.current ? phone2Ref.current.value : "",
                email: emailRef.current ? emailRef.current.value : "",
                images: imageUrls,
              });

            const adResponse = await fetch("/api/anuncios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    category: categoryRef.current.value,
                    title: titleRef.current.value,
                    description: descriptionRef.current.value,
                    amount: amountRef.current && amountRef.current.value !== "" ? amountRef.current.value : null,
                    location: locationRef.current && locationRef.current.value !== "" ? locationRef.current.value : null,
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
    };

    return {
        categoryRef,
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