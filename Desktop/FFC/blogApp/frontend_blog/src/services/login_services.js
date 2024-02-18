import axios from "axios"; 
const baseUrl = "https://blogxbackendx-33edd80f605f.herokuapp.com/api/login"


const login =  async (credentials) => {
    
    return await axios.post(baseUrl, credentials)}

export default {
    login
}