// context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Aquí cambiamos la importación

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // Supongamos que estás guardando el token en localStorage
        const token = localStorage.getItem('token');
        console.log('Token:', token);

        if (token) {
            const decodedToken = jwtDecode(token); // Aquí cambiamos jwt_decode a jwtDecode
            console.log('Decoded token:', decodedToken);
            setCurrentUser(decodedToken);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};