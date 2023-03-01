import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { fetchOrderProduct } from '../../../apis/orderAPI'

const initialState = {
    isOrder: false
}

export const orderSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {
        actUpdateOrderProduct: (state, action) => {
            state.isOrder = action.payload
        }
    }
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
export const { actUpdateOrderProduct } = orderSlice.actions
export default orderSlice.reducer