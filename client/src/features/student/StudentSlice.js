import { createSlice } from "@reduxjs/toolkit";

// initial State

const initialState = {
  student: "",
  loading: null,
  message: "",
  error: null,
};

//  Student Slice
const StudentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

// export Slice

//  Export Action
export const {} = StudentSlice.actions;
// Export
export default StudentSlice.reducer;
