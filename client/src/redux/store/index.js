import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import listReducer from '../features/list/listSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        list: listReducer,
    }
})

export default store;