import axios from "axios";
import { normalClient } from "./api/apiClient";

const RESTAURANT_LIST = "/food/restaurants";
const FOOD_LIST = "/food/foods";
const PROPERTY_FOOD = "/food/property-food";


// CREATE NEW RESTAURANT
export const addNewRestaurant = async (payload) => {
  if (!payload || typeof payload !== "object") {
    throw new Error("Payload must be an object");
  }

  const { name, location, contactNumber, email } = payload;

  if (!name || !location || !contactNumber || !email) {
    throw new Error("Name, location, contactNumber and email are required");
  }

  const { data } = await normalClient.post(RESTAURANT_LIST, payload);
  return data;
};



// GET ALL RESTAURANTS
export const getAllRestaurants = async () => {
  try {
    const { data } = await normalClient.get(RESTAURANT_LIST);
    return data; 
    // { success: true, count: 3, data: [...] }
  } catch (error) {
    console.error("Error fetching restaurants:", error?.response?.data || error.message);
    throw error;
  }
};



// DELETE RESTAURANT
export const deleteRestaurant = async (id) => {
  if (!id) throw new Error("Restaurant ID is required");

  const { data } = await normalClient.delete(`${RESTAURANT_LIST}/${id}`);
  return data; // { success: true, message: "Restaurant deleted successfully" }
};




/* =========================
   GLOBAL FOOD
========================= */

// CREATE FOOD
export const addNewFood = async (payload) => {
  if (!payload || typeof payload !== "object") {
    throw new Error("Payload must be an object");
  }

  const { title, category, totalStock, images } = payload;
  console.log("Payload in addNewFood:", payload);

  if (!title || !category || totalStock === undefined) {
    throw new Error("Title, category and totalStock are required");
  }

  if (!images || !Array.isArray(images) || images.length === 0) {
    throw new Error("At least one image is required");
  }

  const { data } = await normalClient.post(FOOD_LIST, payload);
  return data; // { success, message, data }
};


// GET ALL FOODS
export const getAllFoods = async () => {
  try {
    const { data } = await normalClient.get(FOOD_LIST);
    return data; // { success, count, data }
  } catch (error) {
    console.error("Error fetching foods:", error?.response?.data || error.message);
    throw error;
  }
};


// GET SINGLE FOOD BY ID
export const getFoodById = async (id) => {
  if (!id) throw new Error("Food ID is required");

  const { data } = await normalClient.get(`${FOOD_LIST}/${id}`);
  return data; // { success, data }
};



// DELETE FOOD
export const deleteFood = async (id) => {
  if (!id) throw new Error("Food ID is required");

  const { data } = await normalClient.delete(`${FOOD_LIST}/${id}`);
  return data; // { success, message }
};


/* =========================
   PROPERTY FOOD
========================= */

// ASSIGN FOOD TO RESTAURANT
export const assignFoodToRestaurant = async (payload) => {
  const { data } = await normalClient.post(PROPERTY_FOOD, payload);
  return data;
};


// GET FOODS OF A RESTAURANT
export const getRestaurantFoods = async (restaurantId) => {
  const { data } = await normalClient.get(
    `${PROPERTY_FOOD}/restaurant/${restaurantId}`
  );
  return data;
};


// UPDATE FOOD STOCK OF A RESTAURANT
export const updateRestaurantFoodStock = async (id, payload) => {
  const { data } = await normalClient.put(`${PROPERTY_FOOD}/${id}`, payload);
  return data;
};


// REMOVE FOOD FROM RESTAURANT
export const removeRestaurantFood = async (id) => {
  const { data } = await normalClient.delete(`${PROPERTY_FOOD}/${id}`);
  return data;
};