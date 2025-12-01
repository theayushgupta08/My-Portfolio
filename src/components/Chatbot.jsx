import { useState, useRef, useEffect } from "react";
import ChatbotIcon from "./componentsChatbot/Chatboticon";
import ChatForm from "./componentsChatbot/ChatForm";
import ChatMessage from "./componentsChatbot/ChatMessage";
import { mydata } from "./componentsChatbot/mydata";
import { getResponse } from "./componentsChatbot/chatbotLogic";

const Chatbot = () => {

  const [chatHistory, setChatHistory] = useState([{ hideInChat: true, role: "model", text: mydata }]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  const generateBotResponse = (history) => {

    // Updating Chat history with bot response
    const updateHistory = (text, isError = false) => {
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Typing..."), { role: "model", text, isError }]);
    }

    try {
      // Get the last user message from history
      const lastUserMessage = history
        .filter(msg => !msg.hideInChat && msg.role === "user")
        .pop();
      
      if (!lastUserMessage) {
        updateHistory("I'm here to help! Please ask me a question.", false);
        return;
      }

      // Get response from local chatbot logic
      const userMessage = lastUserMessage.text;
      const botResponse = getResponse(userMessage);
      
      // Simulate a small delay for better UX
      setTimeout(() => {
        updateHistory(botResponse, false);
      }, 300);

    } catch (error) {
      updateHistory("I encountered an error. Please try again or contact directly via email.", true);
    }

  };


  useEffect(() => {
    // Auto Scroll when history updates
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [chatHistory]);



  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button onClick={() => setShowChatbot((prev) => !prev)} id="chatbot-toggler">
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded">close</span>
      </button>
      <div className="chatbot-popup">

        {/* chatbot header  */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button onClick={() => setShowChatbot((prev) => !prev)} className="chatbot-btn material-symbols-rounded">keyboard_arrow_down</button>
        </div>

        {/* chatbot body  */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              👋 Hi there! I'm <strong>GuptaGPT</strong>, your AI assistant. <br />
              I'm here to help answer questions about Ayush Gupta's portfolio, skills, projects, and experience. 
              Feel free to ask me anything! 😊
            </p>
          </div>

          {/* Rendering chat message dynamically */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}

        </div>

        {/* chatbot footer  */}
        <div className="chat-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
        </div>
      </div>
    </div>
  );
};
export default Chatbot
