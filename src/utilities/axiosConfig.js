import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://localhost:7290/api", // Replace with your backend URL
  timeout: 60000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;