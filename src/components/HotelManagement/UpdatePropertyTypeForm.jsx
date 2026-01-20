import { useState, useEffect } from "react";

const UpdatePropertyTypeForm = ({
  propertyType,
  isSaving,
  onClose,
  onSave,
}) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    icon: "",
    isActive: true,
  });

  useEffect(() => {
    if (propertyType) {
      setForm({
        name: propertyType.name || "",
        description: propertyType.description || "",
        icon: propertyType.icon || "",
        isActive: propertyType.status === "Active",
      });
    }
  }, [propertyType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggle = () => {
    setForm((prev) => ({
      ...prev,
      isActive: !prev.isActive,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      description: form.description,
      icon: form.icon,
      isActive: form.isActive,
    };

    onSave(propertyType._id, payload);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[9999]">
      <div className="bg-white rounded-2xl p-6 w-[420px] shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          Edit Property Type
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Icon (filename or emoji)
            </label>
            <input
              name="icon"
              value={form.icon}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Active</span>
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={handleToggle}
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="px-4 py-2 border rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              {isSaving ? "Saving..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePropertyTypeForm;
