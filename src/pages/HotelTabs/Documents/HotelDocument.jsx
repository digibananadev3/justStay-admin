import { LuUpload } from "react-icons/lu"
import VerificationStatus from "./VerificationStatus"
import { useProperty } from "../../HotelManagementDrawer";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadFiles } from "../../../services/upload";
import { uploadPropertyDocuments } from "../../../services/properties";

const HotelDocument = () => {
  const { property, propertyId } = useProperty() || {};
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [documentType, setDocumentType] = useState("Aadhar");
  const queryClient = useQueryClient();

  // Document types
  const documentTypes = [
    "Aadhar",
    "Pan",
    "Electricity",
    "Phone",
    "GST",
    "Business License",
    "Other"
  ];

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async ({ files, docType }) => {
      setIsUploading(true);
      try {
        // Step 1: Upload files to get URLs
        const uploadResponse = await uploadFiles(files, "document");
        
        if (!uploadResponse.urls || uploadResponse.urls.length === 0) {
          throw new Error("No files were uploaded");
        }

        // Step 2: Prepare documents array with URLs
        const documentsData = uploadResponse.urls.map((item) => ({
          documentType: docType,
          status: "Pending",
          documentUrl: item.url,
        }));

        // Step 3: Upload documents to property
        await uploadPropertyDocuments(propertyId, documentsData);

        // Step 4: Refetch property data
        await queryClient.invalidateQueries({ queryKey: ["property", propertyId] });
        
        return uploadResponse;
      } finally {
        setIsUploading(false);
      }
    },
    onSuccess: () => {
      alert("Documents uploaded successfully!");
    },
    onError: (error) => {
      console.error("Upload error:", error);
      alert(`Upload failed: ${error.message || "Unknown error"}`);
    },
  });

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (!propertyId) {
      alert("Please select a property first");
      return;
    }

    if (!documentType) {
      alert("Please select a document type");
      return;
    }

    uploadMutation.mutate({ files, docType: documentType });
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    if (!propertyId) {
      alert("Please select a property first");
      return;
    }
    fileInputRef.current?.click();
  };

  // Get documents from property
  const documents = property?.documents || [];

  return (
    <>
      <div className="flex justify-between mb-3">
        <p className="text-[#101828] text-[14px] leading-7 font-semibold">
          Documents & Verification
        </p>
        <div className="flex items-center gap-2">
          <select
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-[13px] leading-5 bg-white"
            disabled={isUploading}
          >
            {documentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            multiple
            className="hidden"
            onChange={handleFileSelect}
            disabled={isUploading}
          />
          <button
            onClick={handleUploadClick}
            disabled={isUploading || !propertyId}
            className="bg-[#0F766E] text-white px-3 py-2 rounded-md text-[13px] leading-5 font-medium inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LuUpload />
            {isUploading ? "Uploading..." : "Upload Documents"}
          </button>
        </div>
      </div>

      <div>
        <VerificationStatus items={documents.map((doc) => ({
          title: doc.documentType || "Document",
          uploaded: doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleDateString() : "N/A",
          status: doc.status?.toLowerCase() || "pending",
        }))} />
      </div>
    </>
  )
}

export default HotelDocument