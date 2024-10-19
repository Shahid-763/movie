import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

import Button from '@mui/material/Button';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar({ handleDrawerToggle, onSearch }) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;
    onSearch(searchTerm); // Call the onSearch prop with the search term
    setSearchTerm(""); // Clear the input after search
  };

  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <AppBar position="fixed" sx={{ backgroundColor: 'red', height: { xs: 50, sm: 55 } }}>
        <Toolbar>
          {/* Mobile menu icon for small screens */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: 'none' } }}
            onClick={handleDrawerToggle}
          >
           
          </IconButton>

          {/* Logo */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              color: 'white',
              fontWeight: 700,
              fontSize: { xs: '18px', sm: '23px' }, // Adjust font size based on screen size
              paddingLeft: { xs: 0, sm: 70 }, 
              paddingRight:{xs:2}// Add padding on larger screens
            }}
          >
            NETFLIX
          </Typography>


          {/* Search bar */}
          <form
          onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Search sx={{ display: { xs: 'block', sm: 'block' } ,width:{xs:'110px'}}}> {/* Show search bar only on small screens and up */}
              <SearchIconWrapper>
                <span className="material-icons"></span>
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Search>
          </form>

          {/* Login button */}
         
        </Toolbar>
      </AppBar>
    </Box>
  );
}
