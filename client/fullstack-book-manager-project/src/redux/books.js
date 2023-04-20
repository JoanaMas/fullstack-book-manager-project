import { createSlice } from '@reduxjs/toolkit';

export const booksSlice = createSlice({
    name: 'books',
    initialState: {
        value: {
            book: '',
            books: [],
            finishedBooks: [],
            totalPagesRead: 0,
        }
    },

    reducers: {
        
        setBooks: (state, action) => {
            state.value.books = action.payload;
        },

        setFinishedBooks: (state, action) => {
            state.value.finishedBooks = action.payload;
        },

        setTotalPagesRead: (state, action) => {
            state.value.totalPagesRead = action.payload;
        }

    }
})

export const { setBooks, setFinishedBooks, setTotalPagesRead } = booksSlice.actions;

export default booksSlice.reducer;