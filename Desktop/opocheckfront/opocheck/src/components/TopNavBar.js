import React, { useState } from 'react';
import { FiClipboard, FiBook, FiBell, FiCheck, FiUser, FiSettings, FiLogOut } from 'react-icons/fi'; // Importar iconos

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
  

const TopNavBar = ({ selectedTab, setSelectedTab }) => {
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
          <FiUser style={styles.icon} />
          <span>User</span>
        </button>
        <button style={selectedTab === 'Material' ? styles.activeButton : styles.button} onClick={() => setSelectedTab('Material')}>
          <FiSettings style={styles.icon} />
          <span>Settings</span>
        </button>
        <button style={selectedTab === 'Corrector' ? styles.activeButton : styles.button} onClick={() => setSelectedTab('Corrector')}>
          <FiLogOut style={styles.icon} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};


export default TopNavBar;
