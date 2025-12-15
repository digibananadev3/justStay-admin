import React from "react";
import { FiDownload } from "react-icons/fi"; // 👈 react-icons

export default function ExportButton({ label = "Export", onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 active:scale-95 focus:outline-none transition-all"
    >
      <FiDownload className="text-gray-600 text-lg" />
      {label}
    </button>
  );
}
