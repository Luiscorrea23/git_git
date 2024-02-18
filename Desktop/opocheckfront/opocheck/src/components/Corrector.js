import React, { useState, useEffect } from 'react';
import { FiFileText, FiImage, FiX} from 'react-icons/fi';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { v4 as uuidv4 } from 'uuid';


const MainScreen = () => {
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
    const [filePreviews, setFilePreviews] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [updateCount, setUpdateCount] = useState(0);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const isPdf = filePreviews.some(file => file.data.startsWith('data:application/pdf'));
        const isImage = filePreviews.some(file => !file.data.startsWith('data:application/pdf'));

        if (filePreviews.length === 0) {
            setShowAlert(false);
        } else if (isPdf && isImage) {
            setErrorMessage('No puedes subir un PDF si ya has subido imágenes');
            setShowAlert(true);
        } else if (isPdf) {
            setShowAlert(false);
        } else {
            setShowAlert(false);
        }
    }, [filePreviews]);

    const handleOptionChange = (event) => {
        setSelectedOptionIndex(event.target.value);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file.type === 'application/pdf' && filePreviews.some(file => !file.data.startsWith('data:application/pdf'))) {
            setErrorMessage('No puedes subir un PDF si ya has subido imágenes');
            setShowAlert(true);
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const newFilePreviews = [...filePreviews];
            newFilePreviews.push({ id: uuidv4(), data: e.target.result });
            setFilePreviews(newFilePreviews);
            setErrorMessage('');
        };

        reader.readAsDataURL(file);
    };

    const handleAddImage = (event) => {
        const file = event.target.files[0];

        if (file.type.startsWith('image') && filePreviews.some(file => file.data.startsWith('data:application/pdf'))) {
            setErrorMessage('No puedes subir imágenes si ya has subido un PDF');
            setShowAlert(true);
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const newFilePreviews = [...filePreviews];
            newFilePreviews.push({ id: uuidv4(), data: e.target.result });
            setFilePreviews(newFilePreviews);
            setErrorMessage('');
        };

        reader.readAsDataURL(file);
    };

    const handleCancelPreview = (id) => {
        const newFilePreviews = filePreviews.filter(file => file.id !== id);
        setFilePreviews(newFilePreviews);
        setUpdateCount(prevCount => prevCount + 1);
        setErrorMessage('');

        if (newFilePreviews.length === 0) {
            setShowAlert(false);
        } else {
            const isPdf = newFilePreviews.some(file => file.data.startsWith('data:application/pdf'));
            const isImage = newFilePreviews.some(file => !file.data.startsWith('data:application/pdf'));

            if (isPdf && isImage) {
                setErrorMessage('No puedes subir un PDF si ya has subido imágenes');
                setShowAlert(true);
            } else if (isPdf) {
                setShowAlert(false);
            } else {
                setShowAlert(false);
            }
        }
    };

    const selectedOption = ['temas', 'practicos', 'unidad', 'programacion'][selectedOptionIndex];

    return (
        <div style={styles.container}>
            {filePreviews.length > 0 ? (
                <div style={styles.carouselContainer}>
                    <Carousel key={updateCount} showArrows={false} showThumbs={true}>
                        {filePreviews.map((preview) => (
                            <div key={preview.id}>
                                <img src={preview.data} alt={`File Preview ${preview.id}`} style={{ maxWidth: '200px', maxHeight: '200px' }} />
                                <button onClick={() => handleCancelPreview(preview.id)} style={styles.cancelButton}>
                                    <FiX />
                                </button>
                            </div>
                        ))}
                    </Carousel>
                </div>
            ) : (
                <div>No hay archivos cargados</div>
            )}

            <div style={styles.buttonContainer}>
                <input type="file" accept=".pdf" onChange={handleFileChange} style={{ display: 'none' }} id="pdf-upload" />
                <label htmlFor="pdf-upload" style={styles.fileUploadLabel}>
                    <FiFileText />
                    Subir PDF
                </label>
                <input type="file" accept="image/jpeg, image/png" onChange={handleAddImage} multiple style={{ display: 'none' }} id="image-upload" />
                <label htmlFor="image-upload" style={styles.fileUploadLabel}>
                    <FiImage />
                    Subir Imágenes
                </label>
            </div>

            <select value={selectedOption} onChange={handleOptionChange} style={styles.select}>
                <option value="temas">Temas</option>
                <option value="practicos">Prácticos</option>
                <option value="unidad">Unidad</option>
                <option value="programacion">Programación</option>
            </select>

            <button style={styles.corregirButton} onClick={() => console.log("Corregir")}>Corregir</button>

            {showAlert && (
                <div style={styles.modalContainer}>
                    <div style={styles.modalContent}>
                        <p style={styles.errorMessage}>{errorMessage}</p>
                        <button onClick={() => setShowAlert(false)}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    },
    carouselContainer: {
        position: 'relative',
        marginBottom: '20px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    fileUploadLabel: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '200px',
        height: '120px',
        border: '2px dashed #ccc',
        borderRadius: '10px',
        cursor: 'pointer',
        margin: '0 10px',
        transition: 'background-color 0.3s ease',
    },
    select: {
        width: '150px',
        height: '40px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginBottom: '20px',
    },
    cancelButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        outline: 'none',
        zIndex: 1,
    },
    rearrangeButton: {
        position: 'absolute',
        top: '50%',
        width: '30px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        outline: 'none',
        zIndex: 1,
    },
    corregirButton: {
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        cursor: 'pointer',
        marginTop: '20px',
    },
    errorMessage: {
        color: 'red',
    },
    modalContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '5px',
        textAlign: 'center',
    },
};

export default MainScreen;
