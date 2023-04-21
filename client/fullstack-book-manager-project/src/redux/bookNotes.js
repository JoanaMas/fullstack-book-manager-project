import { createSlice } from '@reduxjs/toolkit';

export const bookNotesSlice = createSlice({
    name: 'bookNotes',
    initialState: {
        value: {
            bookNotes: [],
        }
    },

    reducers: {
        
        setBookNotes: (state, action) => {
            state.value.bookNotes = action.payload;
        },

    }
})

export const { setBookNotes } = bookNotesSlice.actions;

export default bookNotesSlice.reducer;