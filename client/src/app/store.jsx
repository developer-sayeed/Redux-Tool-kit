import { configureStore } from "@reduxjs/toolkit";

import CounterReducer from "../features/Counter/CounterSlice";
import TodoReducer from "../features/Todo/TodoSlice";
import UserReducer from "../features/User/userSlice";
import StudentReducer from "../features/student/StudentSlice";

const store = configureStore({
  reducer: {
    counter: CounterReducer,
    todo: TodoReducer,
    user: UserReducer,
    student: StudentReducer,
  },
});

// export
export default store;
