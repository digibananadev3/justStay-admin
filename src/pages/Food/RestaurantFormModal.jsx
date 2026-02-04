import { useState } from "react";
import { addNewRestaurant } from "../../services/food";
import toast from "react-hot-toast";

const RestaurantFormModal = ({ isOpen, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    contactNumber: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNewRestaurant(form);
      toast.success("Restaurant created successfully");
      onSuccess(); // refresh table
      onClose();
      setForm({ name: "", location: "", contactNumber: "", email: "" });
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl w-[420px] p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Create Restaurant</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="Restaurant Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="contactNumber"
            placeholder="Contact Number"
            value={form.contactNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestaurantFormModal;
