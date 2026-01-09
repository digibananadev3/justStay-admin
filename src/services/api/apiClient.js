import axios from "axios";

// const BASE_URL = "http://13.203.230.175:4000/api/admin"
// const BASE_URL = "http://localhost:3000/api/admin"
const BASE_URL = "https://qwiz15.in/api/admin"

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
      "Content-Type": "application/json",
  },
  allowAbsoluteURL: true,
  timeout: 10000,
})

export default apiClient;