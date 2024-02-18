import axios from "axios";
const baseUrl = "https://blogxbackendx-33edd80f605f.herokuapp.com/api/blogs";

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
  console.log('Token:', token);
};

const axiosConfig = () => {
  return token
    ? {
        headers: { Authorization: token }
      }
    : {};
};

const getData = async () => await axios.get(baseUrl, axiosConfig());

const postData = async newBlog => {
  return await axios.post(baseUrl, newBlog, axiosConfig());
};

const deleteData = async id => await axios.delete(`${baseUrl}/${id}`, axiosConfig());

const updateData = async (id, updatedBlog) => {
  return await axios.put(`${baseUrl}/${id}`, updatedBlog, axiosConfig());
};


const updateLike = async (id) => {
  const response = await axios.put(`${baseUrl}/${id}/like`);
  return response.data;
};

export { getData, postData, deleteData, updateData, setToken, updateLike };