import React, { useState } from "react";
import { TextField, Button, Grid, Box, Typography } from "@mui/material";
import { searchPersons } from "../services/movieService";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const PersonSearch = () => {
  const [filters, setFilters] = useState({
    movieTitle: "",
    name: "",
    profession: "",
  });
  const [personData, setPersonData] = useState([]);

  // Handle changes in input fields
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Perform search and update personData state
  const handleSearch = async () => {
    try {
      const persons = await searchPersons(filters);
      setPersonData(persons);
    } catch (error) {
      console.error("Error searching for persons:", error);
    }
  };

  // Column definitions for the AgGrid table
  const columnDefs = [
    { headerName: "Name", field: "primaryName" },
    { headerName: "Birth Year", field: "birthYear" },
    { headerName: "Profession", field: "primaryProfession" },
    { headerName: "Known For Titles", field: "knownForTitles" },
  ];

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#f4f4f4",
        borderRadius: "8px",
      }}
    >
      {/* Title */}
      <Typography variant="h5" gutterBottom>
        Person Search
      </Typography>

      {/* Filter Inputs */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Movie Title"
            name="movieTitle"
            value={filters.movieTitle || ""}
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              style: { borderRadius: 8 },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={filters.name || ""}
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              style: { borderRadius: 8 },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Profession"
            name="profession"
            value={filters.profession || ""}
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              style: { borderRadius: 8 },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            fullWidth
            sx={{
              borderRadius: "8px",
              padding: "12px",
              fontWeight: "bold",
              backgroundColor: "#3f51b5",
              "&:hover": {
                backgroundColor: "#2c387e",
              },
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      {/* AgGrid Table */}
      <div
        className="ag-theme-alpine"
        style={{ height: 400, width: "100%", marginTop: "20px" }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={personData}
          pagination={true}
          style={{ borderRadius: "8px" }}
        />
      </div>
    </Box>
  );
};

export default PersonSearch;
