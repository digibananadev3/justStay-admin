import { useEffect, useState } from "react";
import { LuUser, LuMessageCircle } from "react-icons/lu";
import { adminListAllChats } from "../../services/supportChat"; // adjust path
import SupportChatWindow from "../../components/Chat/SupportChatWindow";
import { useSelector } from "react-redux";


const LiveChat = () => {
  // const sessions = [
  //   {
  //     id: "s1",
  //     name: "Amit Kumar",
  //     topic: "Booking inquiry",
  //     time: "5 min ago",
  //     color: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  //   },
  //   {
  //     id: "s2",
  //     name: "Hotel Grand",
  //     topic: "Payment issue",
  //     time: "12 min ago",
  //     color: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  //   },
  // ];
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChat, setActiveChat] = useState(null);
const adminId = useSelector((s) => s.auth.user?.id);

   useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      setLoading(true);
      const res = await adminListAllChats("Open");

      const formatted = res.data.map((s) => ({
        id: s._id,
        name: `${s.createdBy?.firstName || "Guest"} ${s.createdBy?.lastName || "User"}`,
        topic: s.lastMessage?.message || s.topic || "No messages yet",
        time: formatTime(s.lastMessage?.createdAt || s.createdAt),
        color: getColor(s._id),
      }));

      setSessions(formatted);
    } catch (err) {
      console.error("Failed to load chats", err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date) => {
    if (!date) return "";
    const diff = Math.floor((Date.now() - new Date(date)) / 60000);

    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff} min ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hr ago`;
    return `${Math.floor(diff / 1440)} days ago`;
  };

  const colors = [
    { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
    { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
    { bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200" },
    { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  ];

  const getColor = (id) => {
    const index = id.charCodeAt(0) % colors.length;
    return colors[index];
  };


  return (
    <div className="mt-6">
      {console.log("This is the value of the sessions:", sessions)}
      <div className="border border-gray-200 rounded-2xl p-6 bg-white">
        <h2 className="font-poppins text-[20px] leading-7 font-semibold text-[#0F172A] mb-6">24/7 Live Chat Support</h2>
        <p className="font-poppins text-[14px] font-semibold text-[#0F172A] mb-3">Active Chat Sessions</p>

        <div className="space-y-3 max-w-xl">
          {sessions?.map((s) => (
            <div key={s.id} className={`w-full rounded-xl px-4 py-3 bg-[#F7FAFC] flex items-center justify-between ${(s?.topic == "No messages yet")?"hidden": ""}`}>
              <div className="flex items-center gap-3">
                <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${s.color.bg} ${s.color.text} border ${s.color.border}`}>
                  <LuUser size={16} />
                </span>
                <div>
                  <p className="font-poppins font-semibold text-[14px] text-[#0F172A]">{s.name}</p>
                  <p className="text-[13px] text-[#6A7282]">{s.topic} • {s.time}</p>
                </div>
              </div>

              {/* <button type="button" className="inline-flex items-center gap-2 h-9 px-3 rounded-xl bg-[#009689] text-white hover:bg-[#00786F] transition">
                <LuMessageCircle size={16} />
                <span className="text-[13px] font-medium">Join Chat</span>
              </button> */}

<button
  onClick={() => setActiveChat(s)}
  className="inline-flex items-center gap-2 h-9 px-3 rounded-xl bg-[#009689] text-white"
>
  <LuMessageCircle size={16} />
  Join Chat
</button>

            </div>
          ))}
        </div>
      </div>


      {activeChat && (
  <SupportChatWindow
    session={activeChat}
    adminId={adminId}
    onClose={() => setActiveChat(null)}
  />
)}

    </div>
  );
};

export default LiveChat;