import { createPortal } from "react-dom";

const ConfirmDeletePropertyListType = ({
  propertyListTypeId,
  isDeleting,
  onCancel,
  onConfirm,
}) => {
  return createPortal(
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-2xl shadow-xl w-[420px] p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Delete Property List Type?
        </h2>

        <p className="text-sm text-gray-600 mt-2">
          Are you sure you want to delete this property list type?
          <br />
          <span className="font-medium text-red-600">
            This action cannot be undone.
          </span>
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmDeletePropertyListType;
