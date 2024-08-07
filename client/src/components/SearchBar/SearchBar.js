// SearchBar.js
import React, { useState, useEffect, useRef } from "react";
import "./searchbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMicrophone } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ updateSearchTerm, inputRef }) {
  console.log('inputRef in SearchBar:', inputRef); // Log para verificar la referencia

  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleSearchChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    updateSearchTerm(newValue);
  };

  const handleSearchClick = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Enfoca el campo de entrada cuando se hace clic en la lupa
    }
  };

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.error("El navegador no soporta la API de reconocimiento de voz.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          const newValue = event.results[i][0].transcript;
          setInputValue(newValue);
          updateSearchTerm(newValue);
        }
      }
    };

    if (isListening) {
      recognition.start();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening, updateSearchTerm]);

  return (
    <div className="search-bar">
      <input
        type="text"
        value={inputValue}
        onChange={handleSearchChange}
        id="search-bar"
        placeholder="Buscar avisos en PublicAdis"
        ref={inputRef} // Asigna la referencia al campo de entrada
      />
      <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={handleSearchClick} />
      <button
        className="microphone-icon"
        onClick={() => setIsListening(!isListening)}
      >
        <FontAwesomeIcon icon={faMicrophone} />
      </button>
    </div>
  );
}

export default SearchBar;
