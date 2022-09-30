import { createSlice } from '@reduxjs/toolkit'

const authReducer = createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers: {
        setCredentials: (state, action) => {    
            state.token = action.payload
        },
        logOut: (state, action) => {
            state.token = null
        },
    }
})

export const { setCredentials, logOut } = authReducer.actions

export default authReducer.reducer

export const selectCurrentToken = (state) => state.auth.token