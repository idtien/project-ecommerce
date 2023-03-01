import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { KEY_LIST_FAVORITE } from '../../../constants/config'

const initialState = {
    listWishList: JSON.parse(localStorage.getItem(KEY_LIST_FAVORITE)) || [],
    totalWishList: JSON.parse(localStorage.getItem(KEY_LIST_FAVORITE))?.length || 0
}

export const wishListSlice = createSlice({
    name: 'wishList',
    initialState: initialState,
    reducers: {
        actAddWishList: (state, action) => {
            const product = action.payload
            const cart = JSON.parse(localStorage.getItem(KEY_LIST_FAVORITE)) || []
            const existProduct = cart.findIndex(cart => cart.id === product.id)

            if (existProduct !== -1) {
                toast.info('This Product is already in Favorite List!', {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                cart.push(product)
                toast.success('Add to Wish List Success!', {
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

            localStorage.setItem(KEY_LIST_FAVORITE, JSON.stringify(cart))
            state.listWishList = cart
            state.totalWishList = cart.length
        },
        actDeleteWishList: (state, action) => {
            const product = action.payload
            const cart = JSON.parse(localStorage.getItem(KEY_LIST_FAVORITE)) || []
            const existProduct = cart.findIndex(cart => cart.id === product.id)

            cart.splice(existProduct, 1)
            localStorage.setItem(KEY_LIST_FAVORITE, JSON.stringify(cart))
            state.listWishList = cart
            state.totalWishList = cart.length

            toast.success('Delete product from wish list successfully!', {
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
})

export const { actAddWishList, actDeleteWishList } = wishListSlice.actions
export default wishListSlice.reducer

