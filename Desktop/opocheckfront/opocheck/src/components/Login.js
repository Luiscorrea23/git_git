import React, { useState } from 'react';
import Register from './Register'; // Importamos el componente Register
import UserService from '../services/User';
import Cookies from 'js-cookie';


const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      maxWidth: '400px', /* Ancho máximo */
      margin: '0 auto', /* Centrar horizontalmente */
      height: '100vh', /* Altura completa de la pantalla */
      justifyContent: 'center', /* Centrar verticalmente */
      backgroundColor: '#f5f5f5', /* Color de fondo moderno y neutro */
    },
    inputContainer: {
      width: '100%',
      marginBottom: '10px',
      display: 'inline-flex', // Mostrar elementos en la misma línea
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
    registerText: {
      fontSize: '16px',
      color: '#007bff',
      cursor: 'pointer',
      textDecoration: 'underline',
      marginTop: '10px', // Espacio adicional después del botón de inicio de sesión
    },
  };
  const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showRegister, setShowRegister] = useState(false); // Estado para controlar si se muestra el formulario de registro
    const [countryCode, setCountryCode] = useState('');
  
    const handleLogin = async () => {
      // Validar que los campos no estén vacíos
      if (!phoneNumber || !password) {
        alert('Por favor, completa todos los campos.');
        return;
      }
  
      try {
        // Lógica para enviar datos de inicio de sesión al backend
        const login = await UserService.login(`${countryCode}${phoneNumber}`, password);
  
        // Guardar el token en las cookies
        Cookies.set('token', login.token);
  
        console.log('Inicio de sesión exitoso');
        // Redireccionar a la página principal u otra página necesaria
        window.location.reload();
      } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
        // Manejar el error de inicio de sesión, como mostrar un mensaje de error
      }
    };
  
    const handleToggleRegister = () => {
      setShowRegister(!showRegister); // Cambiar el estado para mostrar u ocultar el formulario de registro
      // Ocultar el formulario de login al mostrar el formulario de registro
      if (showRegister) {
        setPhoneNumber('');
        setPassword('');
      }
    };
  
    return (
      <>
        {!showRegister ? (
          <div style={styles.container}>
            <h2 style={styles.title}>Iniciar sesión</h2>
            <div style={styles.inputContainer}>
            <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} style={{ ...styles.input, marginRight: '10px' }}>
              <option value="">Seleccionar país</option>
              <option value="+1">EE. UU. (+1)</option>
              <option value="+44">Reino Unido (+44)</option>
              <option value="+34">España (+34)</option>
              {/* Agrega más opciones según sea necesario */}
            </select>
            <input 
              type='text'
              placeholder='numero de telefono'
              style={styles.input}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
            <input
              style={styles.input}
              type="text"
              placeholder="***********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button style={styles.button} onClick={handleLogin}>
              Iniciar sesión
            </button>
            {/* Mostrar el botón "Registrarse" solo si no se está mostrando el formulario de registro */}
            {!showRegister && (
            <p style={styles.registerText} onClick={handleToggleRegister}>
                ¿No tienes una cuenta? Regístrate
            </p>
            )}
          </div>
        ) : (
          <Register />
        )}
      </>
    );
  };
  

export default Login;

