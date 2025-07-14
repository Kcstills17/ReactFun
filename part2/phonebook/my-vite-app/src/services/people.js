import axios from 'axios'
const baseUrl = "/api/persons"



const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}


const create = newPerson => {
    return axios
      .post(baseUrl, newPerson)
      .then(response => response.data) // ✅ return only the data
  }



const deletePerson = (id) => {
        return axios 
        .delete (`${baseUrl}/${id}`)
        .then(response => {
            console.log(`Deleted Person with id: ${id}`)
            return response.data
        })
        .catch(error => {
            console.log(`Error deleting person with id ${id}:`, error)
            throw error
        })
}

const updateNumber = (id, updatedPerson) => {
    return axios 
    .put (`${baseUrl}/${id}`, updatedPerson)
    .then(response => {
        console.log(`replaced person of id ${id}'s number with a new number`)
        return response.data 
    }).catch(error => {
        console.log(`Error replacing the person with id ${id}'s number`, id)
        throw error
    })
}


export default {getAll, create, deletePerson, updateNumber}