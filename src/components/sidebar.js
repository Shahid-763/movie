import React from 'react';
import { Drawer, List, ListItem, Button } from '@mui/material';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getMoviesByGenre,
  genreIds,
} from '../services/tmdbApi'; // Import API functions

const SidebarWithButton = ({ setMovies, setLoading, setError }) => {

  const fetchMovies = async (category) => {
    setLoading(true);
    setError(null); // Reset any previous errors
    try {
      let data;
      switch (category) {
        case 'popular':
          data = await getPopularMovies();
          break;
        case 'top_rated':
          data = await getTopRatedMovies();
          break;
        case 'upcoming':
          data = await getUpcomingMovies();
          break;
        case 'action':
          data = await getMoviesByGenre(genreIds.action);
          break;
        case 'adventure':
          data = await getMoviesByGenre(genreIds.adventure);
          break;
        case 'comedy':
          data = await getMoviesByGenre(genreIds.comedy);
          break;
        case 'animation':
          data = await getMoviesByGenre(genreIds.animation);
          break;
        default:
          data = await getPopularMovies(); // Default to popular movies
      }
      setMovies(data.results); // Update the movies state with the fetched results
    } catch (err) {
      setError(err.message); // Set error if any issue occurs
    } finally {
      setLoading(false); // Stop the loading state
    }
  };

  return (
    <>
      {/* Permanent Drawer for all screens */}
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': {
            width: {sm:200,xs:150},
            backgroundColor: 'black',
            color: 'white',
            marginTop: 8,
          },
        }}
      >
        <List>
          <ListItem>
            <Button
              variant="contained"
              sx={{
                background: 'red',
                color: 'white',
                fontSize: { xs: '10px', sm: '12px' }, // Smaller font size on mobile
                padding: { xs: '4px 5px', sm: '5px 10px' }, // Smaller padding on mobile
                width: '70%',
                '&:hover': {
                  background: 'darkred', // Darker red on hover
                },
              }}
            >
              Categories
            </Button>
          </ListItem>

          {/* Popular Movies */}
          <ListItem>
            <i className="fas fa-clapperboard" style={{ fontSize: '15px', color: 'red' }}></i>
            <Button
              sx={{
                color: 'white',
                fontSize: { xs: '10px', sm: '14px' }, // Smaller font size on mobile
              }}
              onClick={() => fetchMovies('popular')}
            >
              Popular
            </Button>
          </ListItem>

          {/* Top Rated Movies */}
          <ListItem>
            <i className="fa-solid fa-star" style={{ fontSize: '15px', color: 'red' }}></i>
            <Button
              sx={{
                color: 'white',
                fontSize: { xs: '10px', sm: '14px' }, // Smaller font size on mobile
              }}
              onClick={() => fetchMovies('top_rated')}
            >
              Top Rated
            </Button>
          </ListItem>

          {/* Upcoming Movies */}
          <ListItem>
            <i className="fas fa-sun" style={{ fontSize: '16px', color: 'red' }}></i>
            <Button
              sx={{
                color: 'white',
                fontSize: { xs: '10px', sm: '14px' }, // Smaller font size on mobile
              }}
              onClick={() => fetchMovies('upcoming')}
            >
              Upcoming
            </Button>
          </ListItem>

          {/* Action Movies */}
          <ListItem>
            <i className="fas fa-film" style={{ fontSize: '15px', color: 'red' }}></i>
            <Button
              sx={{
                color: 'white',
                fontSize: { xs: '10px', sm: '14px' }, // Smaller font size on mobile
              }}
              onClick={() => fetchMovies('action')}
            >
              Action
            </Button>
          </ListItem>

          {/* Adventure Movies */}
          <ListItem>
            <i className="fas fa-film" style={{ fontSize: '15px', color: 'red' }}></i>
            <Button
              sx={{
                color: 'white',
                fontSize: { xs: '10px', sm: '14px' }, // Smaller font size on mobile
              }}
              onClick={() => fetchMovies('adventure')}
            >
              Adventure
            </Button>
          </ListItem>

          {/* Animation Movies */}
          <ListItem>
            <i className="fas fa-bug" style={{ fontSize: '15px', color: 'red' }}></i>
            <Button
              sx={{
                color: 'white',
                fontSize: { xs: '10px', sm: '14px' }, // Smaller font size on mobile
              }}
              onClick={() => fetchMovies('animation')}
            >
              Animation
            </Button>
          </ListItem>

          {/* Comedy Movies */}
          <ListItem>
            <i className="fas fa-laugh" style={{ fontSize: '15px', color: 'red' }}></i>
            <Button
              sx={{
                color: 'white',
                fontSize: { xs: '10px', sm: '14px' }, // Smaller font size on mobile
              }}
              onClick={() => fetchMovies('comedy')}
            >
              Comedy
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default SidebarWithButton;
