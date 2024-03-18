import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const decoded = jwt_decode(token);
                if (decoded.exp > Date.now() / 1000) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (e) {
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
    }, [localStorage.getItem('token')]);

    return isAuthenticated;
}

export default useAuth;

// Este es el archivo useAuth.js, que define un hook personalizado de React llamado useAuth. Este hook se utiliza para determinar si un usuario está autenticado o no.
// Primero, importo useState y useEffect de React. Estos son hooks que me permiten añadir estado y efectos secundarios a mis componentes funcionales.
// Luego, defino mi hook useAuth. Dentro de este hook, creo una variable de estado isAuthenticated y su función de actualización setIsAuthenticated. Inicialmente, isAuthenticated es false, lo que significa que el usuario no está autenticado.
// Después de eso, utilizo el hook useEffect para ejecutar un efecto secundario cuando el componente se monta. Este efecto secundario verifica si hay un token en el almacenamiento local. Si hay un token, actualizo isAuthenticated a true, lo que significa que el usuario está autenticado. Si no hay un token, actualizo isAuthenticated a false.
// Finalmente, devuelvo isAuthenticated desde mi hook. Esto permite a los componentes que utilizan este hook saber si el usuario está autenticado o no.
// Sugerencias de mejoras:
// Verificación del token: Actualmente, solo estoy verificando si hay un token en el almacenamiento local. Sin embargo, este token podría estar caducado o ser inválido. Debería considerar verificar la validez del token antes de establecer isAuthenticated a true.
// Actualización en tiempo real: Mi hook solo verifica la autenticación cuando el componente se monta. Si el token cambia mientras el componente está montado (por ejemplo, si el usuario inicia o cierra sesión), mi hook no se actualizará. Debería considerar añadir una lógica para manejar esto.