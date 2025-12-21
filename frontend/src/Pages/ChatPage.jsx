import { useState } from "react";
import Header from "../components/Header";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";


export default function ChatPage() {
const [messages, setMessages] = useState([]);


const handleNewMessage = (msg) => {
setMessages((prev) => [...prev, msg]);
};


return (
<div className="chat-page">
<Header />


<div className="chat-box">
{messages.map((m, i) => (
<ChatMessage key={i} sender={m.sender} text={m.text} />
))}
</div>


<ChatInput onSend={handleNewMessage} />
</div>
);
}