import React, {useState} from 'react';
import 'intl-tel-input/build/css/intlTelInput.css';
import Verify from './Verify';
import Login from './Login';
import UserService from '../services/User';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    maxWidth: '400px',
    margin: '0 auto',
    height: '100vh',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
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
    color: '#333',
  },
  input: {
    width: '100%',
    height: '50px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '0 10px',
    marginBottom: '10px',
    backgroundColor: '#fff',
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
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
  },
  registerLink: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  errorText: {
    color: 'red',
    marginBottom: '10px',
  },
};


const Register = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showVerify, setShowVerify] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [countryCode, setCountryCode] = useState('');


  const handleRegister = async () => {
    if (!phoneNumber || !email || !password || !repeatPassword) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    if (password !== repeatPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+}{":;\'?/><,.\\[\\]\\\\]).{8,}$');
    if (!regex.test(password)) {
      setPasswordError('La contraseña debe tener al menos una letra minúscula, una letra mayúscula, un número, un carácter especial y tener una longitud mínima de 8 caracteres.');
      return;
    }

    await UserService.register(`${countryCode}${phoneNumber}`, password, repeatPassword, email)
    console.log("Usuario registrado correctamente");
    setShowVerify(true);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  return (
    <>
      {!showVerify && !showLogin ? (
        <div style={styles.container}>
          <h2 style={styles.title}>Registro</h2>
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
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="text"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && <p style={styles.errorText}>{passwordError}</p>}
          <input
            style={styles.input}
            type="text"
            placeholder="Repetir contraseña"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
          <button style={styles.button} onClick={handleRegister}>
            Registrarse
          </button>
          <p
            style={styles.registerLink}
            onClick={handleShowLogin}
          >
            ¿Ya tienes una cuenta? Iniciar sesión
          </p>
        </div>
      ) : showVerify ? (
        <Verify />
      ) : (
        <Login />
      )}
    </>
  );
};

export default Register;
