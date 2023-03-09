import axios from "axios"
import { BE_URL } from "../constants/config"

//Call API get All data product
// params = {_limit: 8, page:1}
export const fetchAllDataProduct = async (params) => {
    const resp = await axios.get(`${BE_URL}products`, {
        params: { ...params }
    }
    )
    return resp
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

//Update product by id
export const fetchUpdateProductEdit = async (infoProductEdit) => {
    return await axios.patch(`${BE_URL}products/${infoProductEdit?.id}`, infoProductEdit)
}

//Add new product
export const fetchAddNewProduct = async (dataProduct) => {
    return await axios.post(`${BE_URL}products`, dataProduct)
}
