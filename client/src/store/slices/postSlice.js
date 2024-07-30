import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPosts = createAsyncThunk(
  "getAllPosts",
  async (options = {}, thunkApi) => {
    try {
      const { userId, startIndex } = options;
      const queryParams = new URLSearchParams();
      if (userId !== undefined && userId !== null) {
        queryParams.append("userId", userId);
      }
      if (startIndex !== undefined && startIndex !== null) {
        queryParams.append("startIndex", startIndex);
      }
      const queryString = queryParams.toString();
      const url = `http://localhost:3000/api/v1/post${
        queryString ? `?${queryString}` : ""
      }`;

      const res = await axios.get(url);
      return res.data.posts;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: null,
    loading: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.pending, (state, action) => {
      state.loading = true;
      state.posts = null;
      state.error = null;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.posts = action.payload;
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.loading = false;
      state.posts = null;
      state.error = action.payload;
    });
  },
});

export default postSlice.reducer;
