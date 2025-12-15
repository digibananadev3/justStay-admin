import { LuUser, LuMessageCircle } from "react-icons/lu";

const LiveChat = () => {
  const sessions = [
    {
      id: "s1",
      name: "Amit Kumar",
      topic: "Booking inquiry",
      time: "5 min ago",
      color: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
    },
    {
      id: "s2",
      name: "Hotel Grand",
      topic: "Payment issue",
      time: "12 min ago",
      color: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
    },
  ];

  return (
    <div className="mt-6">
      <div className="border border-gray-200 rounded-2xl p-6 bg-white">
        <h2 className="font-poppins text-[20px] leading-7 font-semibold text-[#0F172A] mb-6">24/7 Live Chat Support</h2>
        <p className="font-poppins text-[14px] font-semibold text-[#0F172A] mb-3">Active Chat Sessions</p>

        <div className="space-y-3 max-w-xl">
          {sessions.map((s) => (
            <div key={s.id} className="w-full rounded-xl px-4 py-3 bg-[#F7FAFC] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${s.color.bg} ${s.color.text} border ${s.color.border}`}>
                  <LuUser size={16} />
                </span>
                <div>
                  <p className="font-poppins font-semibold text-[14px] text-[#0F172A]">{s.name}</p>
                  <p className="text-[13px] text-[#6A7282]">{s.topic} • {s.time}</p>
                </div>
              </div>

              <button type="button" className="inline-flex items-center gap-2 h-9 px-3 rounded-xl bg-[#009689] text-white hover:bg-[#00786F] transition">
                <LuMessageCircle size={16} />
                <span className="text-[13px] font-medium">Join Chat</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveChat;