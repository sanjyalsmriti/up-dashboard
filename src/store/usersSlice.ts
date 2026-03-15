import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers } from "@/lib/api";
import type { User } from "@/types";

export const loadUsers = createAsyncThunk(
  "users/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchUsers();
    } catch {
      return rejectWithValue("Something went wrong");
    }
  }
);

interface UsersState {
  users: User[];
  apiIsLoading: boolean;
  apiError: string | null;
}

const initialState: UsersState = {
  users: [],
  apiIsLoading: false,
  apiError: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.apiIsLoading = true;
        state.apiError = null;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.apiIsLoading = false;
        state.users = action.payload;
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.apiIsLoading = false;
        state.apiError = action.payload as string;
      });
  },
});

export default usersSlice.reducer;
