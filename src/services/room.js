import axios from "axios";
import apiClient, { normalClient } from "./api/apiClient";


const PROPERTIES_LIST = "/properties";
// const AMENITIES_LIST = "/amenities";
const ROOM_TYPES_LIST = "/room-types";
const CREATE_ROOM = "/rooms";




export const fetchRoomTypes = async ({
  page = 1,
  limit = 200,
  search = "",
  onlyActive = true,
} = {}) => {
  const params = {
    page,
    limit,
  };

  if (search) params.search = search;
  if (onlyActive !== undefined) params.onlyActive = onlyActive;

  const { data } = await apiClient.get(ROOM_TYPES_LIST, { params });
  return data;
};


export const createRoomForSpecificProperty = async (payload) => {
  const { data } = await normalClient.post(CREATE_ROOM, payload);
  return data;
};



export const updateRoomForSpecificProperty = async (roomId, payload) => {
  const { data } = await normalClient.put(`/rooms/${roomId}`, payload);
  return data;
};
