import axios from "axios"
import { BE_URL } from "../constants/config"

//Call API get All data product
export const fetchAllDataProduct = async () => {
    const { data } = await axios.get(`${BE_URL}products`)
    return data
}

//Call API get Data product by id
// export const fetchDataProductByID = async (idProduct) => {
//     const { data } = await axios.get(`${BE_URL}products/${idProduct}`)
//     return data
// }
export const fetchDataProductByID = async (id) => {
    // get user have email = email
    return await axios.get(`${BE_URL}products/${id}`)
}

//Call API Delete product by id
export const deleteProductById = async (id) => {
    return await axios.delete(`${BE_URL}products/${id}`)
}