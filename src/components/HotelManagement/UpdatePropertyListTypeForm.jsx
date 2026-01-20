import { useEffect, useState } from "react";
import { getAllPropertyTypes } from "../../services/properties"; // adjust path if needed

const UpdatePropertyListTypeForm = ({
  propertyListType,
  isSaving,
  onClose,
  onSave,
}) => {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(true);

const [form, setForm] = useState({
  propertyTypeId: propertyListType.propertyTypeId || "",
  PropertyListTypeName: propertyListType.propertyListTypeName || "",
  description: propertyListType.description || "",
    icon: propertyListType.icon || "",
  isActive: propertyListType.isActive ?? true,
});


  // Fetch property types on mount
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await getAllPropertyTypes(true); // only active types
        setPropertyTypes(res.data || []);
      } catch (error) {
        console.error("Failed to fetch property types:", error);
      } finally {
        setLoadingTypes(false);
      }
    };

    fetchTypes();
  }, []);

  // Prefill form when editing
  useEffect(() => {
    if (propertyListType) {
      setForm({
        propertyTypeId:
          propertyListType.propertyTypeId?._id ||
          propertyListType.propertyTypeId ||
          "",

        PropertyListTypeName:
          propertyListType.propertyListTypeName || "",

        description: propertyListType.description || "",

        icon: propertyListType.icon || "",

        isActive: propertyListType.isActive ?? true,
      });
    }
  }, [propertyListType]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    if (!propertyListType?._id) return;
    onSave(propertyListType._id, form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[550px] rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          Update Property List Type
        </h2>

        <div className="space-y-4">
          {/* PROPERTY TYPE SELECT */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Property Type
            </label>

            {loadingTypes ? (
              <p className="text-sm text-gray-500">Loading types...</p>
            ) : (
            <select
  value={form.propertyTypeId}
  className="w-full border rounded-lg p-2"
  onChange={(e) =>
    setForm({ ...form, propertyTypeId: e.target.value })
  }
>
  <option value="">Select Property Type</option>
  {propertyTypes.map((type) => (
    <option key={type._id} value={type._id}>
      {type.name}
    </option>
  ))}
</select>

            )}
          </div>

          {/* PROPERTY LIST TYPE NAME */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Property List Type Name
            </label>
            <input
              type="text"
              name="PropertyListTypeName"
              value={form.PropertyListTypeName}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              rows={3}
            />
          </div>


          <div>
  <label className="block text-sm font-medium mb-1">
    Icon
  </label>
  <input
    type="text"
    name="icon"
    value={form.icon}
    onChange={handleChange}
    className="w-full border rounded-lg p-2"
    placeholder="e.g. entire-property.png"
  />
</div>

          {/* ACTIVE TOGGLE */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            <label className="text-sm">Active</label>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 border rounded-lg"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={handleSubmit}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePropertyListTypeForm;
