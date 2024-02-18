// services/packService.js
import axios from 'axios';

const baseUrl = 'https://opocheck.onrender.com/api/packs'; // Reemplaza con la URL de tu backend

const packService = {
  createPack: async (packData) => {
    try {
      const response = await axios.post(baseUrl, packData);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al crear el paquete';
    }
  },

  getUserPack: async (userId) => {
    try {
      const response = await axios.get(`${baseUrl}/user`, { data: { userId } });
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al obtener el paquete del usuario';
    }
  },

  // Puedes implementar métodos para actualizar y eliminar paquetes según sea necesario
};

export default packService;
