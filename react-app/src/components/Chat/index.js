// import the socket
import { io } from 'socket.io-client';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import './Chat.css'

// outside of your component, initialize the socket variable
let socket;

function Chat({project}) {
	const [messages, setMessages] = useState([])
	// use state for controlled form input
	const [chatInput, setChatInput] = useState("");
	const user = useSelector((state) => state.session.user)
	const lastMessage = useRef(null)

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

	useEffect(() => {
		lastMessage.current?.scrollIntoView({behavior:"smooth"})
	}, [messages])


	const sendChat = (e) => {
		e.preventDefault()
		// emit a message
		socket.emit("chat", { user:{ "username" :user.username, "id":user.id}, msg: chatInput });
		// clear the input field after the message is sent
		setChatInput("")
	}


	return (user && (
        <div className='chat-div'>
			<div className='chat-name-p'>
			<p className='chat-project-name'>{project.name} Chat</p>

			</div>
            <div className='chat-messages'>
                {messages.map((message, ind) => (
					
                    <div key={ind} className={message.user.id === user.id ? "users-message" : 'others-message'}>{`${message.user.username}: ${message.msg}`}</div>
                ))}
				<p className='space-filler' ref={lastMessage}>space</p>
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