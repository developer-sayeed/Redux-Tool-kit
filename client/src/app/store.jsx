import { configureStore } from "@reduxjs/toolkit";

import CounterReducer from "../features/Counter/CounterSlice.js";
import TodoReducer from "../features/Todo/TodoSlice.js";
import UserReducer from "../features/User/userSlice.js";

const store = configureStore({
  reducer: {
    counter: CounterReducer,
    todo: TodoReducer,
    user: UserReducer,
  },
});

// export
export default store;
