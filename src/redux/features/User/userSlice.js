import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BE_URL, KEY_ACCESS_TOKEN, KEY_IS_LOGGED } from '../../../constants/config'
import * as Jwt from 'jsonwebtoken'
import { fetchDeleteUserByID, fetchInfoMe, fetchRegisterUser, fetchUpdateUserEdit } from '../../../apis/userAPI'
import { toast } from 'react-toastify'

const initialState = {
    user: {},
    accessToken: localStorage.getItem(KEY_ACCESS_TOKEN) || "",
    isLoading: false,
    isLogged: JSON.parse(localStorage.getItem(KEY_IS_LOGGED)) || false, //re-cache status avoid re-render page
    error: {},
    isRegister: false,
    isToastLoginSuccess: false,
    allUser: []
}

//Create middleware call api
export const fetchLogin = createAsyncThunk(
    "user/fetchLogin",
    async (payload) => {
        const res = await axios.post(`${BE_URL}login`, payload)
        console.log(res.data, 'res.data');
        return res.data
    }
)

export const fetchAllUser = createAsyncThunk(
    "user/fetchAllUser",
    async () => {
        const res = await axios.get(`${BE_URL}users`)
        return res.data
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        actGetMe: (state, action) => {
            state.user = action.payload
        },
        loginSuccess: (state, action) => {
            localStorage.setItem(KEY_IS_LOGGED, JSON.stringify(true))
            state.isLogged = true;
        },
        actLogout: (state, action) => {
            localStorage.removeItem(KEY_ACCESS_TOKEN)
            localStorage.setItem(KEY_IS_LOGGED, JSON.stringify(false))
            state.isLogged = false;
            state.user = {}
            state.accessToken = ""
        },
        actUpdateRegister: (state, action) => {
            state.isRegister = action.payload
        }

    },
    extraReducers: (builder) => {
        //FetchLogin
        builder.addCase(fetchLogin.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchLogin.rejected, (state, action) => {
            state.error = {};
            state.isLoading = false;
            toast.error('Please check email or password!!!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        });
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            const { user, accessToken } = action.payload;
            if (accessToken) {
                state.user = user;
                state.accessToken = accessToken;
                state.isLogged = true;
                localStorage.setItem(KEY_IS_LOGGED, JSON.stringify(true))
                localStorage.setItem(KEY_ACCESS_TOKEN, accessToken);
            }

            state.isLoading = false;

        });

        //FetchAllUser

        // builder.addCase(fetchAllUser.pending, (state) => {{

        // }});
        // builder.addCase(fetchAllUser.rejected, (state, action) => {{

        // }});
        builder.addCase(fetchAllUser.fulfilled, (state, action) => {
            state.allUser = action.payload
        });
    },
})

export const actReLogin = (accessToken) => async (dispatch) => {
    try {
        //Jwt -> decode info user
        const decodeToken = Jwt.decode(accessToken)
        if (decodeToken?.email) {
            const repsInfo = await fetchInfoMe(decodeToken.email)
            const infoUser = repsInfo?.data?.[0]
            console.log(infoUser, 'asdasd');
            delete infoUser.password
            dispatch(actGetMe(infoUser)) //usemiddware dispatch info user when have data
            dispatch(loginSuccess()) //middeware update status login success
        }


    } catch (error) {
        console.log(error);
    }
}

export const actRegister = (dataRegister) => async (dispatch) => {
    console.log(dataRegister, 'log ben slice user');
    try {
        await fetchRegisterUser(dataRegister)
        dispatch(actUpdateRegister(true))
        toast.success('🦄 Success Register !', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    } catch (error) {
        dispatch(actUpdateRegister(false))
        toast.error('🦄 ERROR Register !', {
            position: "top-center",
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
        // dispatch(actUpdateRegister(true))
    }
}

export const actDeleteUserByID = (id) => async (dispatch) => {
    try {
        await fetchDeleteUserByID(id)
        dispatch(fetchAllUser())
        toast.success('Delete User success!', {
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
    }
}
export const actUpdateUserEdit = (infoUserEdit) => async (dispatch) => {
console.log(infoUserEdit, 'infoUserEdit');
    try {
        await fetchUpdateUserEdit(infoUserEdit)
        dispatch(fetchAllUser())
        toast.success('Update Role success', {
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
    }
}

export const { actGetMe, loginSuccess, actLogout, actUpdateRegister } = userSlice.actions
export default userSlice.reducer