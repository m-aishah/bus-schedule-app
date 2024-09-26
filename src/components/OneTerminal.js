"use client"; // Necessary for Next.js and Material UI

import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import Image from "next/image";
import WeatherForecast from "./WeatherForecast";
import MapButton from "./MapButton";
// Dummy bus companies data
const busCompanies = [
  {
    name: "Akva",
    destinations: ["Lefke", "Nicosia", "Girne"],
    phone: "+90 123 456 789",
  },
  {
    name: "Cimen",
    destinations: ["Lefke", "Nicosia", "Girne"],
    phone: "+90 987 654 321",
  },
];

// Main Component
export default function OneTerminal() {
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  // Dummy image (replace with actual image URL)
  const terminalImage = "/images/terminal1.jpg";

  // Handle viewing bus schedules
  const handleViewSchedules = (company) => {
    setSelectedBus(company);
    setIsOverlayOpen(true);
  };

  // Handle day change in the overlay
  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  // Close the overlay
  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Image Section */}
      <Box
        sx={{
          width: "100%",
          height: "200px",
          marginBottom: 3,
          position: "relative",
        }}
      >
        <Image
          src={terminalImage}
          alt="Terminal"
          layout="fill" // Fills the container
          objectFit="cover" // Ensures the image covers the container with proper aspect ratio
          priority // Ensures the image loads faster (especially useful for above-the-fold content)
        />
      </Box>

      {/* Bus Companies List */}
      <Grid container spacing={2}>
        {busCompanies.map((company, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5">{company.name}</Typography>
                <Typography variant="body1">
                  Destinations: {company.destinations.join(", ")}
                </Typography>
                <Typography variant="body1">Phone: {company.phone}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleViewSchedules(company)}
                  sx={{ marginTop: 2 }}
                >
                  View Bus Schedules
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Bus Schedule Overlay */}
      {isOverlayOpen && selectedBus && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h5">
              {selectedBus.name} - Departure Schedule
            </Typography>
            <Box mb={2}>
              <Typography>Select Day:</Typography>
              <Select value={selectedDay} onChange={handleDayChange} fullWidth>
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box>
              {/* You can add real bus schedule data here */}
              <Typography variant="body1">
                Bus schedules for {selectedDay} will be displayed here.
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseOverlay}
              sx={{ marginTop: 2 }}
            >
              Close
            </Button>
          </Paper>
        </Box>
      )}
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        <Grid item xs={12}>
          <WeatherForecast /> {/* Your weather component */}
        </Grid>
        <Grid item xs={12}>
          <MapButton /> {/* Your location/map button component */}
        </Grid>
      </Grid>
    </Box>
  );
}
