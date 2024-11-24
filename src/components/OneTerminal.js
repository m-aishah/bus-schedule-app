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
  CircularProgress,
} from "@mui/material";
import TerminalHeading from "./TerminalHeading";
import BusList from "./BusList";
import WeatherHeading from "./WeatherHeading";
import WeatherForecast from "./WeatherForecast";
import Departure from "./OverlayDepature";
import Price from "./Price";
import TimeChip from "./TimeChip";

export default function OneTerminal({ busCompanies, id }) {
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedCity, setSelectedCity] = useState("");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

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

  // Function to display times
  const displayTimes = (times) => {
    const sortedTimes = times.sort((a, b) => (a < b ? -1 : 1));
    const midPoint = Math.ceil(sortedTimes.length / 2);
    const leftColumn = sortedTimes.slice(0, midPoint);
    const rightColumn = sortedTimes.slice(midPoint);

    return (
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        <Grid item xs={6}>
          {leftColumn.map((time, index) => (
            <TimeChip time={time} key={index} />
          ))}
        </Grid>

        <Grid item xs={6}>
          {rightColumn.map((time, index) => (
            <TimeChip time={time} key={index} />
          ))}
        </Grid>
      </Grid>
    );
  };

  return (
    <Box sx={{ maxWidth: 1000, padding: 3, mx: "auto", marginTop: 7 }}>
      <TerminalHeading terminalId={id} />

      {busCompanies.length > 0 ? (
        <BusList
          busCompanies={busCompanies}
          handleViewSchedules={handleViewSchedules}
        />
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", margin: 3 }}>
          <CircularProgress /> {/* Loading spinner */}
        </Box>
      )}
      {/* <WeatherHeading /> */}
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
              padding: 3,
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
                {displayTimes(
                  selectedDay === "Saturday" || selectedDay === "Sunday"
                    ? selectedBus.schedules.times.weekend
                    : selectedBus.schedules.times.weekdays
                )}

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
                color: "black",
                marginTop: 3,
                backgroundColor: "white",
                textTransform: "none",
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
