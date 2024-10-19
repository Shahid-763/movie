import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieTrailers } from '../services/tmdbApi'; // Ensure this path is correct
import { CircularProgress, Typography, Box } from '@mui/material';
import './MovieDetail.css'; // Import the CSS file
const MovieDetail = () => {
  const { id } = useParams(); // Get movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        console.log("Movie Details:", data); // Log movie details
        setMovie(data);

        const trailerData = await getMovieTrailers(id);
        console.log("Trailer Data:", trailerData); // Log trailer data
        setTrailers(trailerData);
      } catch (err) {
        console.error("Error fetching movie details:", err); // Log errors
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails(); // Call the function to fetch movie details
  }, [id]); // Run this effect when `id` changes

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
        <div className='movie-detail-container'>
      {movie && (
        <>
        <div className='movie-title'>
          <Typography variant="h4" fontWeight={900}  color={'red'} align={'center'} paddingBottom={2}  sx={{
    paddingLeft: { xs: '140px', sm: '0' }, // 60px left padding on mobile, 0 on small screens and up
  }} >{movie.title}</Typography>
         
          <Typography variant="body1" color={'white'} fontSize={14} align='center' paddingLeft={20}>Overview: {movie.overview}</Typography>
          </div>

          {/* Display the trailer */}
          {trailers.length > 0 && (
            <Box mt={2}>
                <div className='trailer-container'>
              <Typography variant="h5">Trailer:</Typography>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${trailers[0].key}`} // Use the first trailer
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              </div>

            </Box>
          )}
        </>
      )}
      </div>
    </Box>
  );
};

export default MovieDetail;
