// noticiaService.js

import axios from 'axios';

const baseUrl = 'https://opocheck.onrender.com/api/noticias'; // Reemplaza con la URL de tu backend

const noticiaService = {
  createNoticia: async (noticiaData) => {
    try {
      const response = await axios.post(baseUrl, noticiaData);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al crear la noticia';
    }
  },

  getAllNoticias: async () => {
    try {
      const response = await axios.get(baseUrl);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al obtener todas las noticias';
    }
  },

  getNoticiaById: async (noticiaId) => {
    try {
      const response = await axios.get(`${baseUrl}/${noticiaId}`);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al obtener la noticia por ID';
    }
  },

  updateNoticia: async (noticiaId, updatedData) => {
    try {
      const response = await axios.put(`${baseUrl}/${noticiaId}`, updatedData);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al actualizar la noticia';
    }
  },

  deleteNoticia: async (noticiaId) => {
    try {
      await axios.delete(`${baseUrl}/${noticiaId}`);
    } catch (error) {
      throw error.response.data.error || 'Error al eliminar la noticia';
    }
  }
};

export default noticiaService;
