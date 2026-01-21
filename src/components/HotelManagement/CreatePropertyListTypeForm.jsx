import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllPropertyTypes } from "../../services/properties";

const CreatePropertyListTypeForm = ({ isSaving, onClose, onSave }) => {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(true);

  const [form, setForm] = useState({
    propertyTypeId: "",
    propertyTypeName: "",
    PropertyListTypeName: "",
    description: "",
    icon: "",
    
  });

  // Fetch property types for dropdown
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await getAllPropertyTypes(true);
        setPropertyTypes(res.data || []);
      } catch (error) {
        toast.error("Failed to load property types");
      } finally {
        setLoadingTypes(false);
      }
    };

    fetchTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If selecting property type, also store its name
    if (name === "propertyTypeId") {
      const selected = propertyTypes.find((t) => t._id === value);
      setForm({
        ...form,
        propertyTypeId: value,
        propertyTypeName: selected?.name || "",
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.propertyTypeId) {
      return toast.error("Select a Property Type");
    }

    if (!form.PropertyListTypeName.trim()) {
      return toast.error("Property List Type Name is required");
    }

    // Send payload to parent mutation
    onSave({
      propertyTypeId: form.propertyTypeId,
      propertyTypeName: form.propertyTypeName,
      PropertyListTypeName: form.PropertyListTypeName,
      description: form.description,
      icon: form.icon,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[500px] rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          Create Property List Type
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Property Type Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Property Type *
            </label>

            {loadingTypes ? (
              <p className="text-sm text-gray-500">Loading types...</p>
            ) : (
              <select
                name="propertyTypeId"
                value={form.propertyTypeId}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
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

          {/* Property List Type Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Property List Type Name *
            </label>
            <input
              type="text"
              name="PropertyListTypeName"
              value={form.PropertyListTypeName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. Entire Home, Cottage, Villa"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              rows={3}
              placeholder="Short description..."
            />
          </div>

          {/* Icon */}
          <div>
            <label className="block text-sm font-medium mb-1">Icon</label>
            <input
              type="text"
              name="icon"
              value={form.icon}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. entire-property.png"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
              disabled={isSaving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePropertyListTypeForm;
