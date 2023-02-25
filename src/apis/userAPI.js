import axios from "axios"
import { BE_URL } from "../constants/config"

export const fetchInfoMe = async (email) => {
    // get user have email = email
    return await axios.get(`${BE_URL}users?email=${email}`)
}

export const fetchRegisterUser = async (dataRegister) => {
    return await axios.post(`${BE_URL}register`, dataRegister)
}