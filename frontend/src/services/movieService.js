import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const searchMovies = async (filters) => {
  try {
    const response = await axios.get(`${API_URL}/movies/`, {
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
    const response = await axios.get(`${API_URL}/people/`, {
      params: filters,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching persons:", error);
    throw error;
  }
};
