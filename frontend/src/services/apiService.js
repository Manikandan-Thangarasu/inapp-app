// frontend/src/services/apiService.js

import axios from "axios";

// Create an axios instance with default settings
const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

// Set the Authorization token for all requests if token is present
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Function to login and get the JWT token
export const login = async (username, password) => {
  try {
    const response = await api.post(
      "/token",
      new URLSearchParams({
        username,
        password,
      })
    );

    const { access_token } = response.data;
    if (access_token) {
      // Set token in Authorization header for future requests
      setAuthToken(access_token);
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export default api;
