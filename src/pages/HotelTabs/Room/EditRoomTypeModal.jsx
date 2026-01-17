import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchRoomTypes, updateRoomForSpecificProperty  } from "../../../services/room";
import Loader from "../../../components/BasicComponent/Loader";
import toast from "react-hot-toast";

const EditRoomTypeModal = ({ onClose, propertyId, room, onSuccess }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["roomTypes"],
    queryFn: () => fetchRoomTypes({ onlyActive: true }),
  });

  const roomTypes = data?.data || [];

  const [formData, setFormData] = useState({
    roomTypeId: "",
    area: "",
    bed: "",
    bathroom: "",
    numberOfRooms: "",
    oneNight: "",
    threeHours: "",
    sixHours: "",
    photos: [],
  });

  /* ==========================
     PREFILL FORM WHEN MODAL OPENS
  ========================== */
  useEffect(() => {
    if (room) {
      const matchedType = roomTypes.find(rt => rt.name === room.type);

      setFormData({
        roomTypeId: matchedType?._id || "",
        area: room.area || "",
        bed: room.bed || "",
        bathroom: room.bathroom || "",
        numberOfRooms: room.numberOfRooms || "",
        oneNight: room.price?.oneNight || "",
        threeHours: room.price?.threeHours || "",
        sixHours: room.price?.sixHours || "",
        photos: room.photos || [],
      });
    }
  }, [room, roomTypes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /* ==========================
     ADD NEW PHOTOS
  ========================== */
  const handleAddPhotos = (e) => {
    const files = Array.from(e.target.files);
    const newUrls = files.map(file => URL.createObjectURL(file));

    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...newUrls],
    }));
  };

  /* ==========================
     REMOVE PHOTO
  ========================== */
  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  /* ==========================
     SUBMIT (For now reusing create API)
     Later replace with updateRoom API
  ========================== */
const mutation = useMutation({
  mutationFn: ({ roomId, payload }) =>
    updateRoomForSpecificProperty(roomId, payload),

onSuccess: () => {
  toast.success("Room updated successfully");
  onSuccess();   // 🔥 REFRESH LIST
  onClose();
},
  onError: () => {
    toast.error("Room update failed");
  },
});


const handleSubmit = (e) => {
  e.preventDefault();

  const selectedRoomType = roomTypes.find(
    rt => rt._id === formData.roomTypeId
  );

  const payload = {
    userId: room.userId,
    propertyId: propertyId,
    type: selectedRoomType?.name || room.type,
    area: Number(formData.area),
    bed: Number(formData.bed),
    bathroom: Number(formData.bathroom),
    numberOfRooms: Number(formData.numberOfRooms),
    roomNumbers: room.roomNumbers,

    price: {
      oneNight: Number(formData.oneNight),
      threeHours: Number(formData.threeHours || 0),
      sixHours: Number(formData.sixHours || 0),
    },

    photos: formData.photos,
    amenities: room.amenities || ["WiFi", "Television"],
  };


  mutation.mutate({
    roomId: room._id,   // VERY IMPORTANT
    payload,
  });
};


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[650px] rounded-lg p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-lg font-semibold">Edit Room Type</h2>
          <button onClick={onClose} className="text-red-600 font-bold cursor-pointer">
            ✕
          </button>
        </div>

        {isLoading && <Loader />}

        {!isLoading && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Room Type */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Room Type
              </label>
              <select
                name="roomTypeId"
                value={formData.roomTypeId}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                required
              >
                <option value="">Select Room Type</option>
                {roomTypes.map(rt => (
                  <option key={rt._id} value={rt._id}>
                    {rt.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Fields */}
            <div className="grid grid-cols-2 gap-4">
              <input name="area" value={formData.area} onChange={handleChange} placeholder="Area" className="border p-2 rounded" />
              <input name="bed" value={formData.bed} onChange={handleChange} placeholder="Beds" className="border p-2 rounded" />
              <input name="bathroom" value={formData.bathroom} onChange={handleChange} placeholder="Bathrooms" className="border p-2 rounded" />
              <input name="numberOfRooms" value={formData.numberOfRooms} onChange={handleChange} placeholder="Rooms" className="border p-2 rounded" />
            </div>

            {/* Prices */}
            <div className="grid grid-cols-3 gap-4">
              <input name="oneNight" value={formData.oneNight} onChange={handleChange} placeholder="1 Night ₹" className="border p-2 rounded" />
              <input name="sixHours" value={formData.sixHours} onChange={handleChange} placeholder="6 Hours ₹" className="border p-2 rounded" />
              <input name="threeHours" value={formData.threeHours} onChange={handleChange} placeholder="3 Hours ₹" className="border p-2 rounded" />
            </div>

            {/* Photos */}
            <div>
              <label className="block mb-1">Room Photos</label>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleAddPhotos}
                className="w-full border p-2 rounded"
              />

              <div className="flex flex-wrap gap-2 mt-3">
                {formData.photos.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img src={img} className="w-20 h-20 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => removePhoto(idx)}
                      className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-2 rounded">
                Cancel
              </button>

              <button
                type="submit"
                disabled={mutation.isLoading}
                className="bg-[#0F766E] text-white px-5 py-2 rounded"
              >
                {mutation.isLoading ? "Updating..." : "Update Room"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditRoomTypeModal;
