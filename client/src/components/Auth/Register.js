import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/auth/register', formData);
      setSuccessMessage('Registro exitoso. ¡Puedes iniciar sesión ahora!');
      setErrorMessage('');
      if (onClose) onClose(); // Cierra el modal o redirige si es necesario
    } catch (error) {
      setErrorMessage('Error al registrar el usuario. ' + (error.response?.data?.message || error.message));
      setSuccessMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="firstName">Nombres</label>
        <input type="text" name="firstName" id="firstName" placeholder="First Name" onChange={handleChange} value={formData.firstName} />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Apellidos</label>
        <input type="text" name="lastName" id="lastName" placeholder="Last Name" onChange={handleChange} value={formData.lastName} />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Número de celular</label>
        <input type="text" name="phoneNumber" id="phoneNumber" placeholder="Phone Number" onChange={handleChange} value={formData.phoneNumber} />
      </div>
      <div className="form-group">
        <label htmlFor="email">Correo electrónico</label>
        <input type="email" name="email" id="email" placeholder="Email" onChange={handleChange} value={formData.email} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Contraseña</label>
        <input type="password" name="password" id="password" placeholder="Password" onChange={handleChange} value={formData.password} />
      </div>
      <button type="submit" className="auth-btn">Registrarse</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </form>
  );
};

export default RegisterForm;
