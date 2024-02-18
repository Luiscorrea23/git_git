import axios from 'axios';

const baseUrl = 'https://opocheck.onrender.com/api/document'; // Reemplaza con la URL de tu backend

const DocumentService = {
  generateDocument: async (iaResponseId) => {
    try {
      const response = await axios.post(`${baseUrl}/generate-document`, { iaResponseId });
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al generar el documento';
    }
  }
};

export default DocumentService;