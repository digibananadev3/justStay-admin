import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePropertySinglePhotoStatus } from "../../../services/properties";
import toast from "react-hot-toast";

const HotelImageStatusModal = ({ open, onClose, photo, propertyId }) => {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState(photo.status || "Pending");


  const updateStatusMutation = useMutation({
    mutationFn: async () => {
      await updatePropertySinglePhotoStatus(
        propertyId,
        photo._id,
        status
      );

      await queryClient.invalidateQueries({
        queryKey: ["property", propertyId],
      });
    },
    onSuccess: () => {
      toast.success("Status updated successfully");
      onClose();
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-[90%] md:w-[500px] p-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Change Image Status</h2>
          <button onClick={onClose} className="cursor-pointer">
            <IoClose size={22} />
          </button>
        </div>

        {/* SHOW SELECTED IMAGE */}
        <img
          src={photo.url}
          className="w-full h-56 object-cover rounded-lg mb-4"
        />

        <label className="block text-sm font-medium mb-1">
          Change Status
        </label>

        <select
          className="w-full border rounded-md px-3 py-2 mb-4"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded-md cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={() => updateStatusMutation.mutate()}
            disabled={updateStatusMutation.isLoading}
            className="bg-[#0F766E] text-white px-4 py-2 rounded-md cursor-pointer disabled:opacity-50"
          >
            {updateStatusMutation.isLoading
              ? "Saving..."
              : "Save Status"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default HotelImageStatusModal;
