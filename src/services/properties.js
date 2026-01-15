import axios from "axios";
import apiClient from "./api/apiClient";

const PROPERTIES_LIST = "/properties";
const AMENITIES_LIST = "/amenities";

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





export const deleteProperty = async (propertyId) => {
  if (!propertyId) {
    throw new Error("Property ID is required");
  }

  const { data } = await apiClient.delete(
    `${PROPERTIES_LIST}/${propertyId}`
  );

  return data;
};


export const fetchPropertyById = async (propertyId) => {
  const { data } = await apiClient.get(`${PROPERTIES_LIST}/${propertyId}`);
  console.log("This is the value of the data from the fetchPropertyById", data);
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

export const uploadPropertyDocuments = async (propertyId, documents) => {
  const { data } = await apiClient.post(
    `${PROPERTIES_LIST}/${propertyId}/documents`,
    {
      documents,
    }
  );
  return data;
};






export const fetchAllAmenities = async (
  page = 1,
  limit = 200,
  search = "",
  category = "",
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
    console.error("Error removing amenities:", error.response?.data || error);
    throw error;
  }
};