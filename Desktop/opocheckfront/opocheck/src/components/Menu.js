import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { FiClipboard, FiBook, FiBell, FiCheck, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import NewsLetter from './Newsletter';
import Correcciones from './Correcciones';
import Materials from './Materials';
import User from './User';
import MainScreen from './Corrector';
import Cookies from 'js-cookie';


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    height: '100vh',
    overflowY: 'auto',
  },
  navbarTop: {
    padding: "10px",
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    position: 'fixed',
    top: 0,
    backgroundColor: '#fff',
    borderBottom: '1px solid #ccc',
  },
  navbarBottom: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: '#fff',
    borderTop: '1px solid #ccc',
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    textDecoration: 'none', // Asegúrate de que los enlaces no tengan subrayado
    color: 'inherit', // El color del texto hereda del elemento padre
    '&:hover': { // Estilos para el estado hover
      backgroundColor: 'transparent', // Mantén el fondo transparente al hacer hover
    },
  },
  activeButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    outline: 'none',
    '&:hover': { // Estilos para el estado hover en el botón activo
      backgroundColor: '#007bff', // Mantén el color de fondo del botón activo
    },
  },
  icon: {
    fontSize: '24px',
    marginBottom: '0px',
    marginTop: "5px",
    padding: "5px",
  },
  componentContainer: {
    width: '100%',
    marginBottom: '50px', 
    marginTop: '50px',
  },
};

const Menu = () => {
  const location = useLocation();

  const getButtonStyle = (path) => {
    return location.pathname === path ? styles.activeButton : styles.button;
  };

  const handleLogout = () => {
    Cookies.remove('token');
    window.location.reload();
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbarTop}>
        <Link to="/settings" style={getButtonStyle("/settings")}>
          <FiSettings style={styles.icon} />
        </Link>
        <Link to="/logout" style={getButtonStyle("/logout")} onClick={handleLogout}>
          <FiLogOut style={styles.icon} />
        </Link>
      </div>
      <div style={styles.navbarBottom}>
        <Link to="/noticias" style={getButtonStyle("/noticias")}>
          <FiBell style={styles.icon} />
        </Link>
        <Link to="/correcciones" style={getButtonStyle("/correcciones")}>
          <FiClipboard style={styles.icon} />
        </Link>
        <Link to="/corrector" style={getButtonStyle("/corrector")}>
          <FiCheck style={styles.icon} />
        </Link>
        <Link to="/material" style={getButtonStyle("/material")}>
          <FiBook style={styles.icon} />
        </Link>
        <Link to="/user" style={getButtonStyle("/user")}>
          <FiUser style={styles.icon} />
        </Link>
      </div>
      <div style={styles.componentContainer}>
        <Routes>
          <Route path="/noticias" element={<NewsLetter />} />
          <Route path="/correcciones" element={<Correcciones />} />
          <Route path='/material' element={<Materials />} />
          <Route path='/user' element={<User />} />
          <Route path='/corrector' element={<MainScreen />} />
          
        </Routes>
      </div>
    </div>
  );
};

export default () => (
  <Router>
    <Menu />
  </Router>
);

