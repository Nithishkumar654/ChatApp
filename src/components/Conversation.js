import React, { useState } from "react";
import Convo from "./Convo";
import Footer from "./Footer";
import Header from "./Header";

function Conversation({ setShow, setMessage, person, showPerson }) {
  let [send, setSend] = useState(false);
  return (
    <>
      <Header person={person} showPerson={showPerson} />
      <Convo
        person={person}
        send={send}
        setSend={setSend}
        setShow={setShow}
        setMessage={setMessage}
      />
      <Footer person={person} setSend={setSend} />
    </>
  );
}

export default Conversation;
