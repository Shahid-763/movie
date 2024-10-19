import React, { useState ,useEffect} from "react";
import { CssBaseline, ThemeProvider, createTheme, Box, Toolbar } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SearchAppBar from './components/header.js';
import SidebarWithButton from './components/sidebar.js';
import MovieGrid from './components/MovieGrid.js';
import MovieDetail from './components/MovieDetail'; // Import the MovieDetail component
import axios from "axios";
import { getPopularMovies } from "./services/tmdbApi.js";

const theme = createTheme({
  palette: {
    background: {
      default: 'black',
    },
    primary: {
      main: "#2196f3",
    },

  },
});

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearch = async (searchTerm) => {
    setLoading(true);
    setError(null);

    const API_KEY = "ce07cbbca3b3f3e5f2b12dbc4aa85157"; // Replace with your actual API key
    const BASE_URL = "https://api.themoviedb.org/3";

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
  };
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await getPopularMovies(); // Fetch popular movies
        setMovies(data.results || []); // Set movies state
      } catch (error) {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []); // Empty dependency array means it runs once on mount


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <SearchAppBar
            handleDrawerToggle={handleDrawerToggle}
            onSearch={handleSearch} // Pass the onSearch function
          />
          <SidebarWithButton
            setMovies={setMovies}
            setLoading={setLoading}
            setError={setError}
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Routes>
              <Route path="/" element={<MovieGrid movies={movies} loading={loading} error={error} />} />
              <Route path="/movie/:id" element={<MovieDetail />} /> {/* Route for movie details */}
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
