import React from "react";
import { ContextOne } from "../ContextOne";

export default function ContextMsg() {
  let { state, dispatch } = React.useContext(ContextOne);

  document.title = `ContextMsg`;

  const onCount = num => {
    dispatch({ type: "set-count-to", payload: state.count + num });
    console.log(state);
  };
  
  return (
    <div className="App">
      <h4>SocketIo with useContext</h4>
      <p>
        This is the Context Socket.io Demo, values should sorta persist in the same way
        values persist in redux. The context will sync with the stupid socket over in feathers.
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
