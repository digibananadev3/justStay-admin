import axios from "axios";
import apiClient from "./api/apiClient"

const PROPERTIES_LIST = "/properties"

export const fetchProperties = async (page = 1, limit = 10, search = "", status = "") => {
   // add only if present
     const params = {
    page,
    limit,
  };
  if (search) params.search = search;
   if (status) params.status = status;
  const { data } = await apiClient.get(PROPERTIES_LIST, { params })
  return data
}


export const exportProperties = async (search = "", status = "") => {
  const params = {};

  if (search && search.trim()) {
    params.search = search.trim();
  }

  if (status && status.trim()) {
    params.status = status.trim();
  }

  return axios.get(
    "http://localhost:3000/api/admin/properties/export",
    {
      params,
      responseType: "blob",
    }
  );
};


export const updateProperty = async (propertyId, payload) => {
  if (!propertyId) {
    throw new Error("Property ID is required");
  }

  const { data } = await axios.put(
    `http://localhost:3000/api/admin/${PROPERTIES_LIST}/${propertyId}`,
    payload
  );

  return data;
};




export const fetchPropertyById = async (propertyId) => {
  const { data } = await apiClient.get(`${PROPERTIES_LIST}/${propertyId}`)
  return data
}

export const fetchPropertiesStats = async () => {
  const { data } = await apiClient.get(`${PROPERTIES_LIST}/stats`)
  return data;
}

export const uploadPropertyPhotos = async (propertyId, photos) => {
  const { data } = await apiClient.post(`${PROPERTIES_LIST}/${propertyId}/media/photos`, {
    photos
  })
  return data
}

export const uploadPropertyDocuments = async (propertyId, documents) => {
  const { data } = await apiClient.post(`${PROPERTIES_LIST}/${propertyId}/documents`, {
    documents
  })
  return data
}

