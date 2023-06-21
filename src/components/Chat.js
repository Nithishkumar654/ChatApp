import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AllChats from "./AllChats";
import Conversation from "./Conversation";
import EmptyChat from "./EmptyChat";

function Chat() {
  let [person, showPerson] = useState({});

  const navigate = useNavigate();
  let [show, setShow] = useState(false);
  let [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .post("https://chtvthme.onrender.com/user-api/pathjump", { token: token })
      .then((res) => {
        if (res.data.success !== true) {
          alert(res.data.message);
          localStorage.clear();
          navigate("/login");
        }
      })
      .catch((err) => alert("Error: " + err.message));
  }, []);

  return (
    <div
      className="row flex-grow-1 m-0"
      style={{ maxHeight: "100%", position: "relative" }}
    >
      {person.userid === undefined ? (
        <div className="col col-md-4 d-block p-0" style={{ maxHeight: "100%" }}>
          <AllChats
            show={show}
            setShow={setShow}
            message={message}
            setMessage={setMessage}
            showPerson={showPerson}
          />
        </div>
      ) : (
        <div
          className="col col-md-4 d-none d-md-block p-0"
          style={{ maxHeight: "100%" }}
        >
          <AllChats
            show={show}
            setShow={setShow}
            message={message}
            setMessage={setMessage}
            showPerson={showPerson}
          />
        </div>
      )}
      <div
        className="col d-none d-md-block p-0 conversations"
        style={{ maxHeight: "100%" }}
      >
        {person.userid === undefined ? (
          <EmptyChat />
        ) : (
          <Conversation
            setShow={setShow}
            setMessage={setMessage}
            person={person}
            showPerson={showPerson}
          />
        )}
      </div>

      {person.userid !== undefined && (
        <div className="col d-block d-md-none" style={{ maxHeight: "100%" }}>
          <Conversation
            setShow={setShow}
            setMessage={setMessage}
            person={person}
            showPerson={showPerson}
          />
        </div>
      )}
    </div>
  );
}

export default Chat;
