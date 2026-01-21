import { useEffect, useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchRoomTypes,
  updateRoomForSpecificProperty,
} from "../../../services/room";
import { fetchAllAmenities } from "../../../services/ammenities";
import { uploadFiles } from "../../../services/upload";
import Loader from "../../../components/BasicComponent/Loader";
import toast from "react-hot-toast";

const EditRoomTypeModal = ({ onClose, propertyId, room, onSuccess }) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // ---------- ROOM TYPES ----------
  const { data, isLoading } = useQuery({
    queryKey: ["roomTypes"],
    queryFn: () => fetchRoomTypes({ onlyActive: true }),
  });

  const roomTypes = data?.data || [];

  // ---------- AMENITIES (MUST BE BEFORE useEffect) ----------
  const { data: amenitiesData } = useQuery({
    queryKey: ["amenities"],
    queryFn: () => fetchAllAmenities({ category: "room", onlyActive: true }),
  });

  const amenities = (amenitiesData?.data || []).filter(
    (am) => am.isActive === true
  );

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
    amenities: [],
  });

  const [isUploading, setIsUploading] = useState(false);

  // -------- PREFILL FORM + PRESELECT AMENITIES (NO INFINITE LOOP) --------
  // useEffect(() => {
  //   if (!room || !amenities.length || !roomTypes.length) return;

  //   const matchedType = roomTypes.find((rt) => rt.name === room.type);

  //   setFormData({
  //     roomTypeId: matchedType?._id || "",
  //     area: room.area || "",
  //     bed: room.bed || "",
  //     bathroom: room.bathroom || "",
  //     numberOfRooms: room.numberOfRooms || "",
  //     oneNight: room.price?.oneNight || "",
  //     threeHours: room.price?.threeHours || "",
  //     sixHours: room.price?.sixHours || "",
  //     photos: room.photos || [],
  //     amenities: room.amenities || [],
  //   });

  //   // Preselect existing amenities
  //   const preSelected = amenities.filter((am) =>
  //     room.amenities?.includes(am.name)
  //   );

  //   setSelectedAmenities(preSelected);
  // }, [room, amenities, roomTypes]);

  useEffect(() => {
  if (!room || !amenitiesData || !data) return;

  const matchedType = roomTypes.find((rt) => rt.name === room.type);

  setFormData((prev) => {
    // Prevent unnecessary state updates
    if (prev.roomTypeId === matchedType?._id) return prev;

    return {
      roomTypeId: matchedType?._id || "",
      area: room.area || "",
      bed: room.bed || "",
      bathroom: room.bathroom || "",
      numberOfRooms: room.numberOfRooms || "",
      oneNight: room.price?.oneNight || "",
      threeHours: room.price?.threeHours || "",
      sixHours: room.price?.sixHours || "",
      photos: room.photos || [],
      amenities: room.amenities || [],
    };
  });

  // Preselect amenities only ONCE
  const preSelected = (amenitiesData?.data || [])
    .filter((am) => am.isActive)
    .filter((am) => room.amenities?.includes(am.name));

  setSelectedAmenities(preSelected);

}, [room, amenitiesData, data]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add photos
  const handleAddPhotos = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    try {
      setIsUploading(true);
      const res = await uploadFiles(files, "photo");
      const uploadedUrls = res.urls.map((item) => item.url);

      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...uploadedUrls],
      }));
    } catch (err) {
      toast.error("Failed to upload photos");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const removePhoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) => {
      const exists = prev.find((a) => a._id === amenity._id);

      if (exists) {
        return prev.filter((a) => a._id !== amenity._id);
      } else {
        return [...prev, amenity];
      }
    });
  };

  const mutation = useMutation({
    mutationFn: ({ roomId, payload }) =>
      updateRoomForSpecificProperty(roomId, payload),
    onSuccess: () => {
      toast.success("Room updated successfully");
      onSuccess();
      onClose();
      queryClient.invalidateQueries(["rooms", propertyId]);
    },
    onError: () => {
      toast.error("Room update failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedRoomType = roomTypes.find(
      (rt) => rt._id === formData.roomTypeId
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

      // 🔥 FINAL FIX — SEND EDITED AMENITIES
      amenities: selectedAmenities.map((a) => a.name),
    };

    mutation.mutate({
      roomId: room._id,
      payload,
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[650px] rounded-lg p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-lg font-semibold">Edit Room Type</h2>
          <button onClick={onClose} className="text-red-600 font-bold">
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 overflow-y-auto max-h-[80vh]"
        >
          {/* ROOM TYPE */}
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

          {/* BASIC FIELDS */}
          <div className="grid grid-cols-2 gap-4">
            <input
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="Area"
              className="border p-2 rounded"
            />
            <input
              name="bed"
              value={formData.bed}
              onChange={handleChange}
              placeholder="Beds"
              className="border p-2 rounded"
            />
            <input
              name="bathroom"
              value={formData.bathroom}
              onChange={handleChange}
              placeholder="Bathrooms"
              className="border p-2 rounded"
            />
            <input
              name="numberOfRooms"
              value={formData.numberOfRooms}
              onChange={handleChange}
              placeholder="Rooms"
              className="border p-2 rounded"
            />
          </div>

          {/* PRICES */}
          <div className="grid grid-cols-3 gap-4">
            <input
              name="oneNight"
              value={formData.oneNight}
              onChange={handleChange}
              placeholder="1 Night ₹"
              className="border p-2 rounded"
            />
            <input
              name="sixHours"
              value={formData.sixHours}
              onChange={handleChange}
              placeholder="6 Hours ₹"
              className="border p-2 rounded"
            />
            <input
              name="threeHours"
              value={formData.threeHours}
              onChange={handleChange}
              placeholder="3 Hours ₹"
              className="border p-2 rounded"
            />
          </div>

          {/* ---- ALREADY PRESENT AMENITIES (PILLS ON TOP) ---- */}
          <div>
            <label className="block mb-1 font-medium">
              Existing Amenities
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.amenities.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-full border border-teal-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* ---- EDITABLE AMENITIES (SCROLLABLE) ---- */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Edit Amenities
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("amenitiesScrollEdit")
                    .scrollBy({ left: -200, behavior: "smooth" })
                }
                className="px-2 py-1 border rounded-md bg-gray-100"
              >
                ◀
              </button>

              <div
                id="amenitiesScrollEdit"
                className="flex gap-2 overflow-x-auto whitespace-nowrap rounded-md p-2 w-full"
              >
                {amenities.map((am) => {
                  const isSelected = selectedAmenities.some(
                    (a) => a._id === am._id
                  );

                  return (
                    <span
                      key={am._id}
                      onClick={() => toggleAmenity(am)}
                      className={`px-3 py-1 rounded-full text-sm cursor-pointer border inline-block
                      ${
                        isSelected
                          ? "bg-teal-700 text-white border-teal-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {am.name}
                    </span>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("amenitiesScrollEdit")
                    .scrollBy({ left: 200, behavior: "smooth" })
                }
                className="px-2 py-1 border rounded-md bg-gray-100"
              >
                ▶
              </button>
            </div>
          </div>

          {/* PHOTOS */}
          <div>
            <label className="block mb-1">Room Photos</label>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleAddPhotos}
              className="w-full border p-2 rounded"
              disabled={isUploading}
            />

            <div className="flex flex-wrap gap-2 mt-3">
              {formData.photos.map((img, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={img}
                    className="w-20 h-20 object-cover rounded"
                  />
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

          {/* BUTTONS */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={mutation.isLoading || isUploading}
              className="bg-[#0F766E] text-white px-5 py-2 rounded"
            >
              {mutation.isLoading || isUploading
                ? "Updating..."
                : "Update Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoomTypeModal;
