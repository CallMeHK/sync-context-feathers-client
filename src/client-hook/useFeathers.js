import { useState, useEffect } from "react";
import {useAsync} from 'react-use';

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

  return findAll()
};

function useCreated(app, service, data){
    app.service(service).create(data).then(res => {console.log("created: ", res)});
}

function useListener(app, service, event, callback){
    app.service(service).on(event, res => {console.log(`heard about ${event}: `,res); callback(res)})
}

export { useFeathersService, useFeathersSocket, useCreated, useListener }


  







//   const _setUpListener = () => {
//     app.service('public-message').on('created', res => console.log(res))
// }
  //const [ msgs, setMsgs ] = useState([]);
  

//   function useStateToDb() {
//       return findAll().then(res => setMsgs(res))
      
//   }
  
  //console.log([ msgs, setMsgs ])

  //useStateToDb().then(() => [ msgs, setMsgs ]);
