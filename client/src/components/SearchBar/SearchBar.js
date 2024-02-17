// SearchBar.js

import React from "react";

function SearchBar() {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar en PublicAdis"
        id="search-input"
      />
    </div>
  );
}

export default SearchBar;
