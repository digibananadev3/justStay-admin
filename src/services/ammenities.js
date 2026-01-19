import axios from "axios";
import apiClient from "./api/apiClient";

const AMENITIES_LIST = "/amenities";



export const updateAmenity = async (amenityId, payload) => {
  if (!amenityId) {
    throw new Error("Amenity ID is required");
  }

  // Remove undefined or null fields so only changed values are sent
  const cleanPayload = Object.fromEntries(
    Object.entries(payload).filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
  );

  const { data } = await apiClient.put(
    `${AMENITIES_LIST}/${amenityId}`,
    cleanPayload
  );

  return data;
};



/**
 * Create a new Amenity
 */
export const createNewAmenity = async (payload) => {
  if (!payload?.name || !payload.name.trim()) {
    throw new Error("Amenity name is required");
  }

  // Clean payload (remove empty fields)
  const cleanPayload = Object.fromEntries(
    Object.entries(payload).filter(
      ([_, value]) =>
        value !== undefined &&
        value !== null &&
        value !== ""
    )
  );

  const { data } = await apiClient.post(
    `${AMENITIES_LIST}/create`,
    cleanPayload
  );

  return data;
};



export const deleteAmenity = async (amenityId) => {
  if (!amenityId) {
    throw new Error("Amenity ID is required");
  }

  const { data } = await apiClient.delete(
    `${AMENITIES_LIST}/${amenityId}`
  );

  return data;
};


export const fetchAmenitiesStats = async () => {
  const { data } = await apiClient.get(
    `${AMENITIES_LIST}/get-ammenities-stats`
  );
  return data;
};



/**
 * Fetch all amenities with optional filters
 */
export const fetchAllAmenities = async ({
  category = "",
  search = "",
  page = 1,
  limit = 200,
  onlyActive = false,
} = {}) => {
  const params = {
    page,
    limit,
  };

  if (category) params.category = category;
  if (search) params.search = search;
  if (onlyActive) params.onlyActive = true;

  const { data } = await apiClient.get(AMENITIES_LIST, { params });
  return data;
};



