import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
      try {
        return JSON.parse(tokenString);
      } catch (error) {
        console.error("Error parsing token from localStorage:", error);
      }
    }
    return '';
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    if (userToken) {
      localStorage.setItem('token', JSON.stringify(userToken));
    } else {
      localStorage.removeItem('token');
    }
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    getToken,
    token
  }
}