import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";

const initialState = {
  isLoading: false,
  isLogin: false,
  user: localStorage.getItem("authTokens")
    ? jwt_decode(localStorage.getItem("authTokens"))
    : {},
  authTokens: localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null,
  isError: false,
  errorMessage: "",
};

const API_URL = "http://127.0.0.1:8000/api/v1";

export const login = createAsyncThunk(
  "auth/login",
  async ({ loginData, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/token/`, loginData);
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      navigate("/");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateToken = createAsyncThunk(
  "auth/updateToken",
  async ({ navigate, authTokens }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/token/refresh/`, {
        refresh: authTokens.refresh,
      });
      console.log("Updated token");
      return response.data;
    } catch (error) {
      console.log("authTokens:" + authTokens.refresh);
      console.log(error);
      navigate("/login");
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.authTokens = null;
      state.isLogin = false;
      localStorage.removeItem("authTokens");
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLogin = true;
      state.authTokens = action.payload;
      state.user = jwt_decode(action.payload.access);
    },
    [login.rejected]: (state, action) => {
      state.isError = true;
      state.errorMessage = action.payload.message;
    },

    //update token
    [updateToken.pending]: (state) => {
      state.isLoading = true;
    },
    [updateToken.fulfilled]: (state, action) => {
      state.authTokens = action.payload;
      state.user = jwt_decode(action.payload.access);
    },
    [updateToken.rejected]: (state, action) => {
      state.isError = true;
      authSlice.caseReducers.logout(state);
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
