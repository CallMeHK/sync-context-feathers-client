import React, { useEffect } from "react";
import { useFeathersSocket, useFeathersService } from "../client-hook/useFeathers"

export default function PublicMessage() {
    let app = useFeathersSocket("http://localhost:3030");
    const [ messages, setMessages ] = useFeathersService(app, 'public-message')

  useEffect(() => {
    
    //app.service('public-message').find({ query: { $limit: null } }).then(res => console.log('found all via service',res))
    _setUpListener();
  }, []);

  const _setUpListener = () => {
      app.service('public-message').on('created', res => console.log(res))
      console.log('listener set up')
  }

  const _testMessage = () => {
    app.service('public-message').create({text:'this is a test'}).then(msg => console.log('message created: ',msg))
  }

  return (
    <div className="App">
      <h4>Public Messages</h4>
      <p>This component uses socket.io and feathers to get real time data.</p>
      <div></div>
      <button
        className="waves-effect waves-light btn"
        onClick={_setUpListener}
      >
        Set up listener
      </button>
      <button
        className="waves-effect waves-light btn"
        onClick={_testMessage}
      >
        Submit
      </button>
    </div>
  );
}
