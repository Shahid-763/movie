// import React from "react";
// import { Grid, CircularProgress, Typography } from "@mui/material";
// import MovieCard from "./MovieCard";

// function MovieGrid({ movies, loading, error }) {
//   if (loading) {
//     return <CircularProgress />;
//   }

//   if (error) {
//     return <Typography color="error">Error: {error}</Typography>;
//   }

//   return (
//     <Grid container spacing={3} justifyContent="center" sx={{ width: '100%', ml: 20 }}>
//       {movies.map((movie) => (
//         <Grid item key={movie.id} xs={12} sm={8} md={6} lg={3}>
//           <MovieCard
//             id={movie.id} // Pass the id prop here
//             title={movie.title}
//             releaseDate={movie.release_date}
//             posterPath={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "path_to_fallback_image.jpg"}
//             rating={movie.vote_average}
//           />
//         </Grid>
//       ))}
//     </Grid>
//   );
// }

// export default MovieGrid;
import React from "react";
import { Grid, CircularProgress, Typography, Box } from "@mui/material";
import MovieCard from "./MovieCard";

function MovieGrid({ movies, loading, error }) {
  // If loading, show a centered loading indicator
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // If there's an error, display the error message
  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  // If no movies are found, display a message
  if (movies.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="textSecondary">No movies found.</Typography>
      </Box>
    );
  }

  // Render the grid of movies
  return (
    <Grid container spacing={3} justifyContent="center" sx={{ width: '100%', ml: 20,overflow:'hidden'}}>
      {movies.map((movie) => (
        <Grid item key={movie.id} xs={12} sm={8} md={3} lg={3}>
          <MovieCard
            id={movie.id} // Pass the id prop here
            title={movie.title}
            releaseDate={movie.release_date}
            // Use a default placeholder image if poster_path is missing
            posterPath={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "path_to_fallback_image.jpg"}
            rating={movie.vote_average}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default MovieGrid;
