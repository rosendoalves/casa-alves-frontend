import { useState, useEffect } from 'react';

const TOKEN_EXPIRATION_HOURS = process.env.REACT_APP_TOKEN_EXPIRATION_HOURS || 12;

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
      try {
        const storedToken = JSON.parse(tokenString);
        // Verificar si el token ha expirado
        if (Date.now() > storedToken.expiresAt) {
          localStorage.removeItem('token');
          return null;
        }
        return storedToken;
      } catch (error) {
        console.error("Error parsing token from localStorage:", error);
      }
    }
    return null;
  };

  const [token, setToken] = useState(getToken);

  const saveToken = userToken => {
    if (userToken) {
      // Establecer la propiedad 'expiresAt' según el tiempo de expiración configurado
      const expiresAt = Date.now() + TOKEN_EXPIRATION_HOURS * 60 * 60 * 1000;
      const tokenWithExpiration = { userToken, expiresAt };
      localStorage.setItem('token', JSON.stringify(tokenWithExpiration));
      setToken(tokenWithExpiration);
    } else {
      localStorage.removeItem('token');
      setToken(null);
    }
  };

  useEffect(() => {
    // Configurar el temporizador para borrar el token después de su expiración
    const intervalId = setInterval(() => {
      const storedToken = getToken();
      if (storedToken && Date.now() > storedToken.expiresAt) {
        localStorage.removeItem('token');
        setToken(null);
      }
    }, 60 * 60 * 1000); // Verificar cada hora si el token ha expirado

    return () => clearInterval(intervalId);
  }, []);

  return {
    setToken: saveToken,
    getToken,
    token
  };
}
