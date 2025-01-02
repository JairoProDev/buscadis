import React from "react";

const AdTypeSelect = ({ adTypeRef, setAdType }) => (
  <>
    <label htmlFor="adType">Tipo de adiso:</label>
    <select
      id="adType"
      name="adType"
      required
      ref={adTypeRef}
      className="adForm-input"
      onChange={(e) => setAdType(e.target.value)}
    >
      <option value="Empleos">Empleos</option>
      <option value="Inmuebles">Inmuebles</option>
      <option value="Vehiculos">Vehículos</option>
      <option value="Servicios">Servicios</option>
      <option value="Productos">Productos</option>
      <option value="Negocios">Negocios</option>
      <option value="Otros">Otros</option>
    </select>
  </>
);

export default AdTypeSelect;
