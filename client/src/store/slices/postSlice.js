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

export const deletePost = createAsyncThunk(
  "deletePost",
  async ({ userId, postId }, thunkApi) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/post/${userId}/${postId}`,
        {
          withCredentials: true,
          credentials: true,
        }
      );
      console.log(res);
      return res.data.post;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    loading: null,
    error: null,
    hasMore: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      if (action.payload.length < 9) {
        state.hasMore = false;
      }
      state.posts = [...state.posts, ...action.payload];
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload._id
      );
    });
  },
});

export default postSlice.reducer;
