import { useState } from "react";
import io from "socket.io-client";
import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";

function useFeathersSocket(url) {
  const socket = io(url);
  let app = feathers();
  app.configure(socketio(socket));
  return app;
};

function useFeathersService(app, service) {

  const findAll = () => {
    return app.service(service)
      .find({ query: { $limit: null } })
      .then(res => {
        console.log(res.data);
        return res.data;
      });
  };

//   const _setUpListener = () => {
//     app.service('public-message').on('created', res => console.log(res))
// }
  const [ msgs, setMsgs ] = useState([]);
  findAll().then(res => {setMsgs(e => res)})
  
  return 

};

export { useFeathersService, useFeathersSocket }