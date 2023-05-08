import { createSlice } from '@reduxjs/toolkit';

export const booksSlice = createSlice({
  name: 'books',
  initialState: {
    value: {
      book: null,
      books: [],
      finishedBooks: [],
    },
  },

  reducers: {

    setBooks: (state, action) => {
      state.value.books = action.payload;
    },

    setFinishedBooks: (state, action) => {
      state.value.finishedBooks = action.payload;
    },

    setOneBook: (state, action) => {
      state.value.book = action.payload;
    },

  },
});

export const { setBooks, setFinishedBooks, setOneBook } = booksSlice.actions;

export default booksSlice.reducer;
