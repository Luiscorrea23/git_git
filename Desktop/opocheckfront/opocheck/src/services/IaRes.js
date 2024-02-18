import axios from 'axios';

const baseUrl = 'https://opocheck.onrender.com/api/iaRes'; // Reemplaza con la URL de tu backend

const IAResponseService = {
  getAllIAResponses: async () => {
    try {
      const response = await axios.get(`${baseUrl}`);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al obtener respuestas de IA';
    }
  },

  getIAResponseById: async (iaResponseId) => {
    try {
      const response = await axios.get(`${baseUrl}/${iaResponseId}`);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al obtener respuesta de IA por ID';
    }
  },

  processIAResponse: async (answerId) => {
    try {
      const response = await axios.post(`${baseUrl}`, { answerId });
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al procesar respuesta de IA';
    }
  },

  deleteIAResponse: async (iaResponseId) => {
    try {
      const response = await axios.delete(`${baseUrl}/${iaResponseId}`);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al eliminar respuesta de IA por ID';
    }
  }
};

export default IAResponseService;
