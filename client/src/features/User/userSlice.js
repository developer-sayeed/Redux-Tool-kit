import { createSlice } from "@reduxjs/toolkit";
import { createUser, deleteUser, featchAllUser } from "./userApi";

// initialState

const initialState = {
  user: [],
  loading: null,
  message: "",
  error: null,
};
//  Crearte User Slcie

export const userSlice = createSlice({
  name: " user",
  initialState,
  reducers: {},
  extraReducers: (buldier) => {
    buldier
      .addCase(featchAllUser.pending, (state, { type, payload }) => {
        state.loading = true;
      })
      .addCase(featchAllUser.fulfilled, (state, { type, payload }) => {
        state.loading = false;
        state.user = payload;
      })
      .addCase(featchAllUser.rejected, (state, { type, payload }) => {
        state.loading = false;
      })
      .addCase(deleteUser.pending, (state, { type, payload }) => {
        state.loading = true;
      })
      .addCase(deleteUser.rejected, (state, { type, payload }) => {
        state.loading = false;
      })
      .addCase(deleteUser.fulfilled, (state, { type, payload }) => {
        state.user = state.user.filter((data) => data._id !== payload);
        state.loading = false;
      })

      .addCase(createUser.pending, (state, { type, payload }) => {
        state.loading = true;
      })

      .addCase(createUser.fulfilled, (state, { type, payload }) => {
        state.user.push(payload.user);
        state.loading = false;
        state.message = payload.message;
      })

      .addCase(createUser.rejected, (state, { type, payload }) => {
        state.loading = false;
      });
  },
});

//  Export Slcie Selector

export const getAllUserData = (state) => state.user;

// Slice Export
export const {} = userSlice.actions;
export default userSlice.reducer;
