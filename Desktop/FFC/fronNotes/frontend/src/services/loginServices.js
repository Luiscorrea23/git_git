import axios from "axios"; 
const baseUrl = "https://notesbackendxxxx-a51d76c3ba59.herokuapp.com/api/login"

const login =  async (credentials) => {return await axios.post(baseUrl, credentials)}

export default login