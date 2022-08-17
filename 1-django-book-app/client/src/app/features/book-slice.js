import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  books: [],
  book: {},
  q: "",
  isLoading: false,
  isError: false,
  errorMessage: "",
};

const API_URL = "http://127.0.0.1:8000/api/v1";

export const getAllBooks = createAsyncThunk(
  "book/getAllBooks",
  async ({ q, authTokens }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/books/?q=${q}`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getBook = createAsyncThunk(
  "book/getBook",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/books/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setQ: (state, action) => {
      state.q = action.payload.q;
    },
  },
  extraReducers: {
    //Get all books in database
    [getAllBooks.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    },
    [getAllBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    },

    //get book by id
    [getBook.pending]: (state) => {
      state.isLoading = true;
    },
    [getBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.book = action.payload;
    },
    [getBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    },
  },
});

export const { setQ } = bookSlice.actions;
export default bookSlice.reducer;
