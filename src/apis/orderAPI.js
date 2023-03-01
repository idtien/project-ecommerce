import axios from "axios"
import { BE_URL } from "../constants/config"

export const fetchOrderProduct = async (data) => {
    return await axios.post(`${BE_URL}orders`, data)
}