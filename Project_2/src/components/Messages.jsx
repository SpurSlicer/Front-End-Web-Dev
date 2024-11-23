import './Messages.css'
import {Component, useRef, useEffect, useState} from 'react'


export class Message extends Component {
    constructor(props, text) {
        super(props);
        this.text = text;
    }
    setText(text) { 
        this.text = text;
    }
    displayMessage() {
        return (
            <div className='message'>
                {this.text}
            </div>
        )
    }
    render() {
        return (<></>)
    }
}

export class Messages extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.messages = [new Message(props, "test"+Math.random())];
    }
    addMessage(text) { 
        this.messages.push(new Message(this.props, text));
    }
    displayMessages() {
        const message_texts = [];
        for (const message of this.messages) {
            message_texts.push(message.displayMessage());
        }
        return message_texts.reverse();
    }
    render() {
        return (
            <>
                <div className='messages'>
                    {this.displayMessages()}
                </div>
                <div className="send_message">
                    <input type="text" onKeyDown={(e) => {
                        if (e.key == "Enter") {
                            this.addMessage(e.target.value);
                            e.target.value = ""; 
                            this.props.children.setUpdate(!this.props.children.update);
                        }
                    }}></input>
                </div>
            </>
        )
    }
}