// import the socket
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Chat.css'

// outside of your component, initialize the socket variable
let socket;

function Chat() {
	const [messages, setMessages] = useState([])
	// use state for controlled form input
	const [chatInput, setChatInput] = useState("");
	const user = useSelector((state) => state.session.user)

	useEffect(() => {
		socket = io();

		// listens for chat events
		socket.on('chat', (chat) => {
			setMessages(messages => [...messages, chat])
		})
		
		//when component unmounts disconnect
		return (() => {
            socket.disconnect()
        })

	},[])


	const sendChat = (e) => {
		e.preventDefault()
		// emit a message
		socket.emit("chat", { user: user.username, msg: chatInput });
		// clear the input field after the message is sent
		setChatInput("")
	}


	return (user && (
        <div className='chat-div'>
            <div className='chat-messages'>
                {messages.map((message, ind) => (
                    <div key={ind}>{`${message.user}: ${message.msg}`}</div>
                ))}
            </div>
			<div className='chat-form-div'>
		
            <form className='chat-form' onSubmit={sendChat}>
                <input
					className='chat-input'
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
			</div>
        </div>
    )
    )

}

export default Chat;