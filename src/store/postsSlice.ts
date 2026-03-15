import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPostsByUserId } from "@/lib/api";
import type { Post } from "@/types";

export const loadPostsByUserId = createAsyncThunk(
  "posts/fetchByUserId",
  async (userId: number, { rejectWithValue }) => {
    try {
      return { userId, posts: await fetchPostsByUserId(userId) };
    } catch {
      return rejectWithValue("Something went wrong");
    }
  }
);

interface PostsState {
  posts: Record<number, Post[]>;
  postsLoading: boolean;
  postsError: string | null;
}

const initialState: PostsState = {
  posts: {},
  postsLoading: false,
  postsError: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPostsByUserId.pending, (state) => {
        state.postsLoading = true;
        state.postsError = null;
      })
      .addCase(loadPostsByUserId.fulfilled, (state, action) => {
        state.postsLoading = false;
        state.posts[action.payload.userId] = action.payload.posts;
      })
      .addCase(loadPostsByUserId.rejected, (state, action) => {
        state.postsLoading = false;
        state.postsError = action.payload as string;
      });
  },
});

export default postsSlice.reducer;
