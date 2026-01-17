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
  console.log("This is the payload for the createRoomForSpecificProperty", payload);
  const { data } = await normalClient.post(CREATE_ROOM, payload);
  return data;
};



export const updateRoomForSpecificProperty = async (roomId, payload) => {
  const { data } = await normalClient.put(`/rooms/${roomId}`, payload);
  return data;
};



export const deleteRoomForSpecificProperty = async (roomId) => {
  if (!roomId) {
    throw new Error("Room ID is required");
  }

  const { data } = await normalClient.delete(`/rooms/${roomId}`);
  return data;
};
