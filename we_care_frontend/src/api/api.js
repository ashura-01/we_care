// src/api/api.js
import axios from "axios";

const baseURL = "http://localhost:5600/api/v1/";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Log all requests
api.interceptors.request.use(
  (config) => {
    console.log("🚀 Request:", config.method.toUpperCase(), config.url);
    console.log("Request data:", config.data);
    const token = localStorage.getItem("token");
    if (token) {
      const cleanToken = token.replace(/['"]+/g, "").trim();
      if (cleanToken && cleanToken !== "null" && cleanToken !== "undefined") {
        config.headers.Authorization = `Bearer ${cleanToken}`;
        console.log("Token attached");
      }
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Log all responses
api.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", response.status, response.config.url);
    console.log("Response data:", response.data);
    return response;
  },
  (error) => {
    console.error("❌ Response error:", error.response?.status, error.response?.config?.url);
    console.error("Error data:", error.response?.data);
    console.error("Full error:", error);
    
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;