import React from "react";
import { ContextOne } from "../ContextOne";

export default function ContextDemo() {
  let { state, dispatch } = React.useContext(ContextOne);

  document.title = `ContextDemo: ${state.count}`;

  const onCount = num => {
    dispatch({ type: "set-count-to", payload: state.count + num });
  };

  return (
    <div className="App">
      <h4>Count with useContext</h4>
      <p>
        This is the ContextDemo, values should sorta persist in the same way
        values persist in redux. There is a reducer and stuff to change values,
        but its a little less wacky and easier to use.
      </p>
      <h3>You clicked {state.count} times!</h3>

      <button
        className="waves-effect waves-light btn"
        onClick={() => onCount(-1)}
      >
        Decrement
      </button>
      <button
        className="waves-effect waves-light btn"
        onClick={() => onCount(1)}
      >
        Increment
      </button>
    </div>
  );
}
