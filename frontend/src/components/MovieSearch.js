// frontend/src/components/MovieSearch.js

import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Box,
  InputLabel,
  Typography,
} from "@mui/material";
import { searchMovies } from "../services/movieService";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const MovieSearch = () => {
  const [filters, setFilters] = useState({
    year: "",
    genre: "",
    personName: "",
    type: "All",
  });
  const [movieData, setMovieData] = useState([]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const movies = await searchMovies(filters);
      setMovieData(movies);
    } catch (error) {
      console.error("Error searching for movies:", error);
    }
  };

  const columnDefs = [
    { headerName: "Title", field: "primaryTitle", flex: 1 },
    { headerName: "Year Released", field: "startYear", flex: 1 },
    { headerName: "Type", field: "titleType", flex: 1 },
    { headerName: "Genre", field: "genres", flex: 1 },
    { headerName: "People Associated", field: "people_associated", flex: 1 },
  ];

  return (
    <Box sx={{ p: 4, backgroundColor: "#f0f0f0", borderRadius: "8px" }}>
      {/* Header */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}
      >
        Movie Search
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Year"
            name="year"
            value={filters.year}
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              style: { borderRadius: "8px" },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Genre"
            name="genre"
            value={filters.genre}
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              style: { borderRadius: "8px" },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Person Name"
            name="personName"
            value={filters.personName}
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              style: { borderRadius: "8px" },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Type</InputLabel>
            <Select
              label="Type"
              name="type"
              value={filters.type}
              onChange={handleChange}
              sx={{
                borderRadius: "8px",
                backgroundColor: "#fff",
                boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
              }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="movie">Movie</MenuItem>
              <MenuItem value="tvSeries">TV Series</MenuItem>
              <MenuItem value="documentary">Documentary</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Search Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        fullWidth
        sx={{
          borderRadius: "8px",
          padding: "12px",
          fontWeight: "bold",
          mb: 3,
          backgroundColor: "#3f51b5",
          "&:hover": {
            backgroundColor: "#2c387e",
          },
        }}
      >
        Search
      </Button>

      {/* AgGrid Table */}
      <Box className="ag-theme-alpine" sx={{ height: 400, width: "100%" }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={movieData}
          pagination={true}
          domLayout="autoHeight"
          style={{ borderRadius: "8px" }}
        />
      </Box>
    </Box>
  );
};

export default MovieSearch;
