import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SideNav from "./components/SideNav";
import useWindowSize from './client-hook/useWindowSize'
import { ContextOneProvider } from "./ContextOne";

import ContextDemo from "./routes/ContextDemo";
import Login from "./routes/Login";
import PublicMessage from "./routes/PublicMessage"


const Index = () => {
  document.title = "react-context-feathers";
  const size = useWindowSize();

  return (
    <div>
      <h4>Welcome fellow hook enthusiasts!</h4>
      <p style={{ margin: "20px" }}>
        Welcome to this crappy page that I stuck some examples from the new
        hooks api. Check out the code to see some useState, useContext, and
        useEffect Action!
      </p>
      <p>
        The window dimensions are currently {size.width}px / {size.height}px
        according to the useWindowSize hook.
      </p>
    </div>
  );
};

function App() {
  const menuPaths = [
    {
      name: "Home",
      path: "/"
    },
    {
      name: "ContextDemo",
      path: "/contextdemo"
    },
    {
      name: "Login",
      path: "/login"
    },
    {
      name: "PublicMessage",
      path: "/pubmsg"
    }
  ];
  return (
    <ContextOneProvider>
  <Router>
    <div className="App">
      <SideNav paths={menuPaths} title="Hooks" />
      <div className="container-margin">
        <div className="container">
          <Route path="/" exact component={Index} />
          <Route path="/contextdemo/" component={ContextDemo} />
          <Route path="/login/" component={Login} />
          <Route path="/pubmsg/" component={PublicMessage} />
        </div>
      </div>
    </div>
    </Router></ContextOneProvider>
  );
}

export default App;
