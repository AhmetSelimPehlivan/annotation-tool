import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import authReducer from './authReducer'
import editReducer from './editReducer'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        edit: editReducer,
    },
})

setupListeners(store.dispatch)