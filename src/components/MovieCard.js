import React from "react";
import { Card, CardContent, CardMedia, Typography, Rating, CardActionArea } from "@mui/material";
import { TMDB_IMAGE_BASE_URL } from "../config/tmdb"; // Ensure this path is correct
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function MovieCard({ id, title, releaseDate, posterPath, rating }) {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClick = () => {
    navigate(`/movie/${id}`); // Navigate to the movie details page
  };

  return (
    <Card sx={{ maxWidth: { xs: 150, sm: 200,md:150 },marginRight:{xs:20,md:1} }} onClick={handleClick}> {/* Responsive maxWidth */}
      <CardActionArea>
        <CardMedia
          component="img"
          height={{ xs: 180, sm: 250 }} // Responsive height for mobile and larger screens
          image={`${TMDB_IMAGE_BASE_URL}${posterPath}`}
          alt={title}
        />
        <CardContent sx={{ background: "black", color: "white" }}>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}> {/* Responsive font size */}
            {title}
          </Typography>
          <Typography variant="body2" color="white" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}> {/* Responsive font size */}
            Release Date: {releaseDate}
          </Typography>
          <Rating value={rating / 2} precision={0.5} readOnly />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;
