import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faMicrophone,
  faTimes,
  faThLarge,
  faThList
} from "@fortawesome/free-solid-svg-icons";
import "./searchBar.css";

function SearchBar({ updateSearchTerm, inputRef, toggleViewMode, viewMode }) {
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (isListening) {
      // Simulate voice recognition
      const recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        updateSearchTerm(transcript);
      };
      recognition.start();
      recognition.onend = () => setIsListening(false);
    }
  }, [isListening, updateSearchTerm]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    updateSearchTerm(value);
    // Simulate fetching suggestions
    setSuggestions(
      value ? ["Suggestion 1", "Suggestion 2", "Suggestion 3"] : []
    );
  };

  const handleSearchClick = () => {
    updateSearchTerm(inputValue);
  };

  const clearInput = () => {
    setInputValue("");
    updateSearchTerm("");
    setSuggestions([]);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          value={inputValue}
          onChange={handleSearchChange}
          id="search-bar"
          className="search-input"
          placeholder="Buscar adisos en PublicAdis"
          ref={inputRef}
        />
        {inputValue && (
          <FontAwesomeIcon
            icon={faTimes}
            className="clear-icon"
            onClick={clearInput}
          />
        )}
        <FontAwesomeIcon
          icon={faSearch}
          className="search-icon"
          onClick={handleSearchClick}
        />
      </div>
        <button 
          className="view-toggle-button"
          onClick={toggleViewMode}
          title="Cambiar vista"
        >
          <FontAwesomeIcon icon={viewMode === 'vertical' ? faThLarge : faThList} />
        </button>
    </div>
  );
}

export default SearchBar;