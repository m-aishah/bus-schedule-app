import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BusAlertIcon from "@mui/icons-material/BusAlert";

export default function BusList({ busCompanies, handleViewSchedules }) {
  console.log("Inside the bus list", busCompanies);
  return (
    <Grid container spacing={2} sx={{ marginBottom: 3 }}>
      {busCompanies.map((company, index) => (
        <Grid item xs={12} md={6} key={index}>
          {/* Entire card clickable */}
          <Card
            onClick={() => handleViewSchedules(company)}
            sx={{
              cursor: "pointer",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent>
              {/* Company Name */}
              <Typography
                variant="h5" // Changed to h5 for a more prominent look
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold", // Bolder font weight
                  color: "#1976d2", // Company name color
                  textShadow: "0.5px 0.5px 2px rgba(0,0,0,0.2)", // Subtle text shadow
                }}
              >
                <BusAlertIcon sx={{ marginRight: 1 }} />{" "}
                {/* Icon for the company */}
                {company.name}
              </Typography>

              {/* Destinations with Icon */}
              <Box sx={{ display: "flex", alignItems: "center", marginY: 1 }}>
                <PlaceIcon sx={{ marginRight: 1, color: "#1976d2" }} />
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Destinations:{" "}
                </Typography>
                <Typography variant="body2" sx={{ marginLeft: 0.5 }}>
                  {/* Display the 'from' and 'to' from the schedule's main route */}
                  {`${company.schedules.from} - ${company.schedules.to}`}
                </Typography>
              </Box>

              {/* Phone with Icon */}
              <Box sx={{ display: "flex", alignItems: "center", marginY: 1 }}>
                <PhoneIcon sx={{ marginRight: 1, color: "#1976d2" }} />
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Phone:{" "}
                </Typography>
                <Typography variant="body2" sx={{ marginLeft: 0.5 }}>
                  {company.phone}
                </Typography>
              </Box>

              {/* View Schedules Button */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={(e) => {
                  e.stopPropagation(); // prevent card click
                  handleViewSchedules(company);
                }}
                sx={{ marginTop: 2 }}
              >
                View Bus Schedules
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
