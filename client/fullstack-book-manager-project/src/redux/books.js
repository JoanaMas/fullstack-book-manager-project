import { createSlice } from '@reduxjs/toolkit';

export const booksSlice = createSlice({
    name: 'books',
    initialState: {
        value: {
            book: '',
            books: [],
            finishedBooks: [],
        }
    },

    reducers: {
        
        setBooks: (state, action) => {
            state.value.books = action.payload;
        },

        setFinishedBooks: (state, action) => {
            state.value.finishedBooks = action.payload;
        },


    }
})

export const { setBooks, setFinishedBooks, setPagesInTotal } = booksSlice.actions;

export default booksSlice.reducer;