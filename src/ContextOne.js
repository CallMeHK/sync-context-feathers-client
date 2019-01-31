import * as React from "react";
import { useEffect } from "react";
import io from "socket.io-client";
import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";

let ContextOne = React.createContext();
const params = { url: "http://localhost:3030", service: "public-message" };

const useFeathersSocket = url => {
  const socket = io(url);
  let app = feathers();
  app.configure(socketio(socket));
  return app;
};

let initialState = {
  count: 1,
  feathers: { app: useFeathersSocket(params.url, params.service) }
};

function useFeathersFindAll(app, service) {
  return app
    .service(service)
    .find({ query: { $limit: null } })
    .then(res => {
      console.log("got all");
      return res.data;
    });
}

let reducer = (state, action) => {
  switch (action.type) {
    case "set-count-to":
      return { ...state, count: action.payload };
    case "set-feathers":
      console.log(action);
      return { ...state, feathers: { ...feathers, msg: action.payload } };
    default:
      return state;
  }
};

function useListener(app, service, event, callback) {
  app.service(service).on(event, res => {
    console.log(`heard about ${event}: `, res);
    callback(res);
  });
}

function ContextOneProvider(props) {
  let [state, dispatch] = React.useReducer(reducer, initialState);
  let value = { state, dispatch };

  useEffect(() => {
    useFeathersFindAll(state.feathers.app, params.service)
      .then(res => {
        dispatch({ type: "set-feathers", payload: res });
        return res;
      })
      .then(call => {
        useListener(state.feathers.app, params.service, "created", res => {
          let msgs;
          if (state.feathers.msg !== undefined) {
            msgs = state.feathers.msg;
          } else {
            msgs = call;
          }
          console.log(msgs);
          msgs.unshift(res);
          console.log("context heard created: ", res);
          dispatch({ type: "set-feathers", payload: msgs });
        });

        useListener(state.feathers.app, params.service, "removed", res => {
          let msgs;
          if (state.feathers.msg !== undefined) {
            msgs = state.feathers.msg;
          } else {
            msgs = call;
          }
          console.log("msgs: ", msgs);
          const newMsgs = msgs.filter(elt => elt._id !== res._id);
          console.log("newMsgs: ", newMsgs);
          console.log("context heard removed: ", res);
          dispatch({ type: "set-feathers", payload: newMsgs });
        });
      });

    //

    // useListener(state.feathers.app, params.service, "patched", res =>
    //   setState(state => {
    //     const patchIndex = state.findIndex(elt => elt._id === res._id);
    //     let newState = state;
    //     newState[patchIndex] = res;
    //     return newState;
    //   })
    // );
  }, []);

  return (
    <ContextOne.Provider value={value}>{props.children}</ContextOne.Provider>
  );
}

let ContextOneConsumer = ContextOne.Consumer;

export { ContextOne, ContextOneProvider, ContextOneConsumer };
