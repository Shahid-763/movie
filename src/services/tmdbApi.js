import axios from "axios";

const API_KEY = "ce07cbbca3b3f3e5f2b12dbc4aa85157"; // Replace with your TMDB API key
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  return response.data;
};

export const getTopRatedMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
  return response.data;
};

export const getUpcomingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
  return response.data;
};

// Add functions for genres
export const getMoviesByGenre = async (genreId) => {
  const response = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
  return response.data;
};

// Genre IDs for TMDB
export const genreIds = {
  action: 28,
  adventure: 12,
  comedy: 35,
  animation: 16,
};
export const getMoviesBySearchTerm = async (searchTerm) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query: searchTerm,
    },
  });
  return response.data; // Make sure you return the whole response if needed
};

export const getMovieTrailers = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/videos`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data.results; // Return the list of trailers
};
export const getMovieDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data;
};