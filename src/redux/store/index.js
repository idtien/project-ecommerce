import { configureStore } from "@reduxjs/toolkit";

import cartReducer from '../features/Cart/cartSlice'
import productReducer from '../features/Product/productSlice'
import orderReducer from '../features/Order/orderSlice'
import userReducer from '../features/User/userSlice'
import wishListReducer from '../features/WishList/wishListSlice'
import commentReducer from '../features/Comment/commentSlice'

const store = configureStore({
    reducer: {
        carts: cartReducer,
        products: productReducer,
        orders: orderReducer,
        users: userReducer,
        wishList: wishListReducer,
        comments: commentReducer
    }
})

export default store