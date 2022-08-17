import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./features/book-slice";
import authReducer from "./features/auth-slice";
import authorReducer from "./features/author-slice";

export const store = configureStore({
  reducer: {
    book: bookReducer,
    auth: authReducer,
    author: authorReducer,
  },
});
