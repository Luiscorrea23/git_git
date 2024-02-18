import axios from 'axios';

const baseUrl = 'https://opocheck.onrender.com/api/checkout'; // Reemplaza con la URL de tu backend

const CheckoutService = {
  createCheckoutSession: async (name, price, userId, credits) => {
    try {
      const response = await axios.post(`${baseUrl}/create-checkout-session`, {
        name,
        price,
        userId,
        credits
      });
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al crear sesión de pago';
    }
  },

  handleCheckoutSuccess: async (sessionId) => {
    try {
      const response = await axios.post(`${baseUrl}/checkout-success?sessionId=${sessionId}`);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error después del pago';
    }
  }
};

export default CheckoutService;
