import * as React from "react";
import Auth from "./old/useFeathersAuth"

let ContextOne = React.createContext();

let initialState = {
  count: 1,
  auth:''
}; 

let reducer = (state, action) => {
  switch (action.type) {
    case "set-count-to":
      return { ...state, count: action.payload };
    case "set-auth-token":
        const creds = action.payload;
        return Auth.login(creds.email, creds.password)
        .then(res => {
            console.log(res.accessToken)
            return { ...state, auth: res.accessToken }
        }).catch( e => console.log("login error: ", e))
    default:
      return state;
  }
};

function ContextOneProvider(props) {
  // [A]
  let [state, dispatch] = React.useReducer(reducer, initialState);
  let value = { state, dispatch };

  // [B]
  return (
    <ContextOne.Provider value={value}>{props.children}</ContextOne.Provider>
  );
}

let ContextOneConsumer = ContextOne.Consumer;

// [C]
export { ContextOne, ContextOneProvider, ContextOneConsumer };
