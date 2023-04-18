import { createSlice } from '@reduxjs/toolkit';

export const booksSlice = createSlice({
    name: 'books',
    initialState: {
        value: {
            book: '',
            books: [],
        }
    },

    reducers: {
        
        setBooks: (state, action) => {
            state.value.books = action.payload;
        }

    }
})

export const { setBooks } = booksSlice.actions;

export default booksSlice.reducer;