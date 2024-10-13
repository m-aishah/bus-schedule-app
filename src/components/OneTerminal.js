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
  CircularProgress, // Import CircularProgress for loading indicator
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import TerminalHeading from "./TerminalHeading";
import BusCompaniesHeading from "./BusCompaniesHeading";
import BusList from "./BusList";
import WeatherHeading from "./WeatherHeading";
import WeatherForecast from "./WeatherForecast";
import Departure from "./OverlayDepature";

export default function OneTerminal({ terminalHeadingName, busCompanies, id }) {
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedCity, setSelectedCity] = useState("");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate loading time (e.g., fetching data)
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 3 seconds
    }, 3500);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const handleViewSchedules = (company) => {
    setSelectedBus(company);
    setIsOverlayOpen(true);
    setSelectedCity(company.schedules.from); // default city selection to 'from'
  };

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
  };

  return (
    <Box sx={{ maxWidth: 1000, padding: 3, mx: "auto" }}>
      {/* Terminal Name Heading */}
      <TerminalHeading terminalId={id} />

      {/* Bus Companies List */}
      <BusCompaniesHeading />

      {loading ? ( // Check loading state
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
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Paper sx={{ padding: 2, width: "100%", maxWidth: 400 }}>
            <Departure destination={selectedBus.schedules.to} />

            {/* Day Selection */}
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

            {/* Bus Schedule and Price Display */}
            {selectedCity && (
              <Box>
                {/* Display Times */}
                <Grid container spacing={1} sx={{ marginBottom: 3 }}>
                  {(selectedDay === "Saturday" || selectedDay === "Sunday"
                    ? selectedBus.schedules.times.weekend
                    : selectedBus.schedules.times.weekdays
                  ).map((time, index) => (
                    <Grid item xs={6} sm={4} key={index}>
                      <Chip
                        icon={<AccessTimeIcon />}
                        label={time}
                        clickable
                        color="primary"
                        sx={{
                          width: "100%",
                          justifyContent: "center",
                          backgroundColor: "#1976d2",
                          color: "#fff",
                          transition: "background-color 0.2s ease",
                          "&:hover": {
                            backgroundColor: "#1565c0", // Darker on hover
                          },
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>

                {/* Display Price with Icon */}
                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#ff5722",
                  }}
                >
                  <CurrencyLiraIcon sx={{ marginRight: 1 }} />
                  Price: {selectedBus.schedules.price}
                </Typography>
              </Box>
            )}

            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseOverlay}
              fullWidth
              sx={{
                marginTop: 2,
                backgroundColor: "#ff5722",
                "&:hover": {
                  backgroundColor: "#e64a19", // Darker hover effect
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
