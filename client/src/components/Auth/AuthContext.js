import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Cargar el token JWT desde el localStorage y obtener el usuario si está autenticado
    const token = localStorage.getItem('token');
    if (token) {
      // Lógica para decodificar el token y establecer el usuario (puedes usar una librería como jwt-decode)
      setUser({ name: 'Usuario' }); // Simulación, normalmente aquí iría la información del usuario
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token); // Guardar el token
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
