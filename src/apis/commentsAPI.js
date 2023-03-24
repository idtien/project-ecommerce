import axios from "axios"
import { BE_URL } from "../constants/config"

//Add new product
export const fetchAddNewComment = async (data) => {
    return await axios.post(`${BE_URL}comments`, data)
}