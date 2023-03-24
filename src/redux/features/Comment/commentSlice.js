import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { fetchAddNewComment } from '../../../apis/commentsAPI'
import { BE_URL } from '../../../constants/config'

const initialState = {
    allComment: [],
}

export const fetchAllComment = createAsyncThunk(
    "user/fetchComment",
    async () => {
        const res = await axios.get(`${BE_URL}comments`)
        return res.data
    }
)

export const commentSlice = createSlice({
    name: 'comment',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllComment.pending, (state) => {

        });
        builder.addCase(fetchAllComment.rejected, (state, action) => {
        });
        builder.addCase(fetchAllComment.fulfilled, (state, action) => {
            state.allComment = action.payload
        });

    },
})

export const actAddNewComment = (data) => async (dispatch) => {
    try {
        await fetchAddNewComment(data)
        dispatch(fetchAllComment())
        toast.success('Rating success', {
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
        toast.error('Rating error', {
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

export const { } = commentSlice.actions
export default commentSlice.reducer