import { useEffect, useState } from "react";
import { fetchPropertyById, updateProperty } from "../services/properties";

const EditHotelDrawer = ({ isOpen, setIsOpen, propertyId }) => {
const [formData, setFormData] = useState({
  name: "",
  city: "",
  state: "",
  phone: "",
  status: "",
  propertyType: "",
});


  const [loading, setLoading] = useState(false);

useEffect(() => {
  if (!propertyId || !isOpen) return;

  const loadProperty = async () => {
    const res = await fetchPropertyById(propertyId);
    const data = res.data;

    setFormData({
      name: data.basicPropertyDetails?.name || "",
      city: data.location?.city || "",
      state: data.location?.state || "",
      phone: data.contactDetails?.mobile || "",
      status: data.status || "",
      propertyType: data.propertyType || "", // ✅ added
    });
  };

  loadProperty();
}, [propertyId, isOpen]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
  try {
    setLoading(true);

    console.log(propertyId, "property iddddddd");
    await updateProperty(propertyId, {
      name: formData.name,
      city: formData.city,
      state: formData.state,
      phone: formData.phone,
      status: formData.status,
      propertyType: formData.propertyType,
    });

    setIsOpen(false);
  } catch (err) {
    console.error("Update failed:", err);
    alert("Update failed");
  } finally {
    setLoading(false);
  }
};


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      
      {/* Modal Box */}
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 relative">
        
        <h2 className="text-xl font-semibold mb-4">Edit Hotel</h2>

        <div className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Hotel Name"
            className="w-full border p-2 rounded"
          />

          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full border p-2 rounded"
          />

          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className="w-full border p-2 rounded"
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border p-2 rounded"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Status</option>
            <option value="Accepted">Accepted</option>
            <option value="Under Review">Under Review</option>
            <option value="Rejected">Rejected</option>
          </select>

    <input
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            placeholder="propertyType"
            className="w-full border p-2 rounded"
          />

        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditHotelDrawer;
