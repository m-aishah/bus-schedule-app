"use client";

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
  Chip,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WeatherForecast from "./WeatherForecast";
import MapButton from "./MapButton";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import TerminalHeading from "./TerminalHeading";
import BusCompaniesHeading from "./BusCompaniesHeading";
import BusList from "./BusList";
import WeatherHeading from "./WeatherHeading";
// Dummy bus data with prices and schedules
const busCompanies = [
  {
    name: "Akva",
    destinations: ["Lefke", "Nicosia", "Girne"],
    phone: "+90 123 456 789",
    schedules: {
      Lefke: { times: ["9:00 AM", "12:00 PM", "3:00 PM"], price: "50 TL" },
      Nicosia: { times: ["10:00 AM", "1:00 PM", "4:00 PM"], price: "120 TL" },
      Girne: { times: ["11:00 AM", "2:00 PM", "5:00 PM"], price: "100 TL" },
    },
  },
  {
    name: "Cimen",
    destinations: ["Lefke", "Nicosia", "Girne"],
    phone: "+90 987 654 321",
    schedules: {
      Lefke: { times: ["8:00 AM", "11:00 AM", "2:00 PM"], price: "45 TL" },
      Nicosia: { times: ["9:00 AM", "12:00 PM", "3:00 PM"], price: "55 TL" },
      Girne: {
        times: [
          "10:00 AM",
          "1:00 PM",
          "4:00 PM",
          "10:00 AM",
          "1:00 PM",
          "4:00 PM",
          "10:00 AM",
          "1:00 PM",
          "4:00 PM",
          "10:00 AM",
          "1:00 PM",
          "4:00 PM",
        ],
        price: "65 TL",
      },
    },
  },
];

export default function OneTerminal() {
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedCity, setSelectedCity] = useState("");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleViewSchedules = (company) => {
    setSelectedBus(company);
    setIsOverlayOpen(true);
    setSelectedCity(company.destinations[0]); // default city selection
  };

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
  };

  return (
    <Box sx={{ maxWidth: 1000, padding: 3, mx: "auto" }}>
      {/* Map Section */}
      <TerminalHeading />
      <Box sx={{ marginBottom: 3, borderRadius: 30 }}>
        <MapButton />
      </Box>

      {/* Bus Companies List */}
      <BusCompaniesHeading />
      {/* <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        {busCompanies.map((company, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{company.name}</Typography>
                <Typography variant="body2">
                  Destinations: {company.destinations.join(", ")}
                </Typography>
                <Typography variant="body2">Phone: {company.phone}</Typography>
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
      </Grid> */}

      <BusList
        busCompanies={busCompanies}
        handleViewSchedules={handleViewSchedules}
      />

      {/* Weather Forecast */}
      <WeatherHeading />
      <Box sx={{ marginBottom: 3 }}>
        <WeatherForecast />
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
            <Typography variant="h5" gutterBottom>
              {selectedBus.name} - Departure Schedule
            </Typography>

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

            {/* City Selection */}
            <Box mb={2}>
              <Typography>Select City:</Typography>
              <Select
                value={selectedCity}
                onChange={handleCityChange}
                fullWidth
              >
                {selectedBus.destinations.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            {/* Bus Schedule and Price Display */}
            {selectedCity && (
              <Box>
                <Typography variant="h6">
                  Schedule for {selectedCity}
                </Typography>
                {/* Display Times in Grid */}
                <Grid container spacing={1} sx={{ marginBottom: 2 }}>
                  {selectedBus.schedules[selectedCity].times.map(
                    (time, index) => (
                      <Grid item xs={6} sm={4} key={index}>
                        <Chip
                          icon={<AccessTimeIcon />}
                          label={time}
                          clickable
                          color="primary"
                          sx={{
                            // padding: 1,
                            width: "100%",
                            justifyContent: "center",
                            backgroundColor: "#1976d2",
                            color: "#fff",
                          }}
                        />
                      </Grid>
                    ),
                  )}
                </Grid>
                {/* Display Price with Icon */}
                <Typography
                  variant="body1"
                  sx={{ color: "red", display: "flex", alignItems: "center" }}
                >
                  <CurrencyLiraIcon sx={{ marginRight: 1 }} />
                  Price: {selectedBus.schedules[selectedCity].price}
                </Typography>
              </Box>
            )}

            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseOverlay}
              sx={{ marginTop: 2 }}
              fullWidth
            >
              Close
            </Button>
          </Paper>
        </Box>
      )}
    </Box>
  );
}
