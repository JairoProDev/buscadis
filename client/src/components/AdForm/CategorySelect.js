import React from "react";

const CategorySelect = ({ categories, categoryRef, handleCategoryChange }) => (
  <>
    <label htmlFor="category">Categoría:</label>
    <select
      id="category"
      name="category"
      required
      ref={categoryRef}
      className="adForm-input"
      onChange={handleCategoryChange}
    >
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  </>
);

export default CategorySelect;
