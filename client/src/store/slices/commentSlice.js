import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createComment = createAsyncThunk(
  "createComment",
  async ({ content, post }, thunkApi) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/comment",
        { content, post },
        {
          withCredentials: true,
          credentials: true,
        }
      );
      return res.data.comment;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const getCommentForPost = createAsyncThunk(
  "getCommentForPost",
  async ({ postId }, thunkApi) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/comment/post-comment?postId=${postId}`
      );
      return res.data.comments;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    loading: false,
    error: null,
    comments: [],
    singleComment: {},
    singleCommentError: null,
    numberOfLikes: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCommentForPost.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.comments = [];
    });
    builder.addCase(getCommentForPost.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getCommentForPost.rejected, (state, action) => {
      state.error = action.payload;
      state.comments = [];
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.comments.unshift(action.payload);
      state.singleComment = action.payload;
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.singleComment = {};
      state.singleCommentError = action.payload;
    });
  },
});

export default commentSlice.reducer;
