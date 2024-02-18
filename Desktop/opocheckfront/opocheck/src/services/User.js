import axios from 'axios';

const baseUrl = 'https://opocheck.onrender.com/api/users';

const UserService = {
  register: async (phoneNumber, password, repeatPassword, email) => {
    try {
      const response = await axios.post(`${baseUrl}/register`, {
        phoneNumber,
        password,
        repeatPassword,
        email
      });
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al registrar usuario';
    }
  },

  confirmRegistration: async (verificationCode) => {
    try {
      const response = await axios.post(`${baseUrl}/confirm-registration`, verificationCode);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al confirmar registro';
    }
  },

  login: async (phoneNumber, password) => {
    try {
      const response = await axios.post(`${baseUrl}/login`, {
        phoneNumber,
        password
      });
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al iniciar sesión';
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await axios.get(baseUrl);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al obtener datos del usuario';
    }
  },

  getUserById: async (userId) => {
    try {
      const response = await axios.get(`${baseUrl}/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al obtener datos del usuario';
    }
  },

  updateUser: async (newName) => {
    try {
      const response = await axios.put(baseUrl, { name: newName });
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al actualizar datos del usuario';
    }
  },

  deleteUser: async () => {
    try {
      const response = await axios.delete(baseUrl);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al eliminar usuario';
    }
  }
};

export default UserService;
