import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { deleteOrderById, fetchOrderProduct, fetchUpdateOrderStatus } from '../../../apis/orderAPI'
import { BE_URL } from '../../../constants/config'

const initialState = {
    allOrders: [],
    isOrder: false
}

export const fetchAllOrders = createAsyncThunk(
    "user/fetchAllOrders",
    async () => {
        const res = await axios.get(`${BE_URL}orders`)
        return res.data
    }
)

export const orderSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {
        actUpdateOrderProduct: (state, action) => {
            state.isOrder = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllOrders.pending, (state) => {

        });
        builder.addCase(fetchAllOrders.rejected, (state, action) => {
        });
        builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
            state.allOrders = action.payload
        });

    },
})

export const actOrderProduct = (data) => async (dispatch) => {
    console.log(data, 'log ben slice order');
    try {
        dispatch(actUpdateOrderProduct(true))
        await fetchOrderProduct(data)
        toast.success('Success order!', {
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
        toast.success('Error order!', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        console.log(error);
    } finally {
        dispatch(actUpdateOrderProduct(false))
    }
}

export const actUpdateStatusOrder = (dataEditOrder) => async (dispatch) => {
    try {
        await fetchUpdateOrderStatus(dataEditOrder)
        dispatch(fetchAllOrders())
        toast.success('Update Status Order success', {
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
        toast.error('Update Status Order error', {
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

export const actDeleteOrderByID = (id) => async (dispatch) => {
    try {
        await deleteOrderById(id)
        dispatch(fetchAllOrders())
        toast.success('Delete Order success', {
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
        toast.error('Delete Order error', {
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
export const { actUpdateOrderProduct } = orderSlice.actions
export default orderSlice.reducer