import './App.css'
import { useState } from 'react'
import Message from "./components/Message"

<Message sender="right" message="Hello"></Message>
const State = { LEFT: 0, RIGHT: 1 };

function App(props) {
  const [messages, setMessages] = useState([]);
  function textareaLeftHandler(e) {
    if (e.key == "Enter" && e.target.value != "") { 
        console.log(`left enter pressed: ${e.target.value}`);
        setMessages([<Message sender="left" message={e.target.value}></Message>].concat(messages));
        console.log(messages, messages.length);
        e.target.value = "";
    }
    return;
  }
  function textareaRightHandler(e) {
    if (e.key == "Enter") { 
        console.log(`right enter pressed: ${e.target.value}`);
        setMessages([<Message sender="right" message={e.target.value}></Message>].concat(messages));
        console.log(messages, messages.length);
        e.target.value = "";
    }
    return;
  }
  document.addEventListener("keydown", (e) => {
    if (e.key == "Delete") setMessages([]);
  })
  const textareaLeft = <input rows={3} cols={40} onKeyDown={textareaLeftHandler} className="float-left" type="text"></input>;
  const textareaRight = <input onKeyDown={textareaRightHandler} className="float-right" type="text"></input>;
  return (
    <>
      <div className="message-container">
        {messages}
      </div>
      {textareaLeft}
      {textareaRight}
    </>
  );
}

export default App
