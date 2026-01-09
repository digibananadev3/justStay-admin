import axios from "axios";

// const UPLOAD_BASE_URL = "http://13.203.230.175:4000/api";
const UPLOAD_BASE_URL = "https://qwiz15.in/api";

// Upload files (photos or documents)
export const uploadFiles = async (files, type = "photo") => {
  const formData = new FormData();
  formData.append("type", type);
  
  // Append all files to formData
  if (Array.isArray(files)) {
    files.forEach((file) => {
      formData.append("files", file);
    });
  } else {
    formData.append("files", files);
  }

  const { data } = await axios.post(`${UPLOAD_BASE_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    timeout: 30000, // 30 seconds timeout for file uploads
  });

  return data;
};

