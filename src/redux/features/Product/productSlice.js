import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchAllDataProduct, fetchDataProductByID } from '../../../apis/productAPI';

const initialState = {
    allProduct: [],
    product: {},
    isLoading: false,
    errors: {}
}

export const fetchAllProduct = createAsyncThunk(
    "user/fetchProduct",
    async () => {
        //call api get all data
        const data = await fetchAllDataProduct();
        return data || [];
    }
)

export const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        actGetProduct: (state, action) => {
            console.log('action', action);
            state.product = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchAllProduct.rejected, (state, action) => {
            state.errors = {
                errors: 'Something wrong',
                code: ''
            }
            state.isLoading = false
        });
        builder.addCase(fetchAllProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.allProduct = action.payload || []

        });
    }
})



export const actGetProductById = (id) => async (dispatch) => {
    try {
        const dataProduct =   await fetchDataProductByID(id)
        dispatch(actGetProduct(dataProduct.data))
        console.log(dataProduct, 'get produt by id slice product');
    } catch (error) {
        console.log(error);
    } 
}

export const { actGetProduct } = productSlice.actions
export default productSlice.reducer