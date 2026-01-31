import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { AUTH_BASE_URL } from "../../services/auth";

const socket = io(AUTH_BASE_URL, {
  transports: ["websocket"],
});

export default function ChatWindow({ onClose }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // 🔥 Get SAME open session for everyone
  useEffect(() => {
    const initSession = async () => {
      try {
        // 1. Get any open session
        const res = await axios.get(
          `${AUTH_BASE_URL}/api/chat-support/sessions`,
          { params: { status: "Open", userId : user.id } }
        );

        let openSession = res.data.data?.[0];

        // 2. If no open session, create one
        if (!openSession && user?.id) {
          const create = await axios.post(
            `${AUTH_BASE_URL}/api/chat-support/sessions`,
            { userId: user.id }
          );
          openSession = create.data.data;
        }

        localStorage.setItem("chatSessionId", openSession._id);
        setSessionId(openSession._id);
      } catch (err) {
        console.error("Session init failed:", err);
      }
    };

    initSession();
  }, [user]);

  // 🔹 Socket join & message fetch
  useEffect(() => {
    if (!sessionId) return;

    socket.emit("joinChat", sessionId);

    axios
      .get(`${AUTH_BASE_URL}/api/chat-support/sessions/${sessionId}/messages`)
      .then((res) => setMessages(res.data.data))
      .catch(console.error);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, [sessionId]);

  // 🔹 Send message
  const send = async () => {
    if (!text.trim() || !sessionId) return;

    try {
      await axios.post(
        `${AUTH_BASE_URL}/api/chat-support/sessions/${sessionId}/messages`,
        {
          userId: user.id,
          message: text,
        }
      );

      setText("");
    } catch (err) {
      console.error("Send failed:", err);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white shadow-xl rounded-lg flex flex-col z-50">
      {/* Header */}
      {console.log("Render ChatWindow with sessionId:", sessionId)}
      <div className="flex justify-between items-center p-3 bg-[#22aaa1] text-white rounded-t-lg">
        <span>Support Chat</span>
        <button onClick={onClose}>
          <FaTimes size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto">
        {messages.map((m) => (
          <div
            key={m._id}
            className={`mb-2 ${
              m.sender?._id?.toString() === user.id
                ? "text-right "
                : "text-left"
            }`}
          >
            {
              m.sender?._id?.toString() === user.id ? (
                <div className="inline-block bg-gray-200  p-2 rounded ms-6">
                  {m.message}
                </div>
              ) :    <div className="inline-block bg-[#22aaa1] text-white p-2 me-6 rounded">
              {m.message}
            </div>
            }
         
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-2 flex border-t">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border rounded p-2"
          placeholder="Type a message..."
        />
        <button
          onClick={send}
          className="ml-2 bg-[#22aaa1] text-white px-4 rounded hover:bg-[#1a8a80]"
        >
          Send
        </button>
      </div>
    </div>
  );
}
