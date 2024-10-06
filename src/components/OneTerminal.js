"use client";

import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // assuming you have Firebase setup
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
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import TerminalHeading from "./TerminalHeading";
import BusCompaniesHeading from "./BusCompaniesHeading";
import BusList from "./BusList";
import WeatherHeading from "./WeatherHeading";
import WeatherForecast from "./WeatherForecast";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore"; // updated import

export default function OneTerminal({ id }) {
  const [busCompanies, setBusCompanies] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedCity, setSelectedCity] = useState("");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  // Fetching data from Firebase
  useEffect(() => {
    console.log("Id:", id);
    if (id) {
      const fetchLocationData = async () => {
        // Fetch the terminal's location data by ID from the Locations Collection
        const locationRef = doc(db, "locations", id);
        const locationDoc = await getDoc(locationRef);

        if (locationDoc.exists()) {
          const locationData = locationDoc.data();
          console.log("Location Data:", locationData);

          // Create an array to hold all the bus service data
          const busServicesData = [];

          // Use for...of to handle async operations within map
          for (const serviceName of locationData.services) {
            console.log("Fetching bus service for:", serviceName);
            const busServiceQuery = query(
              collection(db, "bus_services"),
              where("name", "==", serviceName),
              where("terminal", "==", locationData.name),
            );

            const busServiceDocs = await getDocs(busServiceQuery);

            for (const busServiceDoc of busServiceDocs.docs) {
              const busServiceData = busServiceDoc.data();
              console.log("Bus Service Data:", busServiceData.name);

              // Fetch schedule data from the Schedules Collection
              const scheduleQuery = query(
                collection(db, "schedules"),
                where("bus_service", "==", busServiceData.name),
              );

              const scheduleDocs = await getDocs(scheduleQuery);

              for (const scheduleDoc of scheduleDocs.docs) {
                const scheduleData = scheduleDoc.data();
                console.log("Schedule data", scheduleData);

                // Fetch route info from Routes Collection
                const routeRef = doc(db, "routes", scheduleData.route);
                const routeDoc = await getDoc(routeRef);
                const routeData = routeDoc.exists ? routeDoc.data() : {};
                console.log("Route data", routeData);

                busServicesData.push({
                  name: busServiceData.name,
                  phone: busServiceData.phone_number,
                  schedules: {
                    from: routeData.from,
                    to: routeData.to,
                    price: scheduleData.main_route.price,
                    times: {
                      weekdays: scheduleData.main_route.weekdays,
                      weekend: scheduleData.main_route.weekend,
                    },
                  },
                });
              }
            }
          }

          // Set bus services after all data has been fetched
          console.log("All bus services:", busServicesData);
          setBusCompanies(busServicesData);
        }
      };

      fetchLocationData();
    }
  }, [id]);

  const handleViewSchedules = (company) => {
    setSelectedBus(company);
    setIsOverlayOpen(true);
    setSelectedCity(company.schedules.from); // default city selection to 'from'
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
      {/* Terminal Name Heading */}
      <TerminalHeading />

      {/* Bus Companies List */}
      <BusCompaniesHeading />
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

            {/* Bus Schedule and Price Display */}
            {selectedCity && (
              <Box>
                {/* <Typography variant="h6">
                  Schedule for {selectedCity}
                </Typography> */}
                {/* Display Times */}
                <Grid container spacing={1} sx={{ marginBottom: 2 }}>
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
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>

                {/* Display Price with Icon */}
                <Typography
                  variant="body1"
                  sx={{ color: "red", display: "flex", alignItems: "center" }}
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
