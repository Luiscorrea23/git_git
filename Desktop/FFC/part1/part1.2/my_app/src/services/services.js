import axios from "axios";
const baseUrl = "https://notesbackendxxxx-a51d76c3ba59.herokuapp.com/api/notes"

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)

}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

export default {
    getAll: getAll, 
    create: create, 
    update: update
}