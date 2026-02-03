import { useEffect, useState } from "react";
import axios from "axios";
import { AUTH_BASE_URL } from "../../services/auth";
import { FaTimes } from "react-icons/fa";
import { socket } from "../../services/socket";
import toast from "react-hot-toast";

export default function SupportChatWindow({ session, adminId, onClose }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  /* -------------------------
     SOCKET RECEIVE HANDLER
  -------------------------- */
  const onReceive = (msg) => {
    setMessages((prev) => {
      // block duplicates by _id
      if (prev.some((m) => m._id === msg._id)) return prev;
      return [...prev, msg];
    });
  };

  /* -------------------------
     Load messages + join room
  -------------------------- */
  useEffect(() => {
    if (!session?._id && !session?.id) return;

    const sessionId = session._id || session.id;

    console.log("ADMIN JOIN SESSION:", sessionId);

    socket.emit("joinChat", sessionId);

    axios
      .get(`${AUTH_BASE_URL}/api/chat-support/sessions/${sessionId}/messages`)
      .then((res) => setMessages(res.data.data))
      .catch(console.error);

    socket.on("receiveMessage", onReceive);

    return () => {
      socket.off("receiveMessage", onReceive);
      socket.emit("leaveChat", sessionId);
    };
  }, [session]);

  /* -------------------------
     Send message
  -------------------------- */
  const send = async () => {
    if (!text.trim()) return;

    const user = JSON.parse(localStorage.getItem("user"));
    if(user.role !== 'admin') {
        toast.error("Only admins can send messages in this chat window.");
        return;
    }

    const sessionId = session._id || session.id;

    try {
      await axios.post(
        `${AUTH_BASE_URL}/api/chat-support/sessions/${sessionId}/messages`,
        {
          userId: adminId,
          message: text,
        }
      );

      setText(""); // socket will update UI
    } catch (err) {
      console.error("Admin send failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      { console.log("This is the value of the SupportChatWindow component", JSON.parse(localStorage.getItem("user"))?.role)  }
      <div className="bg-white w-[420px] h-[520px] rounded-xl shadow-lg flex flex-col">
        {/* Header */}
        <div className="p-3 border-b flex justify-between items-center bg-[#22aaa1] text-white rounded-t-xl">
          <span>{session.name}</span>
          <button onClick={onClose} className="cursor-pointer">
            <FaTimes />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-3 overflow-y-auto">
          {messages
            .filter((m) => m.message && m.message.trim() !== "")
            .map((m) => {
              const isAdmin = m.sender?.role === "admin";

              return (
                <div
                  key={m._id}
                  className={`mb-2 ${isAdmin ? "text-right" : "text-left"}`}
                >
                  <div
                    className={`inline-block p-2 rounded ${
                      isAdmin
                        ? "bg-[#22aaa1] text-white ms-10"
                        : "bg-gray-200 me-10"
                    }`}
                  >
                    {m.message}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Input */}
        <div className="p-2 border-t flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 border rounded p-2"
            placeholder="Type a reply..."
          />
          <button
            onClick={send}
            className="bg-[#22aaa1] text-white px-4 rounded hover:bg-[#1a8a80]"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
