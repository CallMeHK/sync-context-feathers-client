import React from "react";
import { useFeathersState } from "../client-hook/useFeathers";

export default function PublicMessage() {
  const params = { url: "http://localhost:3030", service: "public-message" };
  const [loading, msgs, setter] = useFeathersState(params);
  return (
    <div className="App">
      <h4>Public Messages</h4>
      <p>This component uses socket.io and feathers to get real time data.</p>
      <div />
      <button
        className="waves-effect waves-light btn"
        onClick={() => setter.create({ text: "this is a message" })}
      >
        add a message
      </button>
      <button
        className="waves-effect waves-light btn"
        onClick={() => setter.create({ text: "this is a different message" })}
      >
        add a different message
      </button>

      {!loading && (
        <div>
          {msgs.map(elt => (
            <div className="card" style={{ maxWidth: "530px" }} key={elt._id}>
              <div className="card-content">
                <p>{elt.text}</p>
                <div
                  className="card-action"
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <button
                    className="waves-effect waves-light btn"
                    onClick={() => setter.remove(elt._id)}
                  >
                    Remove
                  </button>
                  <button
                    className="waves-effect waves-light btn"
                    onClick={() =>
                      setter.patch(elt._id, { text: `${elt.text} was patched` })
                    }
                  >
                    Patch
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
