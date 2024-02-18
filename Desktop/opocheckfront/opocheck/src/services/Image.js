import axios from 'axios';

const baseUrl = 'https://opocheck.onrender.com/api/images'; // Reemplaza con la URL de tu backend

const ImageService = {
  uploadPdf: async (pdfFile) => {
    try {
      const formData = new FormData();
      formData.append('pdf', pdfFile);

      const response = await axios.post(`${baseUrl}/pdf`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al subir PDF';
    }
  },

  uploadImage: async (imageFiles) => {
    try {
      const formData = new FormData();
      imageFiles.forEach((file) => {
        formData.append('files', file);
      });

      const response = await axios.post(`${baseUrl}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al subir imagen';
    }
  },

  getAllImages: async () => {
    try {
      const response = await axios.get(`${baseUrl}`);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al obtener todas las imágenes';
    }
  },

  getImageById: async (imageId) => {
    try {
      const response = await axios.get(`${baseUrl}/${imageId}`);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al obtener imagen por ID';
    }
  },

  deleteImage: async (imageId) => {
    try {
      const response = await axios.delete(`${baseUrl}/${imageId}`);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al eliminar imagen';
    }
  }
};

export default ImageService;
