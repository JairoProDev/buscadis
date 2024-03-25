// context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
  
    let decodedToken;
    if (token) {
      decodedToken = jwtDecode(token);
      console.log('Decoded token:', decodedToken);
      setCurrentUser(decodedToken);
    }
    const fetchUser = async () => {
        try {
          const response = await fetch(`/api/auth/users/${decodedToken.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
              if (!response.ok) {
                throw new Error("Error al cargar la información del usuario");
              }
      
              const data = await response.json();
              setCurrentUser(data);
            } catch (error) {
              console.error(error);
            }
          };
      
          if (decodedToken && decodedToken.id) {
            fetchUser();
          }
        }, []);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
        {children}
        </AuthContext.Provider>
    );
};