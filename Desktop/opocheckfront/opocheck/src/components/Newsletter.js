import React, { useEffect, useState } from 'react';
import noticiaService from '../services/Noticia';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0px',
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
  newsList: {
    listStyleType: 'none',
    padding: '0',
    width: '100%',
  },
  listItem: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '10px',
    padding: '10px',
    cursor: 'pointer',
    backgroundColor: '#fff',
    transition: 'background-color 0.3s',
  },
  listItemTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  listItemContent: {
    fontSize: '16px',
    color: '#555',
  },
  searchInput: {
    width: '80%',
    height: '40px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '20px',
    padding: '0 10px',
  },
};

const NewsLetter = ({ noticias }) => {
  const [searchText, setSearchText] = useState('');
  const [notices, setNotices] = useState([])
  
  const handleNoticiaClick = (url) => {
    window.open(url, '_blank');
  }; 
    const getNotices = async () => {
        try {
        const notices = await noticiaService.getAllNoticias()
        setNotices(notices)
        console.log("get notices sussecefull!!")
        console.log(notices)
    } 
    catch(error) {
        console.log("Error getNotices", error)

    }
}

useEffect(() => {
    getNotices()
}, [])



  const filteredNoticias = notices.filter((noticia) =>
    noticia.text.toLowerCase().includes(searchText.toLowerCase()) ||
    noticia.comunidad.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Últimas Noticias</h2>
      <input
        style={styles.searchInput}
        type="text"
        placeholder="Buscar noticias..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <ul style={styles.newsList}>
        {filteredNoticias.map((noticia) => (
          <li
            key={noticia._id}
            style={styles.listItem}
            onClick={() => handleNoticiaClick(noticia.url)}
          >
            <p style={styles.listItemTitle}>{noticia.comunidad}</p>
            <p style={styles.listItemContent}>{noticia.text}</p>
            <p style={styles.listItemContent}>Fecha: {noticia.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsLetter;

