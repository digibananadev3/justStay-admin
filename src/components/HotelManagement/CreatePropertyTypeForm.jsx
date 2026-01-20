import { useState } from "react";

const CreatePropertyTypeForm = ({ isSaving, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    icon: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[400px]">
        <h2 className="text-lg font-semibold mb-4">
          Create Property Type
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Property Type Name"
            className="w-full border p-2 rounded"
            value={form.name}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            className="w-full border p-2 rounded"
            value={form.description}
            onChange={handleChange}
          />

          <input
            type="text"
            name="icon"
            placeholder="Icon (e.g. hotel-icon.png)"
            className="w-full border p-2 rounded"
            value={form.icon}
            onChange={handleChange}
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="px-4 py-2 border rounded"
              onClick={onClose}
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

export default CreatePropertyTypeForm;
