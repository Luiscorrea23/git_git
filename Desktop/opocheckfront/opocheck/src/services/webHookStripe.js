// stripeWebhookService.js

import axios from 'axios';

const baseUrl = 'https://tu-backend.com/webhook'; // Reemplaza con la URL de tu backend

const stripeWebhookService = {
  handleStripeEvent: async (rawBody, signature) => {
    try {
      const response = await axios.post(`${baseUrl}/webhook`, rawBody, {
        headers: {
          'Stripe-Signature': signature,
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Error al manejar el evento de Stripe';
    }
  }
};

export default stripeWebhookService;
