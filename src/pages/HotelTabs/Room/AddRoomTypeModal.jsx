// import { useState } from "react";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import {
//   fetchRoomTypes,
//   createRoomForSpecificProperty,
// } from "../../../services/room";
// import { uploadFiles } from "../../../services/upload";   // 🔥 SAME FUNCTION
// import Loader from "../../../components/BasicComponent/Loader";
// import toast from "react-hot-toast";

// const AddRoomTypeModal = ({ onClose, propertyId, onSuccess }) => {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["roomTypes"],
//     queryFn: () => fetchRoomTypes({ onlyActive: true }),
//   });

//   const roomTypes = data?.data || [];

//   const [isUploading, setIsUploading] = useState(false);

//   const [formData, setFormData] = useState({
//     roomTypeId: "",
//     area: "",
//     bed: "",
//     bathroom: "",
//     numberOfRooms: "",
//     oneNight: "",
//     threeHours: "",
//     sixHours: "",
//     files: [],      // REAL files
//     previews: [],   // UI previews
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // ✅ MATCHING YOUR EDIT HOTEL UPLOAD FLOW
//   const handlePhotoChange = (e) => {
//     const files = Array.from(e.target.files || []);

//     const previewUrls = files.map((file) =>
//       URL.createObjectURL(file)
//     );

//     setFormData((prev) => ({
//       ...prev,
//       files: files,
//       previews: previewUrls,
//     }));
//   };

//   const mutation = useMutation({
//     mutationFn: async (payload) => {
//       return createRoomForSpecificProperty(payload);
//     },
//     onSuccess: () => {
//       toast.success("Room created successfully");
//       onSuccess();
//       onClose();
//     },
//     onError: (err) => {
//       toast.error("Room creation failed");
//       console.error(err);
//     },
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const selectedRoomType = roomTypes.find(
//       (rt) => rt._id === formData.roomTypeId
//     );

//     const totalRooms = Number(formData.numberOfRooms);

//     let photoUrls = [];

//     // ✅ STEP 1 — Upload images FIRST (exactly like your Edit modal)
//     if (formData.files.length > 0) {
//       setIsUploading(true);
//       try {
//         const uploadResponse = await uploadFiles(
//           formData.files,
//           "photo"
//         );

//         photoUrls = uploadResponse.urls.map((item) => item.url);
//       } catch (err) {
//         toast.error("Image upload failed");
//         console.error(err);
//         setIsUploading(false);
//         return;
//       }
//       setIsUploading(false);
//     }

//     // ✅ STEP 2 — Create room payload with REAL URLs
//     const payload = {
//       userId: "6967776381a63e844d59dba5",
//       propertyId: propertyId,
//       type: selectedRoomType?.name || "Standard",
//       area: Number(formData.area),
//       bed: Number(formData.bed),
//       bathroom: Number(formData.bathroom),
//       numberOfRooms: totalRooms,

//       roomNumbers: Array.from(
//         { length: totalRooms },
//         (_, i) => (101 + i).toString()
//       ),

//       price: {
//         oneNight: Number(formData.oneNight),
//         threeHours: Number(formData.threeHours || 0),
//         sixHours: Number(formData.sixHours || 0),
//       },

//       photos:
//         photoUrls.length > 0
//           ? photoUrls
//           : [
//               "https://example.com/room1.jpg",
//               "https://example.com/room2.jpg",
//             ],

//       amenities: ["WiFi", "Television"],
//     };


//     mutation.mutate(payload);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white w-[650px] rounded-lg p-6 shadow-xl">
//         <div className="flex justify-between items-center mb-4 border-b pb-2">
//           <h2 className="text-lg font-semibold">Add Room Type</h2>
//           <button
//             onClick={onClose}
//             className="text-red-600 font-bold cursor-pointer"
//           >
//             ✕
//           </button>
//         </div>

//         {isLoading && (
//           <div className="flex justify-center py-5">
//             <Loader />
//           </div>
//         )}

//         {error && (
//           <p className="text-red-600 text-center">
//             Failed to load room types: {error.message}
//           </p>
//         )}

//         {!isLoading && (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Room Type
//               </label>
//               <select
//                 name="roomTypeId"
//                 value={formData.roomTypeId}
//                 onChange={handleChange}
//                 className="w-full border rounded-md p-2"
//                 required
//               >
//                 <option value="">Select Room Type</option>
//                 {roomTypes.map((rt) => (
//                   <option key={rt._id} value={rt._id}>
//                     {rt.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label>Area (sq ft)</label>
//                 <input
//                   type="number"
//                   name="area"
//                   value={formData.area}
//                   onChange={handleChange}
//                   className="w-full border rounded-md p-2"
//                   required
//                 />
//               </div>

//               <div>
//                 <label>No. of Beds</label>
//                 <input
//                   type="number"
//                   name="bed"
//                   value={formData.bed}
//                   onChange={handleChange}
//                   className="w-full border rounded-md p-2"
//                   required
//                 />
//               </div>

//               <div>
//                 <label>No. of Bathrooms</label>
//                 <input
//                   type="number"
//                   name="bathroom"
//                   value={formData.bathroom}
//                   onChange={handleChange}
//                   className="w-full border rounded-md p-2"
//                   required
//                 />
//               </div>

//               <div>
//                 <label>No. of Rooms</label>
//                 <input
//                   type="number"
//                   name="numberOfRooms"
//                   value={formData.numberOfRooms}
//                   onChange={handleChange}
//                   className="w-full border rounded-md p-2"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-3 gap-4">
//               <div>
//                 <label>1 Night Price (₹)</label>
//                 <input
//                   type="number"
//                   name="oneNight"
//                   value={formData.oneNight}
//                   onChange={handleChange}
//                   className="w-full border rounded-md p-2"
//                   required
//                 />
//               </div>

//               <div>
//                 <label>6 Hours Price (₹)</label>
//                 <input
//                   type="number"
//                   name="sixHours"
//                   value={formData.sixHours}
//                   onChange={handleChange}
//                   className="w-full border rounded-md p-2"
//                 />
//               </div>

//               <div>
//                 <label>3 Hours Price (₹)</label>
//                 <input
//                   type="number"
//                   name="threeHours"
//                   value={formData.threeHours}
//                   onChange={handleChange}
//                   className="w-full border rounded-md p-2"
//                 />
//               </div>
//             </div>

//             <div>
//               <label>Room Photos (multiple)</label>
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handlePhotoChange}
//                 className="w-full border rounded-md p-2"
//               />

//               <div className="flex gap-2 mt-2">
//                 {formData.previews.map((img, idx) => (
//                   <img
//                     key={idx}
//                     src={img}
//                     alt="preview"
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                 ))}
//               </div>
//             </div>

//             <div className="flex justify-end gap-3 mt-4">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="bg-gray-200 px-4 py-2 rounded-md"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="submit"
//                 disabled={mutation.isLoading || isUploading}
//                 className="bg-[#0F766E] text-white px-5 py-2 rounded-md"
//               >
//                 {isUploading
//                   ? "Uploading images..."
//                   : mutation.isLoading
//                   ? "Submitting..."
//                   : "Submit Room"}
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddRoomTypeModal;






import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchRoomTypes,
  createRoomForSpecificProperty,
} from "../../../services/room";
import { uploadFiles } from "../../../services/upload";
// import { fetchAllAmenities } from "../../../services/amenities"; // ✅ NEW
import Loader from "../../../components/BasicComponent/Loader";
import toast from "react-hot-toast";
import { fetchAllAmenities } from "../../../services/ammenities";

const AddRoomTypeModal = ({ onClose, propertyId, onSuccess }) => {
  // ---------- ROOM TYPES ----------
  const { data, isLoading, error } = useQuery({
    queryKey: ["roomTypes"],
    queryFn: () => fetchRoomTypes({ onlyActive: true }),
  });

  const roomTypes = data?.data || [];

  // ---------- AMENITIES (NEW) ----------
  const { data: amenitiesData } = useQuery({
    queryKey: ["amenities"],
    queryFn: () => fetchAllAmenities({ category: "room", onlyActive: true }),
  });

  // 🔥 REMOVE INACTIVE AMENITIES
  const amenities = (amenitiesData?.data || []).filter(
    (am) => am.isActive === true
  );

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    roomTypeId: "",
    area: "",
    bed: "",
    bathroom: "",
    numberOfRooms: "",
    oneNight: "",
    threeHours: "",
    sixHours: "",
    files: [],
    previews: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files || []);

    const previewUrls = files.map((file) =>
      URL.createObjectURL(file)
    );

    setFormData((prev) => ({
      ...prev,
      files: files,
      previews: previewUrls,
    }));
  };

  // ---------- TOGGLE AMENITY PILLS ----------
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
    mutationFn: async (payload) => {
      return createRoomForSpecificProperty(payload);
    },
    onSuccess: () => {
      toast.success("Room created successfully");
      onSuccess();
      onClose();
    },
    onError: (err) => {
      toast.error("Room creation failed");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedRoomType = roomTypes.find(
      (rt) => rt._id === formData.roomTypeId
    );

    const totalRooms = Number(formData.numberOfRooms);

    let photoUrls = [];

    if (formData.files.length > 0) {
      setIsUploading(true);
      try {
        const uploadResponse = await uploadFiles(
          formData.files,
          "photo"
        );

        photoUrls = uploadResponse.urls.map((item) => item.url);
      } catch (err) {
        toast.error("Image upload failed");
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    }

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

      photos:
        photoUrls.length > 0
          ? photoUrls
          : [
              "https://example.com/room1.jpg",
              "https://example.com/room2.jpg",
            ],

      // ✅ DYNAMIC AMENITIES (names only)
      amenities: selectedAmenities.map((a) => a.name),
    };

    mutation.mutate(payload);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[650px] rounded-lg p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
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
          <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto">
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
                {formData.previews.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="preview"
                    className="w-16 h-16 object-cover rounded"
                  />
                ))}
              </div>
            </div>

            {/* -------- AMENITIES PILLS -------- */}
            {/* <div>
              <label className="block text-sm font-medium mb-2">
                Select Amenities
              </label>

              <div className="flex flex-wrap gap-2">
                {amenities.map((am) => {
                  const isSelected = selectedAmenities.some(
                    (a) => a._id === am._id
                  );

                  return (
                    <span
                      key={am._id}
                      onClick={() => toggleAmenity(am)}
                      className={`px-3 py-1 rounded-full text-sm cursor-pointer border 
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
            </div> */}


            {/* -------- AMENITIES PILLS (SCROLLABLE) -------- */}
{/* -------- AMENITIES PILLS (HORIZONTAL SCROLL WITH BUTTONS) -------- */}
<div>
  <label className="block text-sm font-medium mb-2">
    Select Amenities
  </label>

  <div className="flex items-center gap-2">
    {/* Left Button */}
    <button
      type="button"
      onClick={() => {
        document
          .getElementById("amenitiesScroll")
          .scrollBy({ left: -200, behavior: "smooth" });
      }}
      className="px-2 py-1 border rounded-md bg-gray-100"
    >
      ◀
    </button>

    {/* Scrollable container */}
    <div
      id="amenitiesScroll"
      className="flex gap-2 overflow-x-auto whitespace-nowrap rounded-md p-2 w-full scrollbar-hide"
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

    {/* Right Button */}
    <button
      type="button"
      onClick={() => {
        document
          .getElementById("amenitiesScroll")
          .scrollBy({ left: 200, behavior: "smooth" });
      }}
      className="px-2 py-1 border rounded-md bg-gray-100"
    >
      ▶
    </button>
  </div>
</div>



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
                disabled={mutation.isLoading || isUploading}
                className="bg-[#0F766E] text-white px-5 py-2 rounded-md"
              >
                {isUploading
                  ? "Uploading images..."
                  : mutation.isLoading
                  ? "Submitting..."
                  : "Submit Room"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddRoomTypeModal;
