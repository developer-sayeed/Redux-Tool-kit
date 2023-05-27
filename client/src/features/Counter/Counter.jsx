import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, ot, reset } from "./CounterSlice";

const Counter = () => {
  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>++</button>
      <button onClick={() => dispatch(decrement())}>--</button>
      <button onClick={() => dispatch(reset())}>reset</button>
      <button onClick={() => dispatch(ot(900))}>OT</button>
    </>
  );
};

export default Counter;
