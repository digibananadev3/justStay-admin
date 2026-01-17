import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadFiles } from "../../../services/upload";
import { uploadPropertyPhotos } from "../../../services/properties";
import toast from "react-hot-toast";

const EditHotelMediaModal = ({ open, onClose, photo, propertyId }) => {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState(photo?.status || "Pending");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(photo?.url);
  const [isUpdating, setIsUpdating] = useState(false);

  const updateImageMutation = useMutation({
    mutationFn: async () => {
      setIsUpdating(true);
      try {
        let finalUrl = photo.url;

        if (selectedFile) {
          const uploadResponse = await uploadFiles([selectedFile], "photo");
          finalUrl = uploadResponse.urls[0].url;
        }

        const photosData = [
          {
            _id: photo._id,
            url: finalUrl,
            status,
          },
        ];

        await uploadPropertyPhotos(propertyId, photosData);
        await queryClient.invalidateQueries({ queryKey: ["property", propertyId] });
      } finally {
        setIsUpdating(false);
      }
    },
    onSuccess: () => {
      toast.success("Image updated successfully");
      onClose();
    },
    onError: () => {
      toast.error("Failed to update image");
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file)); // live preview
  };

  if (!open || !photo) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-[90%] md:w-[600px] p-6 relative">

        {/* Loading overlay */}
        {isUpdating && (
          <div className="absolute inset-0 bg-white/70 flex justify-center items-center z-50">
            <div className="animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-10 h-10"></div>
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit Image</h2>
          <button onClick={onClose}><IoClose size={22} /></button>
        </div>

        {/* Preview */}
        <img
          src={previewUrl}
          className="w-full h-56 object-cover rounded-lg mb-4"
        />

        {/* Change Image */}
        <label className="block text-sm font-medium mb-1">Change Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full mb-3"
          disabled={isUpdating}
        />

        {/* Status */}
        <label className="block text-sm font-medium mb-1">Change Status</label>
        <select
          className="w-full border rounded-md px-3 py-2 mb-4"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          disabled={isUpdating}
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded-md"
            disabled={isUpdating}
          >
            Cancel
          </button>

          <button
            onClick={() => updateImageMutation.mutate()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditHotelMediaModal;
