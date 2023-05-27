import { createSlice } from "@reduxjs/toolkit";

export const TodoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    msg: "",
  },
  reducers: {
    addnewTodo: (state, { type, payload }) => {
      // state.todos = [...state.todos, payload];
      state.todos.push(payload);
    },
    deleteTodo: (state, { type, payload }) => {
      state.todos = state.todos.filter((data) => data !== payload);
    },
  },
});

export const { addnewTodo, deleteTodo } = TodoSlice.actions;

// export

export default TodoSlice.reducer;
