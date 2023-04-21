import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Style
import "./index.css";
// Redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from './redux/user';
import errorReducer from './redux/error';
import booksReducer from './redux/books';
import actionsReducer from './redux/onClickActions';
import bookNotesReducer from './redux/bookNotes';

const store = configureStore({
  reducer: {
    users: userReducer,
    error: errorReducer,
    books: booksReducer,
    onClickActions: actionsReducer,
    bookNotes: bookNotesReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>
);
