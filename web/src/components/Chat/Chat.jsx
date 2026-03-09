import React, { useEffect, useState, useRef } from "react";
import { store } from "../../services/state.js";
import { wsService } from "../../services/websocket.js";
import "./Chat.css";

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const boxRef = useRef(null);

  // Utilisation de refs pour suivre les derniers messages reçus et éviter les doublons dus aux multiples rendus
  const lastUserRef = useRef(null);
  const lastJarvisRef = useRef(null);

  useEffect(() => {
    const unsub = store.subscribe((state) => {
      if (
        state.lastUserMessage &&
        state.lastUserMessage !== lastUserRef.current
      ) {
        lastUserRef.current = state.lastUserMessage;
        setMessages((prev) => [
          ...prev,
          {
            text: state.lastUserMessage,
            sender: "user",
            id: Date.now() + "-u",
          },
        ]);
      }

      if (
        state.lastJarvisMessage &&
        state.lastJarvisMessage !== lastJarvisRef.current
      ) {
        lastJarvisRef.current = state.lastJarvisMessage;
        setMessages((prev) => [
          ...prev,
          {
            text: state.lastJarvisMessage,
            sender: "jarvis",
            id: Date.now() + "-j",
          },
        ]);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    wsService.send("ui.text_input", { text });
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box" ref={boxRef}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`msg ${msg.sender}`}
            style={{ animation: "slideUpFade 0.3s ease-out forwards" }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          className="chat-input"
          placeholder="ACCURATE INPUT COMMAND..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="chat-send-btn" onClick={handleSend}>
          ➤
        </button>
      </div>
    </div>
  );
};
