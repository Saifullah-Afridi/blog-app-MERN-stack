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

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    singleComment: {},
    singleCommentError: null,
    numberOfLikes: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.singleComment = action.payload;
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.singleComment = {};
      state.singleCommentError = action.payload;
    });
  },
});

export default commentSlice.reducer;
