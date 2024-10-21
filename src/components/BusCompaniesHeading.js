import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

export default function BusCompaniesHeading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginBottom: 3,
        height: 50,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
          borderRadius: "30px",
          backgroundColor: "#f57c00",
          color: "#fff",

          width: "100%",
        }}
      >
        {/* Left Icon */}
        <DirectionsBusIcon sx={{ fontSize: 30, marginRight: 1 }} />

        {/* Typography for Heading */}
        <Typography
          variant="h5"
          textAlign="center"
          sx={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            padding: "0 30px",
          }}
        >
          Bus Companies
        </Typography>

        {/* Right Icon */}
        <DirectionsBusIcon sx={{ fontSize: 30, marginLeft: 1 }} />
      </Paper>
    </Box>
  );
}
