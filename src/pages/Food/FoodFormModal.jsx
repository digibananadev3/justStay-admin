import { useState } from "react";
import { createPortal } from "react-dom";
import { addNewFood } from "../../services/food";
import { uploadFiles } from "../../services/upload"; // <-- your upload.js
import toast from "react-hot-toast";

const FoodFormModal = ({ isOpen, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    totalStock: ""
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (selectedFiles.length === 0) {
        throw new Error("Please select at least one image");
      }

      // 1️⃣ Upload images
      const uploadRes = await uploadFiles(selectedFiles, "photo");

      // 2️⃣ Extract URLs
      let imageUrls = [];
      if (Array.isArray(uploadRes?.urls)) {
        imageUrls = uploadRes.urls.map((f) => f.url);
      } else {
        console.error("Invalid upload response:", uploadRes);
        throw new Error("Image upload failed");
      }

      // 3️⃣ Send to backend
      const payload = {
        title: form.title,
        category: form.category,
        totalStock: Number(form.totalStock),
        images: imageUrls
      };

      await addNewFood(payload);

      toast.success("Food created successfully");
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-[420px] rounded-xl p-6 shadow-xl">
        <h3 className="text-lg font-semibold mb-4">Create Food</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Food Title"
            className="w-full border rounded-md p-2"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            name="category"
            placeholder="Category (Veg, Non-Veg, etc.)"
            className="w-full border rounded-md p-2"
            value={form.category}
            onChange={handleChange}
            required
          />

          <input
            name="totalStock"
            type="number"
            placeholder="Total Stock"
            className="w-full border rounded-md p-2"
            value={form.totalStock}
            onChange={handleChange}
            required
          />

          {/* IMAGE PICKER */}
          <input
            type="file"
            multiple
            accept="image/*"
            className="w-full border rounded-md p-2"
            onChange={handleFiles}
          />

          {/* PREVIEW */}
          {preview.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {preview.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="preview"
                  className="h-20 w-20 object-cover rounded"
                />
              ))}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default FoodFormModal;
