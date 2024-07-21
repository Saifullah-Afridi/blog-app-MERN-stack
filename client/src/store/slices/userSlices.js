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

      return response.data.user;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
export const updateUser = createAsyncThunk(
  "updateUser",
  async (userId, thunkApi) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/v1/auth/update-me/${userId}`,
        updateFields,
        {
          withCredentials: true,
          credentials: true,
        }
      );
      return res.data.user;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
export const createGoogleUser = createAsyncThunk(
  "createGoogleUser",
  async (userData, thunkApi) => {
    try {
      const res = axios.post(
        "http://localhost:3000/api/v1/auth/google",
        userData,
        {
          withCredentials: true,
          credentials: true,
        }
      );
      return res.data.user;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (userId, thunkApi) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/auth/delete-user/${userId}`,
        {
          withCredentials: true,
          credentials: true,
        }
      );
      console.log(res);
      return res.data.message;
    } catch (error) {
      console.log(error.response.data.message);
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
export const logout = createAsyncThunk("logout", async (data, thunkApi) => {
  try {
    const res = await axios.get("http://localhost:3000/api/v1/auth/log-out", {
      withCredentials: true,
      credentials: true,
    });
    return res.data.user;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data.message);
  }
});
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
    builder.addCase(userLogin.pending, (state) => {
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
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
      state.isAuthenticated = true;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    });
  },
});

export default userSlice.reducer;
