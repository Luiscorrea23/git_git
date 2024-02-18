import React from 'react';
import NewsLetter from './Newsletter';
// import Material from './Material'; // Importar componente Material
// import Correcciones from './Correcciones'; // Importar componente Correcciones
// import Corrector from './Corrector'; // Importar componente Corrector

const styles = {
  mainContainer: {
    marginTop: '60px', // Espacio para el navBar superior
    marginBottom: '60px', // Espacio para el navBar inferior
    overflowY: 'auto', // Agrega scroll si el contenido excede la altura
  },
};

const SharedComponent = ({ selectedTab }) => {
  // Función para renderizar el componente correspondiente según la pestaña seleccionada
  const renderComponent = () => {
    switch (selectedTab) {
      case 'Noticias':
        return <NewsLetter />;
      // Agregar los otros casos según sea necesario
      default:
        return <NewsLetter />;
    }
  };

  return (
    <div style={styles.mainContainer}>
      {renderComponent()}
    </div>
  );
};

export default SharedComponent;
