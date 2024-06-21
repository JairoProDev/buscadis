import React from "react";

const SubCategorySelect = ({ subCategories, subCategoryRef }) => (
  <>
    <label htmlFor="subCategory">Subcategoría:</label>
    <select
      id="subCategory"
      name="subCategory"
      required
      ref={subCategoryRef}
      className="adForm-input"
    >
      {subCategories.map((subCat) => (
        <option key={subCat} value={subCat}>
          {subCat}
        </option>
      ))}
    </select>
  </>
);

export default SubCategorySelect;
