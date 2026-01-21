import { useState } from "react";
import toast from "react-hot-toast";
import { uploadFiles } from "../../../services/upload";
import { updatePropertyDocument } from "../../../services/properties";

const ViewAndEditDocument = ({ doc, propertyId, onClose, onUpdated }) => {
  const [status, setStatus] = useState(doc.status || "Pending");
  const [remark, setRemark] = useState(doc.remark || "");
  const [previewUrl, setPreviewUrl] = useState(doc.documentUrl);
  const [newFile, setNewFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      // 🔐 Frontend validation
      if ((status === "Verified" || status === "Rejected") && !remark.trim()) {
        toast.error("Remark is required for Verified or Rejected documents");
        return;
      }

      setIsSaving(true);

      let finalUrl = doc.documentUrl;

      if (newFile) {
        const uploadRes = await uploadFiles([newFile], "document");
        if (!uploadRes.urls?.length) {
          throw new Error("File upload failed");
        }
        finalUrl = uploadRes.urls[0].url;
      }

      const payload = {
        documentType: doc.documentType,
        status,
        documentUrl: finalUrl,
      };

      // Send remark only when needed
      if (status === "Verified" || status === "Rejected") {
        payload.remark = remark.trim();
      }

      await updatePropertyDocument(propertyId, doc._id, payload);

      toast.success("Document updated successfully");
      onUpdated();
      onClose();
    } catch (error) {
      toast.error(error.message || "Update failed");
    } finally {
      setIsSaving(false);
    }
  };

  const isImage = previewUrl?.match(/\.(jpg|jpeg|png|webp)$/i);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg w-[500px] shadow-lg max-h-[80vh] overflow-y-scroll">
        <h2 className="text-lg font-semibold mb-3">
          View & Edit {doc.documentType}
        </h2>

        {/* Preview */}
        <div className="border p-3 rounded mb-3 text-center">
          {isImage ? (
            <img src={previewUrl} alt="document" className="max-h-[250px] mx-auto" />
          ) : (
            <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              View Document
            </a>
          )}
        </div>

        {/* Upload */}
        <div className="border border-dashed border-gray-300 rounded-lg p-4 mb-3 text-center bg-gray-50">
          <label className="cursor-pointer block">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="text-teal-600 font-medium">Click to replace document</div>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG, PDF, DOC, DOCX allowed</p>
          </label>
        </div>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => {
            const val = e.target.value;
            setStatus(val);
            if (val === "Pending") setRemark(""); // auto-clear
          }}
          className="border p-2 rounded w-full mb-3"
        >
          <option value="Pending">Pending</option>
          <option value="Verified">Verified</option>
          <option value="Rejected">Rejected</option>
        </select>

        {/* Remark input (only when needed) */}
        {(status === "Verified" || status === "Rejected") && (
          <textarea
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder={`Enter remark for ${status}`}
            className="border p-2 rounded w-full mb-3"
            rows={3}
          />
        )}

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-2 border rounded" disabled={isSaving}>
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-3 py-2 bg-teal-600 text-white rounded"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAndEditDocument;
