import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Container,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonSearch from "../components/PersonSearch";
import MovieSearch from "../components/MovieSearch";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Dashboard = () => {
  const [selectedView, setSelectedView] = useState("movies");
  const navigate = useNavigate();

  const handleSelectView = (view) => {
    setSelectedView(view);
  };

  return (
    <Box
      sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f5f7" }}
    >
      <CssBaseline />

      {/* Sidebar Drawer */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#2f3a54",
            color: "#fff",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography
          variant="h6"
          align="center"
          sx={{ my: 2, fontWeight: "bold" }}
        >
          Dashboard
        </Typography>
        <List>
          <ListItem
            button
            selected={selectedView === "movies"}
            onClick={() => handleSelectView("movies")}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#394263",
              },
              "&:hover": {
                backgroundColor: "#394263",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <MovieIcon />
            </ListItemIcon>
            <ListItemText primary="Movie Search" />
          </ListItem>
          <ListItem
            button
            selected={selectedView === "persons"}
            onClick={() => handleSelectView("persons")}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#394263",
              },
              "&:hover": {
                backgroundColor: "#394263",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Person Search" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f4f5f7",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header Bar */}
        <AppBar
          position="static"
          elevation={1}
          sx={{
            bgcolor: "#fff",
            color: "#2f3a54",
            borderBottom: "1px solid #ddd",
          }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
              {selectedView === "movies" ? "Movie Search" : "Person Search"}
            </Typography>
            <IconButton
              color="inherit"
              onClick={() => {
                localStorage.removeItem("authToken");
                navigate("/");
              }}
            >
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 3,
              bgcolor: "#fff",
            }}
          >
            {selectedView === "movies" && (
              <>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Movie Search
                </Typography>
                <MovieSearch />
              </>
            )}
            {selectedView === "persons" && (
              <>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Person Search
                </Typography>
                <PersonSearch />
              </>
            )}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
