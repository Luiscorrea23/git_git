import React, { useState } from 'react';
import { FiClipboard, FiBook, FiBell, FiCheck } from 'react-icons/fi'; // Importar iconos

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
  

const BottomNavBar = ({ selectedTab, setSelectedTab }) => {
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div style={styles.container}>
      <div style={styles.componentContainer}>
        {handleTabChange()}
      </div>
      <div style={styles.navbar}>
        <button style={selectedTab === 'Noticias' ? styles.activeButton : styles.button} onClick={() => setSelectedTab('Noticias')}>
          <FiBell style={styles.icon} />
          <span>Noticias</span>
        </button>
        <button style={selectedTab === 'Material' ? styles.activeButton : styles.button} onClick={() => setSelectedTab('Material')}>
          <FiBook style={styles.icon} />
          <span>Material</span>
        </button>
        <button style={selectedTab === 'Corrector' ? styles.activeButton : styles.button} onClick={() => setSelectedTab('Corrector')}>
          <FiCheck style={styles.icon} />
          <span>Corrector</span>
        </button>
        <button style={selectedTab === 'Correcciones' ? styles.activeButton : styles.button} onClick={() => setSelectedTab('Correcciones')}>
          <FiClipboard style={styles.icon} />
          <span>Correcciones</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavBar;
