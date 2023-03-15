import axios from "axios"
import { BE_URL } from "../constants/config"

export const fetchOrderProduct = async (data) => {
    return await axios.post(`${BE_URL}orders`, data)
}

export const fetchUpdateOrderStatus = async (infoUserEdit) => {
    return await axios.patch(`${BE_URL}orders/${infoUserEdit?.id}`, infoUserEdit)
}

export const deleteOrderById = async (id) => {
    return await axios.delete(`${BE_URL}orders/${id}`)
}