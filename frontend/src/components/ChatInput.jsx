import { useState } from "react";
import axios from "axios";


export default function ChatInput({ onSend }) {
const [message, setMessage] = useState("");


const handleSend = async () => {
if (!message.trim()) return;


onSend({ sender: "user", text: message });


const res = await axios.post("http://127.0.0.1:5000/chat", { message });
onSend({ sender: "bot", text: res.data.reply });


setMessage("");
};


return (
<div className="chat-input-container">
<input
type="text"
placeholder="Type your message..."
value={message}
onChange={(e) => setMessage(e.target.value)}
className="chat-input"
/>
<button onClick={handleSend} className="send-btn">Send</button>
</div>
);
}