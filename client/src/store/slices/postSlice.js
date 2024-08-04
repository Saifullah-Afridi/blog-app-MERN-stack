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
      console.log(error);

      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const getSinglePost = createAsyncThunk(
  "getSinglePost",
  async (id, thunkApi) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/post/${id}`, {
        withCredentials: true,
        credentials: true,
      });
      // console.log(res);
      return res.data.post;
    } catch (error) {
      console.log(error);

      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  "updatePost",
  async ({ userId, postId, data }, thunkApi) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/v1/post/${userId}/${postId}`,
        data,
        {
          withCredentials: true,
          credentials: true,
        }
      );
      return res.data.post;
    } catch (error) {
      console.log(error);

      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    loading: null,
    error: "",
    hasMore: true,
    singlePost: null,
  },
  reducers: {
    resetPosts: (state) => {
      state.posts = [];
      state.hasMore = true;
    },
    resetPost: (state) => {
      state.singlePost = null;
    },
  },
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
      if (action.meta.arg.startIndex === 0) {
        state.posts = action.payload;
      } else {
        state.posts = [...state.posts, ...action.payload];
      }
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
    builder.addCase(getSinglePost.pending, (state, action) => {
      state.error = "";
      state.loading = true;
    });
    builder.addCase(getSinglePost.fulfilled, (state, action) => {
      state.loading = false;
      state.singlePost = action.payload;
    });
    builder.addCase(getSinglePost.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.singlePost = null;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) => {
        return post._id === action.payload._id ? action.payload : post;
      });
    });
  },
});

export default postSlice.reducer;
export const { resetPosts } = postSlice.actions;
