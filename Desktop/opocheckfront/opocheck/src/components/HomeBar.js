import React, { useState } from 'react';
import { FiClipboard, FiBook, FiBell, FiCheck } from 'react-icons/fi'; // Importar iconos
import Noticias from './noticias';
// import Material from './Material'; // Importar componente Material
// import Correcciones from './Correcciones'; // Importar componente Correcciones
// import Corrector from './Corrector'; // Importar componente Corrector

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#f5f5f5',
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-around',
      width: '100%',
      marginBottom: '20px',
    },
    button: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      outline: 'none',
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
    },
    icon: {
      fontSize: '24px',
      marginBottom: '5px',
    },
    componentContainer: {
      width: '100%',
    },
  };
  

const Home = () => {
  const [selectedTab, setSelectedTab] = useState('Noticias');

  const renderComponent = () => {
    switch (selectedTab) {
      case 'Noticias':
        return <Noticias />;
      case 'Material':
        return <Noticias />;
      case 'Correcciones':
        return <Noticias />;
      case 'Corrector':
        return <Noticias />;
      default:
        return <Noticias />;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <button style={selectedTab === 'Noticias' ? styles.activeButton : styles.button} onClick={() => setSelectedTab('Noticias')}>
          <FiBell style={styles.icon} />
          <span>Noticias</span>
        </button>
        <button style={selectedTab === 'Material' ? styles.activeButton : styles.button} onClick={() => setSelectedTab('Material')}>
          <FiBook style={styles.icon} />
          <span>Material</span>
        </button>
        <button style={selectedTab === 'Correcciones' ? styles.activeButton : styles.button} onClick={() => setSelectedTab('Correcciones')}>
          <FiClipboard style={styles.icon} />
          <span>Correcciones</span>
        </button>
        <button style={selectedTab === 'Corrector' ? styles.activeButton : styles.button} onClick={() => setSelectedTab('Corrector')}>
          <FiCheck style={styles.icon} />
          <span>Corrector</span>
        </button>
      </div>
      <div style={styles.componentContainer}>
        {renderComponent()}
      </div>
    </div>
  );
};

export default Home;