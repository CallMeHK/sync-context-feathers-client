import { useState, useEffect } from "react";

import io from "socket.io-client";
import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";

function useFeathersSocket(url) {
  const socket = io(url);
  let app = feathers();
  app.configure(socketio(socket));
  return app;
}

function useFeathersService(app, service) {
  const findAll = () => {
    return app
      .service(service)
      .find({ query: { $limit: null } })
      .then(res => {
        console.log(res.data);
        return res.data;
      });
  };

  return findAll();
}

function useListener(app, service, event, callback) {
  app.service(service).on(event, res => {
    console.log(`heard about ${event}: `, res);
    callback(res);
  });
}

function useService(app, service, action, data, callback) {
  if (action === "create") {
    app
      .service(service)
      .create(data.body)
      .then(res => {
        callback(res);
      });
  } else if (action === "remove") {
    app
      .service(service)
      .remove(data.id)
      .then(res => {
        callback(res);
      });
  } else if (action === "patch") {
    app
      .service(service)
      .patch(data.id, data.body)
      .then(res => {
        callback(res);
      });
  }
}
// params:
//    Service is required, must provide either url or socket
//         {
//           service: (required) feathers service name for socket
//           url: (optional) url of feathers server, not the rest api of the service
//           socket: (optional) if socket is already set up with another state, use socket
//          }
function useFeathersState(params) {
  let app;
  if (params.app === undefined) {
    app = useFeathersSocket(params.url);
  } else {
    app = params.socket;
  }
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    useFeathersService(app, params.service).then(res => {
      setState(res);
      setLoading(false);
    });

    useListener(app, params.service, "created", res =>
      setState(state => [...state, res])
    );

    useListener(app, params.service, "removed", res =>
      setState(state => state.filter(elt => elt._id !== res._id))
    );

    useListener(app, params.service, "patched", res =>
      setState(state => {
        const patchIndex = state.findIndex(elt => elt._id === res._id);
        let newState = state;
        newState[patchIndex] = res;
        return newState;
      })
    );
    
  }, []);

  const create = req => {
    const data = { body: req };
    useService(app, params.service, "create", data, msg =>
      console.log("message created: ", msg)
    );
  };

  const remove = id => {
    const data = { id: id };
    useService(app, params.service, "remove", data, msg =>
      console.log("message removed: ", msg)
    );
  };

  const patch = (id, req) => {
    const data = { id: id, body: req };
    useService(app, params.service, "patch", data, msg =>
      console.log("message patched: ", msg)
    );
  };

  const funcs = {
    create: create,
    remove: remove,
    patch: patch,
    set: setState,
    app: app
  };

  return [loading, state, funcs];
}

export {
  useFeathersService,
  useFeathersSocket,
  useListener,
  useService,
  useFeathersState
};