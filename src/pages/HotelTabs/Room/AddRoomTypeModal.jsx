import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchRoomTypes,
  createRoomForSpecificProperty,
} from "../../../services/room";
import Loader from "../../../components/BasicComponent/Loader";
import toast from "react-hot-toast";

const AddRoomTypeModal = ({ onClose, propertyId, onSuccess  }) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) =>
      URL.createObjectURL(file)
    ); // temporary preview URLs

    setFormData((prev) => ({
      ...prev,
      photos: urls,
    }));
  };

  const mutation = useMutation({
    mutationFn: createRoomForSpecificProperty,
  onSuccess: () => {
  toast.success("Room created successfully");
  onSuccess();   // 🔥 REFRESH LIST
  onClose();
},
    onError: (err) => {
      toast.error("Room creation failed");
      console.error(err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedRoomType = roomTypes.find(
      (rt) => rt._id === formData.roomTypeId
    );

    const totalRooms = Number(formData.numberOfRooms);

    const payload = {
      userId: "6967776381a63e844d59dba5",
      propertyId: propertyId,
      type: selectedRoomType?.name || "Standard",
      area: Number(formData.area),
      bed: Number(formData.bed),
      bathroom: Number(formData.bathroom),
      numberOfRooms: totalRooms,

      roomNumbers: Array.from(
        { length: totalRooms },
        (_, i) => (101 + i).toString()
      ),

      price: {
        oneNight: Number(formData.oneNight),
        threeHours: Number(formData.threeHours || 0),
        sixHours: Number(formData.sixHours || 0),
      },

      photos: formData.photos.length
        ? formData.photos
        : [
            "https://example.com/room1.jpg",
            "https://example.com/room2.jpg",
          ],

      amenities: ["WiFi", "Television"],
    };

    console.log("Final Payload Sent:", payload);
    mutation.mutate(payload);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[650px] rounded-lg p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-lg font-semibold">Add Room Type</h2>
          <button
            onClick={onClose}
            className="text-red-600 font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {isLoading && (
          <div className="flex justify-center py-5">
            <Loader />
          </div>
        )}

        {error && (
          <p className="text-red-600 text-center">
            Failed to load room types: {error.message}
          </p>
        )}

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
                {roomTypes.map((rt) => (
                  <option key={rt._id} value={rt._id}>
                    {rt.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Grid Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Area (sq ft)</label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>

              <div>
                <label>No. of Beds</label>
                <input
                  type="number"
                  name="bed"
                  value={formData.bed}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>

              <div>
                <label>No. of Bathrooms</label>
                <input
                  type="number"
                  name="bathroom"
                  value={formData.bathroom}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>

              <div>
                <label>No. of Rooms</label>
                <input
                  type="number"
                  name="numberOfRooms"
                  value={formData.numberOfRooms}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>
            </div>

            {/* Prices */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label>1 Night Price (₹)</label>
                <input
                  type="number"
                  name="oneNight"
                  value={formData.oneNight}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>

              <div>
                <label>6 Hours Price (₹)</label>
                <input
                  type="number"
                  name="sixHours"
                  value={formData.sixHours}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label>3 Hours Price (₹)</label>
                <input
                  type="number"
                  name="threeHours"
                  value={formData.threeHours}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                />
              </div>
            </div>

            {/* Multiple Photos */}
            <div>
              <label>Room Photos (multiple)</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full border rounded-md p-2"
              />

              <div className="flex gap-2 mt-2">
                {formData.photos.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="preview"
                    className="w-16 h-16 object-cover rounded"
                  />
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-200 px-4 py-2 rounded-md"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={mutation.isLoading}
                className="bg-[#0F766E] text-white px-5 py-2 rounded-md"
              >
                {mutation.isLoading ? "Submitting..." : "Submit Room"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddRoomTypeModal;
