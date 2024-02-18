import React, { useState } from 'react';
import UserService from '../services/User';
import Cookies from 'js-cookie';

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '10px',
      maxWidth: '400px', /* Ancho máximo */
      margin: '0 auto', /* Centrar horizontalmente */
      height: '100vh', /* Altura completa de la pantalla */
      justifyContent: 'center', /* Centrar verticalmente */
      backgroundColor: '#f5f5f5', /* Color de fondo moderno y neutro */
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#333', /* Color de texto oscuro */
    },
    input: {
      width: '100%',
      height: '50px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '0 10px',
      marginBottom: '10px',
      backgroundColor: '#fff', /* Color de fondo del input */
    },
    button: {
      margin: '20px',
      width: '70%',
      height: '50px',
      backgroundColor: '#007bff',
      color: '#fff',
      fontSize: '18px',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)', /* Sombra para un aspecto más moderno */
    },
  };
  

const Verify = () => {
  const [code, setCode] = useState('');

  const handleVerify = async () => {
    // Validar que el campo del código no esté vacío
    if (!code) {
      alert('Por favor, ingresa el código.');
      return;
    }
    // Lógica para enviar y verificar el código al backend
    try {
      const verify = await UserService.confirmRegistration(code)
      Cookies.set('token', verify.token);
      console.log("usuario registrado")
      window.location.reload();
    } catch (error) {
      alert("codigo incorrecto, intentalo de nuevo")
      console.log("error al confirmar usuario", error)
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Verificar Código</h2>
      <input
        style={styles.input}
        type="text"
        placeholder="Código de verificación"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />
      <button style={styles.button} onClick={handleVerify}>
        Verificar
      </button>
    </div>
  );
};

export default Verify;
