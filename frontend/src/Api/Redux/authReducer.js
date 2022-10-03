import { createSlice } from '@reduxjs/toolkit'

const authReducer = createSlice({
    name: 'auth',
    initialState: { token: null, user_name: null },
    reducers: {
        setUserName: (state, action) => {    
            state.user_name = action.payload
        },
        setCredentials: (state, action) => {    
            state.token = action.payload
        },
        logOut: (state, action) => {
            state.token = null
        },
    }
})

export const { setCredentials, setUserName, logOut } = authReducer.actions

export default authReducer.reducer

export const selectCurrentToken = (state) => state.auth.token

export const selectCurrentUser = (state) => state.auth.user_name