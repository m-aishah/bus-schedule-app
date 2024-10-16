"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Select,
  MenuItem,
  Chip,
  Typography,
  Button,
  CircularProgress, // Loading indicator
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import TerminalHeading from "./TerminalHeading";
import BusCompaniesHeading from "./BusCompaniesHeading";
import BusList from "./BusList";
import WeatherHeading from "./WeatherHeading";
import WeatherForecast from "./WeatherForecast";
import Departure from "./OverlayDepature";
import Price from "./Price";

export default function OneTerminal({ terminalHeadingName, busCompanies, id }) {
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedCity, setSelectedCity] = useState("");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  // Simulate loading time to show the loading indicator
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500); // 3.5 seconds delay

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  // Handler to view bus schedules
  const handleViewSchedules = (company) => {
    setSelectedBus(company);
    setIsOverlayOpen(true);
    setSelectedCity(company.schedules.from); // default city selection to 'from'
  };

  // Handler for day change
  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  // Close overlay handler
  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
  };

  return (
    <Box sx={{ maxWidth: 1000, padding: 3, mx: "auto" }}>
      {/* Terminal Name Heading */}
      <TerminalHeading terminalId={id} />

      {/* Bus Companies Heading */}
      <BusCompaniesHeading />

      {/* Loading State */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", margin: 3 }}>
          <CircularProgress /> {/* Loading spinner */}
        </Box>
      ) : (
        <BusList
          busCompanies={busCompanies}
          handleViewSchedules={handleViewSchedules}
        />
      )}

      {/* Weather Forecast */}
      <WeatherHeading />
      <Box sx={{ marginBottom: 3 }}>
        <WeatherForecast terminalId={id} />
      </Box>

      {/* Bus Schedule Overlay */}
      {isOverlayOpen && selectedBus && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Slightly darker overlay
            zIndex: 1200, // Elevate above other content
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backdropFilter: "blur(5px)", // Adds a blur effect for elegance
            padding: 2,
            transition: "all 0.3s ease-in-out", // Smooth transition for the overlay
          }}
        >
          <Paper
            elevation={6}
            sx={{
              padding: 4,
              maxWidth: 500,
              borderRadius: "16px", // Soft rounded edges
              animation: "fadeIn 0.5s ease-in-out", // Smooth appearance animation
            }}
          >
            {/* Departure Heading */}
            <Departure destination={selectedBus.schedules.to} />

            {/* Day Selection */}
            <Box mb={3}>
              <Typography>Select Day:</Typography>
              <Select
                value={selectedDay}
                onChange={handleDayChange}
                fullWidth
                sx={{ marginBottom: 2 }}
              >
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

            {/* Schedule and Price */}
            {selectedCity && (
              <Box>
                {/* Display Times */}
                <Grid container spacing={2} sx={{ marginBottom: 3 }}>
                  {(selectedDay === "Saturday" || selectedDay === "Sunday"
                    ? selectedBus.schedules.times.weekend
                    : selectedBus.schedules.times.weekdays
                  ).map((time, index) => (
                    <Grid item xs={6} key={index}>
                      <Chip
                        // icon={<AccessTimeIcon />}
                        label={time}
                        clickable
                        sx={{
                          width: "100%",
                          justifyContent: "center",
                          backgroundColor: "#1976d2", // Modern blue
                          color: "#fff",
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                          "&:hover": {
                            backgroundColor: "#1565c0", // Darker blue hover effect
                          },
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>

                {/* Display Price */}
                <Price price={selectedBus.schedules.price} />
              </Box>
            )}

            {/* Close Button */}
            <Button
              variant="contained"
              color="error"
              onClick={handleCloseOverlay}
              fullWidth
              sx={{
                marginTop: 3,
                backgroundColor: "#ff5252",
                "&:hover": {
                  backgroundColor: "#e64a19",
                },
              }}
            >
              Close
            </Button>
          </Paper>
        </Box>
      )}
    </Box>
  );
}
