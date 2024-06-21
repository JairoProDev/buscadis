import React from "react";

const FormInput = React.forwardRef(
  ({ id, label, type = "text", placeholder, required, isTextArea, handleDescriptionChange }, ref) => (
    <>
      <label htmlFor={id}>{label}:</label>
      {isTextArea ? (
        <textarea
          id={id}
          name={id}
          ref={ref}
          placeholder={placeholder}
          required={required}
          className="adForm-input"
          onInput={handleDescriptionChange}
        ></textarea>
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          ref={ref}
          placeholder={placeholder}
          required={required}
          className="adForm-input"
        />
      )}
    </>
  )
);

export default FormInput;
