import { useEffect, useState } from "react";
import { fetchPropertyById, updateProperty } from "../services/properties";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const EditHotelDrawer = ({ isOpen, setIsOpen, propertyId }) => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    state: "",
    phone: "",
    status: "",
    propertyType: "",
  });

  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormData({
      name: "",
      city: "",
      state: "",
      phone: "",
      status: "",
      propertyType: "",
    });
  };

  useEffect(() => {
    if (!propertyId || !isOpen) return;

    resetForm();

    const loadProperty = async () => {
      try {
        const res = await fetchPropertyById(propertyId);
        console.log(
          "This is the value of the res from the editHoteldrawer",
          res
        );
        const data = res.data;

        setFormData({
          name: data?.property.basicPropertyDetails?.name || "",
          city: data?.property?.location?.city || "",
          state: data?.property?.location?.state || "",
          phone: data?.property?.contactDetails?.mobile || "",
          status: data?.property?.status || "",
          propertyType: data?.property?.propertyType || "",
        });
      } catch (err) {
        console.error("Failed to load property", err);
      }
    };

    loadProperty();
  }, [propertyId, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Build payload only with existing values
      const payload = {};

      if (formData.name?.trim()) payload.name = formData.name.trim();
      if (formData.city?.trim()) payload.city = formData.city.trim();
      if (formData.state?.trim()) payload.state = formData.state.trim();
      if (formData.phone?.trim()) payload.phone = formData.phone.trim();
      if (formData.status) payload.status = formData.status;
      if (formData.propertyType) payload.propertyType = formData.propertyType;

      // Safety check: if nothing to update
      if (Object.keys(payload).length === 0) {
        toast("No changes to update", { icon: "ℹ️" });
        return;
      }

      const data = await updateProperty(propertyId, payload);
      if (!data?.success) {
        toast.error("Failed to update hotel");
        return;
      }

      toast.success("Hotel updated successfully");

      // THIS IS THE IMPORTANT PART
      await queryClient.invalidateQueries({
        queryKey: ["properties"],
      });

      // Optional: also refresh stats if status changed
      await queryClient.invalidateQueries({
        queryKey: ["propertiesStats"],
      });
      
resetForm();
      setIsOpen(false);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-gray-100">
        {/* Header */}
        <div className="px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-900">Edit Hotel</h2>
          <p className="text-sm text-gray-500 mt-1">
            Update hotel information and status
          </p>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 space-y-5">
          {/* Hotel Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hotel Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter hotel name"
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* City & State */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select status</option>
              <option value="Accepted">Accepted</option>
              <option value="Under Review">Under Review</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Type
            </label>
            <input
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              placeholder="Hotel / Resort / Lodge"
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-3 flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
          <button
            onClick={() => { resetForm(); setIsOpen(false) }}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditHotelDrawer;
