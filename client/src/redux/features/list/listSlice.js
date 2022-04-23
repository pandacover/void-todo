import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import listService from './listService';

const initialState = {
    lists: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
}

export const createList = createAsyncThunk('lists/create', async (listData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await listService.createList(listData, token);
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const getList = createAsyncThunk('lists/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await listService.getList(token);
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const deleteList = createAsyncThunk('lists/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await listService.deleteList(id, token);
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const updateList = createAsyncThunk('lists/update', async (listData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await listService.updateList(listData, token);
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createList.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createList.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.lists.push(action.payload)
            })
            .addCase(createList.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getList.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getList.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.lists = action.payload
            })
            .addCase(getList.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteList.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteList.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.lists = state.lists.filter((list) => list._id !== action.payload.id)
            })
            .addCase(deleteList.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateList.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateList.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.lists = state.lists.filter((list) => list._id !== action.payload.id)
            })
            .addCase(updateList.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = listSlice.actions;
export default listSlice.reducer;