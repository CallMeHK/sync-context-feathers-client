import React, { useState, useEffect } from "react";
import {
  useFeathersSocket,
  useFeathersService,
  useCreated,
  useListener,
  useService
} from "../client-hook/useFeathers";

export default function PublicMessage() {
  let app = useFeathersSocket("http://localhost:3030");
  const [msgs, setMsgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    useFeathersService(app, "public-message").then(res => {
      setMsgs(res);
      setLoading(false);
    });

    useListener(app, "public-message", "created", res =>
      setMsgs(msgs => [...msgs, res])
    );
    useListener(app, "public-message", "removed", res =>
      setMsgs(msgs => msgs.filter(elt => elt._id != res._id))
    );
  }, []);

  const _testMessage = () => {
      useService(app, "public-message", 'create', { text: "this is a test" }, msg => console.log("message created: ", msg))

  };

  const _removeMessage = id => {
      useService(app, "public-message", 'remove', id, msg => console.log("message removed: ", msg))

  };

  return (
    <div className="App">
      <h4>Public Messages</h4>
      <p>This component uses socket.io and feathers to get real time data.</p>
      <div />
      <button className="waves-effect waves-light btn" onClick={_testMessage}>
        add a message
      </button>
      <button
        className="waves-effect waves-light btn"
        onClick={() => {
          useCreated(app, "public-message", {
            text: "hi there from useFeathers"
          });
        }}
      >
        add a different message
      </button>

      {!loading && (
        <div>
          {msgs.map(elt => (
            <div key={elt._id}>
              {elt.text}
              <button onClick={() => _removeMessage(elt._id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
