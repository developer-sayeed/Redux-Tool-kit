import { createSlice } from "@reduxjs/toolkit";

export const CounterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
    msg: "",
    err: null,
  },
  reducers: {
    increment: (state, { type, payload }) => {
      state.count = state.count + 1;
    },
    decrement: (state, { type, payload }) => {
      state.count = state.count - 1;
    },
    reset: (state, { type, payload }) => {
      state.count = 0;
      state.msg = "Reset Done";
    },
    ot: (state, { type, payload }) => {
      state.count = payload;
      state.msg = "OT Done";
    },
  },
});

export const { increment, decrement, reset, ot } = CounterSlice.actions;

// export

export default CounterSlice.reducer;
