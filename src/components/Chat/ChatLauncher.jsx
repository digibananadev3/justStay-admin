import { useState } from "react";
import { FaComments } from "react-icons/fa";
import ChatWindow from "./ChatWindow";

export default function ChatLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-[#22aaa1] text-white p-4 rounded-full shadow-lg hover:bg-[#1a8a80] z-50 cursor-pointer"
      >
        <FaComments size={24} />
      </button>

      {open && <ChatWindow onClose={() => setOpen(false)} />}
    </>
  );
}
