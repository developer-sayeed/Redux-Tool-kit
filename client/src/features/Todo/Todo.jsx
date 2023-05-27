import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addnewTodo, deleteTodo } from "./TodoSlice";

const Todo = () => {
  const { todos, msg } = useSelector((state) => state.todo);
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  return (
    <>
      <h4>Todo List</h4>
      <br />
      <input
        type="text"
        placeholder="Todo"
        value={todo}
        required
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={() => dispatch(addnewTodo(todo))}>add</button>
      <ul>
        {todos.length > 0
          ? todos.map((item, index) => {
              return (
                <li key={index}>
                  {item}
                  <button onClick={() => dispatch(deleteTodo(item))}>X</button>
                </li>
              );
            })
          : "No Todo to Found"}
      </ul>
    </>
  );
};

export default Todo;
