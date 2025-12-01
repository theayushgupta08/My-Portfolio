
import ChatbotIcon from "./Chatboticon";
import TypingIndicator from "./TypingIndicator";

const ChatMessage = ({ chat }) => {
    const isTyping = chat.text === "Typing...";
    
    return (
        !chat.hideInChat && (
            <div className={`message ${chat.role === "model" ? "bot" : "user"}-message ${chat.isError ? "error" : ""}`}>

                {/* Adding chatbot icon only if chat role is model */}
                {chat.role === "model" && <ChatbotIcon />}
                {isTyping ? (
                    <div className="message-text">
                        <TypingIndicator />
                    </div>
                ) : (
                    <p className="message-text">{chat.text}</p>
                )}
            </div>
        )
    );
};

export default ChatMessage
