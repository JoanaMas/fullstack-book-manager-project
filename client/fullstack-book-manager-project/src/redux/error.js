import { createSlice } from '@reduxjs/toolkit';

export const errorSlice = createSlice({
    name: 'error',
    initialState: {
        value: {
            error: '',
        }
    },

    reducers: {
        
        changeErrorMessage: (state, action) => {
            state.value.error = action.payload;
        }

    }
})

export const { changeErrorMessage } = errorSlice.actions;

export default errorSlice.reducer;