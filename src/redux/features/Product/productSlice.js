import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { deleteProductById, fetchAddNewProduct, fetchAllDataProduct, fetchDataProductByID, fetchUpdateProductEdit } from '../../../apis/productAPI';

const initialState = {
    allProduct: [],
    product: {},
    isLoading: false,
    errors: {},
    currentPage: 1,
    pageSize: 20,
    totalProduct: 0
}


export const fetchAllProduct = createAsyncThunk(
    "user/fetchProduct",
    async (params) => {
        //call api get all data
        const resp = await fetchAllDataProduct(params);
        const totalProduct = resp.headers["x-total-count"]
        return { data: resp.data, totalProduct }
    }
)


export const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        actGetProduct: (state, action) => {
            state.product = action.payload
        },
        actChangePage: (state, action) => {
            state.currentPage = action.payload
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
        builder.addCase(fetchAllProduct.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.allProduct = payload.data || []
            state.totalProduct = payload.totalProduct
        });
    }
})

export const actSetChangePage = (page) => async (dispatch) => {
    console.log(page, 'page');
    try {
        dispatch(actChangePage(page))
        dispatch(fetchAllProduct({ _page: page, _limit: 20 }))
    } catch (error) {
        console.log(error);
    }
}

export const actGetProductById = (id) => async (dispatch) => {
    try {
        const dataProduct = await fetchDataProductByID(id)
        dispatch(actGetProduct(dataProduct.data))
    } catch (error) {
        console.log(error);
    }
}

export const actDeleteProductByID = (id) => async (dispatch) => {
    try {
        await deleteProductById(id)
        dispatch(fetchAllProduct())
        toast.success('Delete Product success', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    } catch (error) {
        console.log(error);
        toast.error('Delete Product error', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
}

export const actUpdateProductEdit = (infoProductEdit) => async (dispatch) => {

    try {
        await fetchUpdateProductEdit(infoProductEdit)
        dispatch(fetchAllProduct())
        toast.success('Update Product success', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    } catch (error) {
        toast.error('Update Product error', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }
}
export const actAddNewProduct = (dataProduct) => async (dispatch) => {
    try {
        await fetchAddNewProduct(dataProduct)
        dispatch(fetchAllProduct())
        toast.success('Add New Product success', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    } catch (error) {
        toast.error('Add New Product error', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }
}

export const { actGetProduct, actChangePage } = productSlice.actions
export default productSlice.reducer