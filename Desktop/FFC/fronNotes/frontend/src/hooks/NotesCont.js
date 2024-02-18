// NotesProvider.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import * as services from '../services/services'; 
import { useUser } from './UserCont';


const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const { token } = useUser(); // Consumir el token desde useUser

  const getNotes = async () => {
    try {
      if (token) {
        console.log('Token enviado en la solicitud:', token);
        const response = await services.getData(token);
        console.log('Respuesta del servicio getData:', response); // Agrega esta línea
        setNotes(response.data); // Asumo que los blogs están en la propiedad 'data' de la respuesta
      }
    } catch (error) {
      console.error('Error getting data:', error);
    }
  };
  
  

  // Llamada inicial cuando se tiene el token
  useEffect(() => {
    if (token) {
      console.log('Llamando a getBlogs...');
      setNotes();
    }
  }, [token]);

  return (
    <NotesContext.Provider value={{ notes, getNotes, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useBlogs must be used within a BlogsProvider');
  }
  return context;
};

export { NotesProvider, useNotes };
