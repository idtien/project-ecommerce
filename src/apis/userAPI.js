import axios from "axios"
import { BE_URL } from "../constants/config"

export const fetchInfoMe = async (email) => {
    // get user have email = email
    return await axios.get(`${BE_URL}users?email=${email}`)
}

export const fetchRegisterUser = async (dataRegister) => {
    return await axios.post(`${BE_URL}register`, dataRegister)
}

//Fetch ALL user to display customer admin
export const fetchAllUser = async () => {
    const {data} = await axios.get(`$${BE_URL}users`)
    return data
}
//Delete user by id
export const fetchDeleteUserByID = async (id) => {
    return await axios.delete(`${BE_URL}users/${id}`)
}