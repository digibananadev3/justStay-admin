import axios from "axios";
import apiClient from "./api/apiClient";

const PROPERTIES_LIST = "/properties";
const AMENITIES_LIST = "/amenities";
const PROPERTY_TYPES = "/property-types";




export const fetchProperties = async (
  page = 1,
  limit = 10,
  search = "",
  status = ""
) => {
  // add only if present
  const params = {
    page,
    limit,
  };
  if (search) params.search = search;
  if (status) params.status = status;
  const { data } = await apiClient.get(PROPERTIES_LIST, { params });
  return data;
};


export const exportProperties = async (search = "", status = "") => {
  const params = {};

  if (search && search.trim()) {
    params.search = search.trim();
  }

  if (status && status.trim()) {
    params.status = status.trim();
  }

  return apiClient.get(`${PROPERTIES_LIST}/export`, {
    params,
    responseType: "blob",
  });
};

export const updateProperty = async (propertyId, payload) => {
  if (!propertyId) {
    throw new Error("Property ID is required");
  }

  const { data } = await apiClient.put(
    `${PROPERTIES_LIST}/${propertyId}`,
    payload
  );

  return data;
};





// export const deleteProperty = async (propertyId) => {
//   if (!propertyId) {
//     throw new Error("Property ID is required");
//   }

//   const { data } = await apiClient.delete(
//     `${PROPERTIES_LIST}/${propertyId}`
//   );

//   return data;
// };




export const softDeleteSingleProperty = async (propertyId) => {
  if (!propertyId) {
    throw new Error("Property ID is required");
  }

  const { data } = await apiClient.delete(
    `${PROPERTIES_LIST}/${propertyId}/delete`
  );

  return data;
};



export const fetchPropertyById = async (propertyId) => {
  const { data } = await apiClient.get(`${PROPERTIES_LIST}/${propertyId}`);
  return data;
};

export const fetchPropertiesStats = async () => {
  const {data} = await apiClient.get(`${PROPERTIES_LIST}/stats`);
  return data;
};

export const uploadPropertyPhotos = async (propertyId, photos) => {
  const { data } = await apiClient.post(
    `${PROPERTIES_LIST}/${propertyId}/media/photos`,
    {
      photos,
    }
  );
  return data;
};


export const deletePropertyImage = async (propertyId, photoId) => {
  if (!propertyId || !photoId) {
    throw new Error("Property ID and Photo ID are required");
  }

  const { data } = await apiClient.delete(
    `/properties/${propertyId}/media/photos/${photoId}`
  );

  return data;
};



export const updatePropertySinglePhotoStatus = async (
  propertyId,
  photoId,
  status
) => {
  if (!propertyId) {
    throw new Error("Property ID is required");
  }

  if (!photoId) {
    throw new Error("Photo ID is required");
  }

  if (!["Pending", "Approved", "Rejected"].includes(status)) {
    throw new Error("Invalid status value");
  }

  const { data } = await apiClient.patch(
    `${PROPERTIES_LIST}/${propertyId}/media/photos/status`,
    {
      photos: [
        {
          photoId,
          status,
        },
      ],
    }
  );

  return data;
};


export const uploadPropertyDocuments = async (propertyId, documents) => {
  const { data } = await apiClient.post(
    `${PROPERTIES_LIST}/${propertyId}/documents`,
    {
      documents,
    }
  );
  return data;
};




// export const updatePropertyDocument = async (
//   propertyId,
//   documentId,
//   payload   // <-- changed from "documents"
// ) => {
//   if (!propertyId) {
//     throw new Error("Property ID is required");
//   }

//   if (!documentId) {
//     throw new Error("Document ID is required");
//   }

//   if (!payload || typeof payload !== "object") {
//     throw new Error("Payload must be an object");
//   }

//   const { data } = await apiClient.put(
//     `/properties/${propertyId}/documents/${documentId}`,
//     payload
//   );

//   return data;
// };



export const updatePropertyDocument = async (
  propertyId,
  documentId,
  payload
) => {
  if (!propertyId) throw new Error("Property ID is required");
  if (!documentId) throw new Error("Document ID is required");
  if (!payload || typeof payload !== "object") throw new Error("Payload must be an object");

  // 🔐 Enforce remark rules before API call
  if (
    (payload.status === "Verified" || payload.status === "Rejected") &&
    (!payload.remark || payload.remark.trim() === "")
  ) {
    throw new Error(`Remark is required when status is ${payload.status}`);
  }

  // 🧹 Do not send remark when Pending
  if (payload.status === "Pending") {
    delete payload.remark;
  }

  const { data } = await apiClient.put(
    `/properties/${propertyId}/documents/${documentId}`,
    payload
  );

  return data;
};




export const deletePropertyDocument = async (propertyId, documentId) => {
  if (!propertyId || !documentId) {
    throw new Error("Property ID and Document ID are required");
  }

  const { data } = await apiClient.delete(
    `/properties/${propertyId}/documents/${documentId}`
  );

  return data;
};




export const fetchAllAmenities = async (
  page = 1,
  limit = 200,
  search = "",
  category = "room",
  isActive = ""
) => {
  const params = {
    page,
    limit,
  };

  if (search) params.search = search;
  if (category) params.category = category;
  if (isActive !== "") params.onlyActive = isActive;

  const { data } = await apiClient.get(AMENITIES_LIST, { params });
  return data;
};



export const addAmenitiesInProperty = async (propertyId, amenities = []) => {
  if (!propertyId) {
    throw new Error("Property ID is required");
  }

  if (!Array.isArray(amenities) || amenities.length === 0) {
    throw new Error("Amenities must be a non-empty array");
  }

  const { data } = await apiClient.post(
    `${PROPERTIES_LIST}/amenities/${propertyId}`,
    {
      amenities,
    }
  );

  return data;
};



export const removeAmmenitiesInProperty = async (propertyId, amenities) => {
  try {
    const { data } = await apiClient.delete(
      `${PROPERTIES_LIST}/amenities/${propertyId}`,
      {
        data: {
          amenities: amenities, // must be an array
        },
      }
    );

    return data;
  } catch (error) {
    throw error;
  }
};



export const fetchPropertyPerformance = async (propertyId) => {
  if (!propertyId) {
    throw new Error("Property ID is required");
  }

  const { data } = await apiClient.get(
    `${PROPERTIES_LIST}/${propertyId}/performance`
  );

  return data;
};


export const fetchPropertyReviewSummary = async (propertyId) => {
  if (!propertyId) {
    throw new Error("Property ID is required");
  }

  const { data } = await apiClient.get(
    `${PROPERTIES_LIST}/${propertyId}/reviews/summary`
  );

  return data;
};








// THIS IS THE CRUD OF THE PROPERTY TYPE 



// GET PROPERTY TYPE
export const getAllPropertyTypes = async (isActive = "") => {
  const params = {};

  if (isActive === true || isActive === false) {
    params.isActive = isActive;
  }

  const { data } = await apiClient.get(PROPERTY_TYPES, { params });
  return data;
};



// GET PROPERTY TYPE STATS
export const getPropertyTypeStats = async () => {
  const { data } = await apiClient.get(
    `${PROPERTY_TYPES}/property-types-stats`
  );
  return data;
};



// CREATE NEW PROPERTY TYPE (POST)
export const createNewPropertyType = async (payload) => {
  if (!payload || typeof payload !== "object") {
    throw new Error("Payload must be an object");
  }

  const { name } = payload;

  if (!name) {
    throw new Error("Property type name is required");
  }

  const { data } = await apiClient.post(PROPERTY_TYPES, payload);
  return data;
};



// UPDATE SINGLE PROPERTY TYPE (PUT)
export const updateSinglePropertyType = async (propertyTypeId, payload) => {
  if (!propertyTypeId) {
    throw new Error("Property Type ID is required");
  }

  if (!payload || typeof payload !== "object") {
    throw new Error("Payload must be an object");
  }

  const { data } = await apiClient.put(
    `${PROPERTY_TYPES}/${propertyTypeId}`,
    payload
  );

  return data;
};



// DELETE SINGLE PROPERTY TYPE (DELETE)
export const deleteSinglePropertyType = async (propertyTypeId) => {
  if (!propertyTypeId) {
    throw new Error("Property Type ID is required");
  }

  const { data } = await apiClient.delete(
    `${PROPERTY_TYPES}/${propertyTypeId}`
  );

  return data;
};



// THIS IS THE CRUD OF THE PROPERTY LIST TYPE


// GET PROPERTY LIST TYPE STATS
export const getPropertyListTypeStats = async () => {
  const { data } = await apiClient.get(
    "/property-list-types/property-type-list-stats"
  );
  return data;
};



// GET ALL PROPERTY LIST TYPES
export const getAllPropertyListTypes = async () => {
  const { data } = await apiClient.get("/property-list-types");
  return data;
};



// CREATE NEW PROPERTY LIST TYPE (POST)
// CREATE NEW PROPERTY LIST TYPE (POST)
export const createPropertyListType = async (payload) => {
  if (!payload || typeof payload !== "object") {
    throw new Error("Payload must be an object");
  }

  if (!payload.propertyTypeId) {
    throw new Error("propertyTypeId is required");
  }

  if (!payload.PropertyListTypeName) {
    throw new Error("PropertyListTypeName is required");
  }

  const { data } = await apiClient.post(
    "/property-list-types",
    payload
  );

  return data;
};



// UPDATE SINGLE PROPERTY LIST TYPE (PUT)
export const updateSinglePropertyListType = async (propertyListTypeId, payload) => {
  if (!propertyListTypeId) {
    throw new Error("Property List Type ID is required");
  }

  if (!payload || typeof payload !== "object") {
    throw new Error("Payload must be an object");
  }

  const { data } = await apiClient.put(
    `/property-list-types/${propertyListTypeId}`,
    payload
  );

  return data;
};



// DELETE SINGLE PROPERTY LIST TYPE (DELETE)
export const deleteSinglePropertyListType = async (propertyListTypeId) => {
  if (!propertyListTypeId) {
    throw new Error("Property List Type ID is required");
  }

  const { data } = await apiClient.delete(
    `/property-list-types/${propertyListTypeId}`
  );

  return data;
};
