import { MdDelete } from "react-icons/md";

const ConfirmPropertyTypeDelete = ({
  propertyTypeId,
  isDeleting,
  onCancel,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-2xl p-6 w-[400px] shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <MdDelete size={22} className="text-red-600" />
          </div>
          <h2 className="text-lg font-semibold">Delete Property Type?</h2>
        </div>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this property type?  
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPropertyTypeDelete;
