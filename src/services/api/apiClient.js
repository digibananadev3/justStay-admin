import axios from "axios";

// const BASE_URL = "http://localhost:3000/api/admin"
// const NORMAL_URL = "http://localhost:3000/api/"
const BASE_URL = "https://qwiz15.in/api/admin"
const NORMAL_URL = "https://qwiz15.in/api/"

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
      "Content-Type": "application/json",
  },
  allowAbsoluteURL: true,
  timeout: 10000,
})


export const normalClient = axios.create({
  // baseURL: "http://localhost:3000/api/",
    baseURL: NORMAL_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;