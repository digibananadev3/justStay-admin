import Container from "../../../components/BasicComponent/Container";
import CardComponent from "../../../components/Cards/CardComponent";
import { LuImage, LuClock, LuUpload } from "react-icons/lu";
import { FiCheckCircle } from 'react-icons/fi';
import HotelImages from "./HotelImages";
import HotelVideo from "./HotelVideo";
import { useProperty } from "../../HotelManagementDrawer";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadFiles } from "../../../services/upload";
import { uploadPropertyPhotos } from "../../../services/properties";

const HotelMedia = ({ stats }) => {
  const { property, propertyId } = useProperty() || {};
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const queryClient = useQueryClient();

  // Calculate stats from property photos
  const photos = property?.photos || [];
  const totalPhotos = photos.length;
  const approvedPhotos = photos.filter(p => p.status === "Approved").length;
  const pendingPhotos = photos.filter(p => p.status === "Pending").length;

  const data = {
    total: totalPhotos,
    approved: approvedPhotos,
    pending: pendingPhotos,
    minRequired: 15,
    ...stats,
  };

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (files) => {
      setIsUploading(true);
      try {
        // Step 1: Upload files to get URLs
        const uploadResponse = await uploadFiles(files, "photo");
        
        if (!uploadResponse.urls || uploadResponse.urls.length === 0) {
          throw new Error("No files were uploaded");
        }

        // Step 2: Prepare photos array with URLs
        const photosData = uploadResponse.urls.map((item) => ({
          name: "room",
          status: "Pending",
          url: item.url,
        }));

        // Step 3: Upload photos to property
        await uploadPropertyPhotos(propertyId, photosData);

        // Step 4: Refetch property data
        await queryClient.invalidateQueries({ queryKey: ["property", propertyId] });
        
        return uploadResponse;
      } finally {
        setIsUploading(false);
      }
    },
    onSuccess: () => {
      alert("Images uploaded successfully!");
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

    uploadMutation.mutate(files);
    
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

  // Get image URLs from property photos
  const imageUrls = photos.map(p => p.url).filter(Boolean);

  return (
    <>
      <div>
        <div className="flex justify-between mb-3">
          <p className="text-[#101828] text-[14px] leading-7 font-semibold">Media Management</p>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
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
              {isUploading ? "Uploading..." : "Upload Images"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <CardComponent
              title="Total Images"
              totalNumber={data.total}
              isIcon={true}
              symbolIcon={<LuImage className="text-[#7C3AED]" />}
              borderColor="border-[#E9D5FF]"
              bgColor="bg-[linear-gradient(135deg,#F5F3FF_0%,#F3E8FF_100%)]"
              fontTitleColor="text-[#7C3AED]"
              minRequired={data.minRequired}
            />
          </div>

          <CardComponent
            title="Approved"
            totalNumber={data.approved}
            isIcon={true}
            symbolIcon={<FiCheckCircle className="text-[#155DFC]" />}
            borderColor="border-[#BEDBFF]"
            bgColor="bg-[linear-gradient(135deg,#EFF6FF_0%,#DBEAFE_100%)]"
            fontTitleColor="text-[#155DFC]"
          />

          <CardComponent
            title="Pending Review"
            totalNumber={data.pending}
            isIcon={true}
            symbolIcon={<LuClock className="text-[#EA580C]" />}
            borderColor="border-[#FED7AA]"
            bgColor="bg-[linear-gradient(135deg,#FFF7ED_0%,#FFEDD5_100%)]"
            fontTitleColor="text-[#EA580C]"
          />
        </div>
        
        <div className="mt-6">
          <Container title={"Hotel Images"}>
            <HotelImages images={imageUrls} />
          </Container>
        </div>

        <div className="mt-6">
          <Container title={"Virtual Tours & Videos"}>
            <HotelVideo videoUrl={""} onSelect={() => {}} />
          </Container>
        </div>
      </div>
    </>
  );
};

export default HotelMedia;