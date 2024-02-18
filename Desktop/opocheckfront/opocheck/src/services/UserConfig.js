import axios from 'axios';

const baseUrl = 'https://opocheck.onrender.com/api/userConfigs'; // Reemplaza con la URL de tu backend

const UserConfigService = {
  createConfig: async (configData) => {
    try {
      const response = await axios.post(baseUrl, configData);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al crear configuración de usuario';
    }
  },

  getUserConfigs: async () => {
    try {
      const response = await axios.get(baseUrl);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al obtener configuraciones de usuario';
    }
  },

  getUserConfigById: async (configId) => {
    try {
      const response = await axios.get(`${baseUrl}/${configId}`);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al obtener configuración de usuario';
    }
  },

  updateUserConfig: async (configId, updatedConfigData) => {
    try {
      const response = await axios.put(`${baseUrl}/${configId}`, updatedConfigData);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al actualizar configuración de usuario';
    }
  },

  deleteUserConfig: async (configId) => {
    try {
      const response = await axios.delete(`${baseUrl}/${configId}`);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al eliminar configuración de usuario';
    }
  }
};

export default UserConfigService;
