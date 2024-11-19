// frontend/src/services/apiService.js

import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

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

export const searchMovies = async (filters) => {
  try {
    const response = await api.get(`${API_URL}/movies/search`, {
      params: filters,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const searchPersons = async (filters) => {
  try {
    const response = await api.get(`${API_URL}/people/search`, {
      params: filters,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching persons:", error);
    throw error;
  }
};

export const getAllPersons = async () => {
  try {
    const response = await api.get(`${API_URL}/people/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching persons:", error);
    throw error;
  }
};

export const getAllMovies = async () => {
  try {
    const response = await api.get(`${API_URL}/movies/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export default api;
