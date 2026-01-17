import { useState, useRef } from "react";
import { LuUpload } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadFiles } from "../../../services/upload";
import { uploadPropertyPhotos, deletePropertyImage } from "../../../services/properties";

const EditHotelMediaModal = ({ open, onClose, photos = [], propertyId }) => {
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();
  const [isUploading, setIsUploading] = useState(false);

  const uploadMutation = useMutation({
    mutationFn: async (files) => {
      setIsUploading(true);
      try {
        const uploadResponse = await uploadFiles(files, "photo");

        const photosData = uploadResponse.urls.map((item) => ({
          name: "room",
          status: "Pending",
          url: item.url,
        }));

        await uploadPropertyPhotos(propertyId, photosData);
        await queryClient.invalidateQueries({ queryKey: ["property", propertyId] });
      } finally {
        setIsUploading(false);
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (photoId) => {
      await deletePropertyImage(propertyId, photoId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["property", propertyId] });
    },
  });

  const handleAddImages = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      uploadMutation.mutate(files);
      e.target.value = "";
    }
  };

  const handleDeleteImage = async (photoId) => {
    // if (!window.confirm("Are you sure you want to delete this image?")) return;
    deleteMutation.mutate(photoId);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-[90%] md:w-[700px] p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit Hotel Images</h2>
          <button onClick={onClose} className="cursor-pointer">
            <IoClose size={22} />
          </button>
        </div>

        {/* Existing Images */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-6">
          {photos.map((photo) => (
            <div key={photo._id} className="relative">
              <img
                src={photo.url}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => handleDeleteImage(photo._id)}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 cursor-pointer"
              >
                <IoClose size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Upload New Images */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleAddImages}
        />

        <button
          onClick={() => fileInputRef.current.click()}
          disabled={isUploading}
          className="bg-[#0F766E] text-white px-4 py-2 rounded-md inline-flex items-center gap-2 cursor-pointer"
        >
          <LuUpload />
          {isUploading ? "Uploading..." : "Add More Images"}
        </button>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded-md cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};



export default EditHotelMediaModal;