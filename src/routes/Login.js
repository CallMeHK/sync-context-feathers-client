import React, { useState } from "react";
import { ContextOne } from "../ContextOne";

export default function Login() {
  let { state, dispatch } = React.useContext(ContextOne);
  const [creds, updateCreds] = useState({ email: "feathers@example.com", password: "secret" });

  const onSubmit = () => {
    dispatch({ type: "set-auth-token", payload: creds });
  };


  const onChangeEmail = e => {
    e.persist();
    updateCreds(w => {
      return { email: e.target.value, password: creds.password };
    });
  };
  const onChangePassword = e => {
    e.persist();
    updateCreds(w => {
      return { email: creds.email, password: e.target.value };
    });
  };

  return (
    <div className="App">
      <h4>Login</h4>
      <p>Login here</p>

      <input value={creds.email} type="text" placeholder="Email" onChange={onChangeEmail} />
      <input
       value={creds.password}
        type="password"
        placeholder="Password"
        onChange={onChangePassword}
      />

      <button
        className="waves-effect waves-light btn"
        onClick={onSubmit}
      >
        Login
      </button>
    </div>
  );
}
