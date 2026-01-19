import { useState, useEffect } from "react";

const UpdateAmenityForm = ({ amenity, onClose, onSave, isSaving }) => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    isActive: true,
  });

  useEffect(() => {
    if (amenity) {
      setForm({
        name: amenity.name || "",
        category: amenity.category || "",
        isActive: amenity.status === "Active",
      });
    }
  }, [amenity]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {};

    if (form.name !== amenity.name) payload.name = form.name;
    if (form.category !== amenity.category)
      payload.category = form.category;
    if (form.isActive !== (amenity.status === "Active"))
      payload.isActive = form.isActive;

    onSave(amenity._id, payload);
  };

  if (!amenity) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[10000]">
      <div className="bg-white p-6 rounded-2xl w-[400px] shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Edit Amenity</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option value="room">Room</option>
              <option value="property">Property</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            <label>Active</label>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="border px-4 py-2 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              {isSaving ? "Saving..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAmenityForm;
