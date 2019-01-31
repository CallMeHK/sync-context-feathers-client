import * as React from "react";
import { useEffect } from "react";

let ContextOne = React.createContext();

let initialState = {
  count: 1,
}; 

let reducer = (state, action) => {
  switch (action.type) {
    case "set-count-to":
      return { ...state, count: action.payload };
    default:
      return state;
  }
};

function ContextOneProvider(props) {
  let [state, dispatch] = React.useReducer(reducer, initialState);
  let value = { state, dispatch };
  
  useEffect(() => {dispatch({ type: "set-count-to", payload: state.count + 3 })}, [] )
    
  

  
  return (
    <ContextOne.Provider value={value}>{props.children}</ContextOne.Provider>
  );
}

let ContextOneConsumer = ContextOne.Consumer;

export { ContextOne, ContextOneProvider, ContextOneConsumer };
