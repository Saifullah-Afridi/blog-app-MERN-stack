import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const userLogin = createAsyncThunk(
  "userLogin",
  async (userData, thunkApi) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/log-in",
        userData,
        {
          withCredentials: true,
          credentials: true,
        }
      );

      console.log(response.data.user);
      return response.data.user;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    error: null,
    loading: false,
    isAuthenticated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
      state.isAuthenticated = true;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;

const {} = userSlice.actions;
