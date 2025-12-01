import React, { useRef } from 'react'

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {

    const inputRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const usermessage = inputRef.current.value.trim();
        if (!usermessage) return;
        inputRef.current.value = "";

        // Updating setChatHistory with user message 
        setChatHistory((history) => [...history, { role: "user", text: usermessage }]);

        setTimeout(() => {
            // Adding typing message to bot response
            setChatHistory((history) => [...history, { role: "model", text: "Typing..." }]);
            generateBotResponse([...chatHistory, { role: "user", text: usermessage }]);

        }, 600);


    }
    return (
        <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
            <input ref={inputRef} type="text" placeholder="Your message..." className="message-input" />

            <button className="material-symbols-rounded">arrow_upward</button>
        </form>

    )
}

export default ChatForm
