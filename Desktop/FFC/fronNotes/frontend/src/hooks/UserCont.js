// UserCont.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import login from '../services/loginServices';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Intentar recuperar el token desde localStorage al iniciar la aplicación
  const initialToken = localStorage.getItem('token') || null;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(initialToken);
  useEffect(() => {
    // Recuperar token desde localStorage al montar el componente
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

// ...

const loginUser = async (credentials) => {
  try {
    const response = await login(credentials);
    console.log("Acceso autorizado:", response.data);
    
    // Actualizar el estado del usuario y el token
    setUser(response.data);
    setToken(response.data.token);

    // Almacenar el token en localStorage
    localStorage.setItem('token', response.data.token);

    // Devolver la respuesta para que pueda ser utilizada en LoginForm.js
    return response;
  } catch (error) {
    console.error('Error en la solicitud de login:', error.message);
    // Manejar el error según sea necesario
    throw error;
  }
};

  
  
  

// ...


  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ user, token, loginUser, logoutUser, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
