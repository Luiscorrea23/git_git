import React, { useState } from 'react';
import { FiEdit, FiSave } from 'react-icons/fi'; // Importar íconos de lápiz y guardar

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    maxWidth: '800px', /* Ancho máximo */
    margin: '0 auto', /* Centrar horizontalmente */
    backgroundColor: '#f5f5f5', /* Color de fondo moderno y neutro */
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333', /* Color de texto oscuro */
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    width: "100%"
  },
  input: {
    flex: 1,
    height: '40px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    paddingLeft: '10px',
  },
  editButton: {
    marginLeft: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
  },
};

const User = () => {
  // Datos del usuario, incluyendo el campo "credits"
  const [userData, setUserData] = useState({
    name: 'Nombre Actual',
    email: 'email@ejemplo.com',
    phoneNumber: '123456789',
    credits: 0,
    specialty: 'Especialidad Actual',
    community: 'Comunidad Actual',
  });

  // Estado para el modo de edición de cada campo
  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    phoneNumber: false,
    specialty: false,
    community: false,
  });

  // Función para manejar el cambio de valor en los campos editables
  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setUserData({ ...userData, [field]: value });
  };

  // Función para cambiar el modo de edición de un campo y guardar los cambios si es necesario
  const toggleEditMode = (field) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
  };

  // Función para manejar el guardado de los cambios
  const handleSaveChanges = () => {
    // Guardar los cambios solo si hay algún campo en modo de edición
    if (Object.values(editMode).some(value => value)) {
      // Aquí podrías enviar los datos actualizados al servidor si es necesario
      // Por simplicidad, simplemente actualizamos el estado aquí
      setEditMode({ name: false, email: false, phoneNumber: false, specialty: false, community: false });
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Usuario</h2>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={userData.name}
          style={styles.input}
          disabled={!editMode.name}
          onChange={(e) => handleInputChange(e, 'name')}
        />
        <button
          style={styles.editButton}
          onClick={() => toggleEditMode('name')}
        >
          {editMode.name ? <FiSave /> : <FiEdit />}
        </button>
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={userData.email}
          style={styles.input}
          disabled={!editMode.email}
          onChange={(e) => handleInputChange(e, 'email')}
        />
        <button
          style={styles.editButton}
          onClick={() => toggleEditMode('email')}
        >
          {editMode.email ? <FiSave /> : <FiEdit />}
        </button>
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={userData.phoneNumber}
          style={styles.input}
          disabled={!editMode.phoneNumber}
          onChange={(e) => handleInputChange(e, 'phoneNumber')}
        />
        <button
          style={styles.editButton}
          onClick={() => toggleEditMode('phoneNumber')}
        >
          {editMode.phoneNumber ? <FiSave /> : <FiEdit />}
        </button>
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={userData.specialty}
          style={styles.input}
          disabled={!editMode.specialty}
          onChange={(e) => handleInputChange(e, 'specialty')}
        />
        <button
          style={styles.editButton}
          onClick={() => toggleEditMode('specialty')}
        >
          {editMode.specialty ? <FiSave /> : <FiEdit />}
        </button>
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={userData.community}
          style={styles.input}
          disabled={!editMode.community}
          onChange={(e) => handleInputChange(e, 'community')}
        />
        <button
          style={styles.editButton}
          onClick={() => toggleEditMode('community')}
        >
          {editMode.community ? <FiSave /> : <FiEdit />}
        </button>
      </div>
      <div style={styles.inputContainer}>
        <p>Credits: {userData.credits}</p>
        <button
          style={styles.editButton}
          onClick={() => alert("Comprar más créditos")}
        >
          Comprar
        </button>
      </div>
      {/* Botón para guardar los cambios */}
      {Object.values(editMode).includes(true) && (
        <button style={styles.editButton} onClick={handleSaveChanges}>
          <FiSave /> Guardar Cambios
        </button>
      )}
    </div>
  );
};

export default User;

