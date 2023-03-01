import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { KEY_LIST_CART } from '../../../constants/config'

const initialState = {
    listCart: JSON.parse(localStorage.getItem(KEY_LIST_CART)) || [],
    totalCart: JSON.parse(localStorage.getItem(KEY_LIST_CART))?.length || 0,
    error: {},
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        actListCart: (state, action) => {
            const product = action.payload
            const cart = JSON.parse(localStorage.getItem(KEY_LIST_CART)) || []
            const existProduct = cart.findIndex(cart => cart.id === product.id)

            if (existProduct !== -1) {
                cart[existProduct].quantity += 1;
            } else {
                cart.push(product)
            }

            localStorage.setItem(KEY_LIST_CART, JSON.stringify(cart))
            state.listCart = cart
            state.totalCart = cart.length

            toast.success('Add to cart Success!', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        },
        actMoreListCart: (state, action) => {
            const product = action.payload
            const cart = JSON.parse(localStorage.getItem(KEY_LIST_CART)) || []
            const existProduct = cart.findIndex(cart => cart.id === product.id)

            if (existProduct !== -1) {
                cart[existProduct].quantity += product.quantity;
            } else {
                cart.push(product)
            }
            localStorage.setItem(KEY_LIST_CART, JSON.stringify(cart))
            state.listCart = cart
            state.totalCart = cart.length

            toast.success('Add to cart success!', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        },
        actChangeQuantity: (state, action) => {
            const { value, quantity } = action.payload

            const cart = JSON.parse(localStorage.getItem(KEY_LIST_CART)) || []
            const existProduct = cart.findIndex(cart => cart.id === quantity.id)

            cart[existProduct].quantity = value

            localStorage.setItem(KEY_LIST_CART, JSON.stringify(cart))
            state.listCart = cart
            state.totalCart = cart.length
        },
        actDeleteCart: (state, action) => {
            const product = action.payload
            const cart = JSON.parse(localStorage.getItem(KEY_LIST_CART)) || []
            const existProduct = cart.findIndex(cart => cart.id === product.id)

            cart.splice(existProduct, 1)
            localStorage.setItem(KEY_LIST_CART, JSON.stringify(cart))
            state.listCart = cart
            state.totalCart = cart.length

            toast.success('Delete Success!', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        },
        actClearCart: (state, action)=> {
            state.listCart = []
            state.totalCart = 0
            localStorage.removeItem(KEY_LIST_CART)
        }

    }

})

export const { actListCart, actMoreListCart, actDeleteCart, actChangeQuantity, actClearCart } = cartSlice.actions
export default cartSlice.reducer