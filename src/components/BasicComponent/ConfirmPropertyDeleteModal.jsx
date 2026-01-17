import { createPortal } from "react-dom";

const ConfirmPropertyDeleteModal = ({
  open,
  loading,
  onCancel,
  onConfirm,
}) => {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40">
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-gray-800">
          Delete Property
        </h3>

        <p className="mt-2 text-sm text-gray-600">
          Are you sure you want to delete this property? This action{" "}
          <span className="font-semibold text-red-600">cannot be undone</span>.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 transition"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 transition disabled:opacity-60"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmPropertyDeleteModal;
