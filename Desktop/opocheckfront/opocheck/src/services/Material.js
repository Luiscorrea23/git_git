import axios from 'axios';

const baseUrl = 'https://opocheck.onrender.com/api/materials'; // Reemplaza con la URL de tu backend

const MaterialService = {
  uploadMaterial: async (materialData, pdfFile) => {
    try {
      const formData = new FormData();
      formData.append('especialidad', materialData.especialidad);
      formData.append('title', materialData.title);
      formData.append('type', materialData.type);
      formData.append('file', pdfFile);

      const response = await axios.post(`${baseUrl}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al subir material';
    }
  },

  getAllMaterials: async () => {
    try {
      const response = await axios.get(`${baseUrl}`);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al obtener todos los materiales';
    }
  },

  getMaterialById: async (materialId) => {
    try {
      const response = await axios.get(`${baseUrl}/${materialId}`);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al obtener material por ID';
    }
  },

  updateMaterial: async (materialId, updatedData) => {
    try {
      const response = await axios.put(`${baseUrl}/${materialId}`, updatedData);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al actualizar material';
    }
  },

  deleteMaterial: async (materialId) => {
    try {
      const response = await axios.delete(`${baseUrl}/${materialId}`);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al eliminar material';
    }
  }
};

export default MaterialService;
