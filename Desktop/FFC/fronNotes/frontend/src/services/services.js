// routes_services.js
import axios from "axios";

const baseUrl = "https://notesbackendxxxx-a51d76c3ba59.herokuapp.com/api/blogs";

const axiosConfig = (token) => {
  return token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};
};

const handleRequest = async (request) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw error; // Propaga el error para que pueda ser manejado por el llamador
  }
};

const getData = async (token) => {
  const request = axios.get(baseUrl, axiosConfig(token));
  return handleRequest(request);
};

const getDataByID = async (token, id) => {
  const request = axios.get(`${baseUrl}/${id}`, axiosConfig(token));
  return handleRequest(request);
};

const postData = async (newBlog, token) => {
  const request = axios.post(baseUrl, newBlog, axiosConfig(token));
  return handleRequest(request);
};

const updateData = async (id, updatedBlog, token) => {
  console.log('Token en updateData:', token);
  console.log('ID y Datos en updateData:', id, updatedBlog);
  const request = axios.put(`${baseUrl}/${id}`, updatedBlog, axiosConfig(token));
  return handleRequest(request);
};

const deleteData = async (id, token) => {
  console.log('Token en deleteData:', token);
  console.log('ID en deleteData:', id);
  const request = axios.delete(`${baseUrl}/${id}`, axiosConfig(token));
  return handleRequest(request);
};

export { postData, deleteData, updateData, getData, getDataByID };
