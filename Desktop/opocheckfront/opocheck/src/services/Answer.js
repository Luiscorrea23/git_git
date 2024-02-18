import axios from 'axios';

const baseUrl = 'https://opocheck.onrender.com/api/answers'; // Reemplaza con la URL de tu backend

const AnswerService = {
  createAnswer: async (userId, imageId, text) => {
    try {
      const response = await axios.post(baseUrl, {
        userId,
        imageId,
        text
      });
      return response.data;
    } catch (error) {
      throw error.response.data.message || 'Error al crear respuesta';
    }
  },

  getAllAnswers: async () => {
    try {
      const response = await axios.get(baseUrl);
      return response.data;
    } catch (error) {
      throw error.response.data.message || 'Error al obtener respuestas';
    }
  },

  getAnswerById: async (answerId) => {
    try {
      const response = await axios.get(`${baseUrl}/${answerId}`);
      return response.data;
    } catch (error) {
      throw error.response.data.message || 'Error al obtener respuesta';
    }
  }
};

export default AnswerService;
