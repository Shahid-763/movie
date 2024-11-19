// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { fetchMoviesBySearch } from "../redux/moviesSlice"; // Import the action

// export default function SearchAppBar() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const dispatch = useDispatch(); // Use dispatch to trigger the Redux action

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchTerm.trim() === "") return;

//     dispatch(fetchMoviesBySearch(searchTerm)); // Dispatch the action
//   };

//   return (
//     <form onSubmit={handleSearch}>
//       {/* Search bar and input code here */}
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         placeholder="Search for movies"
//       />
//       <button type="submit">Search</button>
//     </form>
//   );
// }
import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Grid, Typography, CircularProgress } from "@mui/material";
import MovieCard from "./MovieCard"; // Adjust the import based on your project structure

const API_KEY = "ce07cbbca3b3f3e5f2b12dbc4aa85157"; // Replace with your actual API key
const BASE_URL = "https://api.themoviedb.org/3";

export default function SearchMovies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query: searchTerm,
        },
      });
      setMovies(response.data.results); // Set the results to the state
    } catch (err) {
      setError("Error fetching movies. Please try again.");
    } finally {
      setLoading(false);
    }

    setSearchTerm(""); // Clear the input after search
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <TextField
          label="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          size="small"
          style={{ marginBottom: "16px" }}
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </form>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {movies.length === 0 && !loading && (
        <Typography>No movies found.</Typography>
      )}

      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4}>
            <MovieCard
              title={movie.title}
              releaseDate={movie.release_date}
              posterPath={movie.poster_path}
              rating={movie.vote_average}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
