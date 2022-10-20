import { createSlice } from '@reduxjs/toolkit'

const authReducer = createSlice({
    name: 'auth',
    initialState: { token: null, user_name: null, role: null },
    reducers: {
        setUserName: (state, action) => {    
            state.user_name = action.payload
        },
        setUserRole: (state, action) => {    
            state.role = action.payload
        },
        setCredentials: (state, action) => {    
            state.token = action.payload
        },
        logOut: (state, action) => {
            state.token = null
        },
    }
})

export const { setCredentials, setUserName, setUserRole, logOut } = authReducer.actions

export default authReducer.reducer

export const selectCurrentToken = (state) => state.auth.token

export const selectCurrentUserName = (state) => state.auth.user_name

export const selectCurrentUserRole = (state) => state.auth.role