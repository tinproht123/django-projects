import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  author: {},
  isError: false,
  errorMessage: "",
};

const API_URL = "http://127.0.0.1:8000/api/v1";

export const getAuthor = createAsyncThunk(
  "author/getAuthor",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/authors/${id}`);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const authorSlice = createSlice({
  name: "author",
  initialState,
  extraReducers: {
    [getAuthor.pending]: (state) => {
      state.isLoading = true;
    },
    [getAuthor.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.author = action.payload;
    },
    [getAuthor.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    },
  },
});

export default authorSlice.reducer;
