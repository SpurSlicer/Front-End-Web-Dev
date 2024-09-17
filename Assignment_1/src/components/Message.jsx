import './Message.css'
import {useRef} from 'react'

function Message(props) {
  const text_length = props.message.length * 11;
  return (
    <div className={props.sender} /*style={{width: `${text_length}px`}}*/>
      <p>{props.message}</p>
    </div>
  );
}

export default Message;
