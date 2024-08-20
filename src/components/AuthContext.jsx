import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const login = async (userData) => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const data = await response.json();
      Cookies.set('authToken', data.token, { expires: 7 });
      setAuthToken(data.token);
    } catch (error) {
      console.error('Failed to login user:', error);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove('authToken');
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};