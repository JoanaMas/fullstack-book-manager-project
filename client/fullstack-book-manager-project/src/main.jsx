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

const store = configureStore({
  reducer: {
    users: userReducer,
    error: errorReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>
);
