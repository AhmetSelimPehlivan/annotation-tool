import { createSlice } from '@reduxjs/toolkit'

const editReducer = createSlice({
    name: 'edit',
    initialState: { points: [], lines: [] },
    reducers: {
        setPointsArray: (state, action) => {    
            state.points = action.payload
        },
        setLinesArray: (state, action) => {    
            state.lines = action.payload
        },
    }
})

export const { setPointsArray, setLinesArray } = editReducer.actions

export default editReducer.reducer

export const selectPoints = (state) => state.edit.points

export const selectLines = (state) => state.edit.lines