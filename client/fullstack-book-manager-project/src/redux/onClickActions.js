import { createSlice } from '@reduxjs/toolkit';

export const actionsSlice = createSlice({
    name: 'actions',
    initialState: {
        value: {
            openCreateBookForm: false,
        }
    },

    reducers: {
        
        setOpenCreateBookForm: (state, action) => {
            state.value.openCreateBookForm = action.payload;
        }
        // setBooks: (state, action) => {
        //     state.value.books = action.payload;
        // }

    }
})

export const { setOpenCreateBookForm } = actionsSlice.actions;

export default actionsSlice.reducer;