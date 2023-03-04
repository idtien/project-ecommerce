import axios from "axios"
import { BE_URL } from "../constants/config"

//Call API get All data product
export const fetchAllDataProduct = async (params = {_limit: 8, page:1}) => {
    const { data } = await axios.get(`${BE_URL}products`, {
        params: {...params}
    })
    return data
}

export const fetchDataProductByID = async (id) => {
    // get user have email = email
    return await axios.get(`${BE_URL}products/${id}`)
}

export const fetchDataProductByName = async (searchValue) => {
    // get user have email = email
    return await axios.get(`${BE_URL}products/${searchValue}`)
}

//Call API Delete product by id
export const deleteProductById = async (id) => {
    return await axios.delete(`${BE_URL}products/${id}`)
}

export const fetchAllBrandProducts = async () => {
    return await axios.get(`${BE_URL}allBrandProducts`)
}