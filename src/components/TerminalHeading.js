import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function TerminalHeading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 1,
        width: "100%",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 2,
          borderRadius: "50px",
          backgroundColor: "#1976d2",
          color: "#fff",
        }}
      >
        <LocationOnIcon sx={{ fontSize: 25, marginRight: 1 }} />
        <Typography variant="h6" textAlign="center" sx={{ fontWeight: "bold" }}>
          Guzelyurt Terminal Location
        </Typography>
      </Paper>
    </Box>
  );
}
