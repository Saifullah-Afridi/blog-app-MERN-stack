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
      console.log(error);
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
      return res.data.message;
    } catch (error) {
      console.log(error.response.data.message);
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
export const deleteByAdmin = createAsyncThunk(
  "deleteByAdmin",
  async (id, thunkApi) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/user/delete-by-admin/${id}`,
        {
          withCredentials: true,
          credentials: true,
        }
      );
      console.log(res);

      return res.data.deletedUser;
    } catch (error) {
      console.log(error);

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
    console.log(res);
    return res.data.user;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data.message);
  }
});

export const getAllUsers = createAsyncThunk(
  "getAllUsers",
  async ({ startIndex = 0 }, thunkApi) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/user?startIndex=${startIndex}`,

        {
          withCredentials: true,
          credentials: true,
        }
      );
      console.log(res.data.users.length);

      return res.data.users;
    } catch (error) {
      thunkApi.rejectWithValue(error.response.data.message);
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
    allUsers: [],
    allUsersLoading: false,
    allUsersError: null,
    hasMore: true,
    startIndex: 0,
  },
  reducers: {
    resetAllUsers: (state) => {
      state.allUsers = [];
      state.startIndex = 0;
      state.hasMore = true;
    },
  },
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
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.allUsersLoading = true;
      state.allUsersError = null;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.allUsersLoading = false;
      if (action.payload?.length < 9) {
        state.hasMore = false;
      }
      if (action.meta.arg.startIndex === 0) {
        state.allUsers = action.payload;
      } else {
        state.allUsers = [...state.allUsers, ...action.payload];
      }
      state.startIndex += 9;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.allUsersLoading = false;
      state.allUsersError = action.payload;
    });
    builder.addCase(deleteByAdmin.fulfilled, (state, action) => {
      state.allUsers = state.allUsers.filter(
        (user) => String(user._id) !== String(action.payload._id)
      );
    });
  },
});
export const { resetAllUsers } = userSlice.actions;

export default userSlice.reducer;
