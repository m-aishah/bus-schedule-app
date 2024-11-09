"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  ThemeProvider,
  createTheme,
  Typography,
  Box,
  Stack,
  CircularProgress,
  Container,
  Paper,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { SwapVert, Schedule, LocationOn } from "@mui/icons-material";
import BusCard from "@/components/BusCard";
import BusModal from "@/components/BusModal";
import fetchSchedules from "@/actions/databaseActions";
import SelectWrapper from "@/components/SelectWrapper";
import CardSlider from "@/components/CardSlider";

const locationCoordinates = {
  Lefke: { lat: 35.1175, lon: 32.8464 },
  Guzelyurt: { lat: 35.2021, lon: 33.0183 },
  Girne: { lat: 35.3364, lon: 33.3182 },
  Nicosia: { lat: 35.1856, lon: 33.3823 },
  Yedidalga: { lat: 35.1754, lon: 32.8129 },
};

const allowedRoutes = {
  Lefke: ["Guzelyurt", "Yedidalga"],
  Guzelyurt: ["Lefke", "Nicosia", "Girne"],
  Nicosia: ["Guzelyurt", "Girne"],
  Girne: ["Guzelyurt", "Nicosia"],
  Yedidalga: ["Lefke"],
};

const locations = Object.keys(locationCoordinates);

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

const busServiceColors = {
  AKVA: "#1E88E5", // Blue
  CIMEN: "#43A047", // Green
  EUL_BUS: "#FFA000", // Amber
};

export default function SchedulePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const busServices = ["AKVA", "CIMEN", "EUL_BUS"];
  const times = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "00:00",
  ];

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState(locations[0]);
  const [departureTime, setDepartureTime] = useState("");
  const [schedules, setSchedules] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [dayCategory, setDayCategory] = useState("weekdays");

  const findClosestLocation = (lat, lon) => {
    let closestLocation = locations[0];
    let minDistance = Infinity;

    for (const location of locations) {
      const { lat: locLat, lon: locLon } = locationCoordinates[location];
      const distance = calculateDistance(lat, lon, locLat, locLon);
      if (distance < minDistance) {
        minDistance = distance;
        closestLocation = location;
      }
    }

    return closestLocation;
  };

  useEffect(() => {
    const today = new Date().getDay();
    setDayCategory(today === 0 || today === 6 ? "weekend" : "weekdays");

    const currentTime = new Date();
    const nextHour = new Date(
      currentTime.setHours(currentTime.getHours() + 1, 0, 0, 0)
    );
    const formattedTime = nextHour.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    setDepartureTime(formattedTime);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const closestLocation = findClosestLocation(
            position.coords.latitude,
            position.coords.longitude
          );
          setSource(closestLocation);
          setDestination(allowedRoutes[closestLocation][0]);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setSource(locations[0]);
          setDestination(allowedRoutes[locations[0]][0]);
        }
      );
    } else {
      setSource(locations[0]);
      setDestination(allowedRoutes[locations[0]][0]);
    }
  }, []);

  const filterTimes = useCallback((times, departureTime) => {
    return times.filter((time) => time >= departureTime);
  }, []);

  const setUpScheduleDataByService = useCallback(
    (schedules, busService) => {
      const schedule = schedules[busService.toLowerCase()];
      if (schedule && schedule.length > 0) {
        const allTimes = schedule[0].main_route[dayCategory] || [];
        const filteredTimes = filterTimes(allTimes, departureTime);
        return {
          price: schedule[0].main_route.price,
          times: filteredTimes,
          busStops: schedule[0].bus_stops || [],
        };
      }
      return { price: "N/A", times: [], busStops: [] };
    },
    [dayCategory, departureTime, filterTimes]
  );

  const loadSchedules = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedSchedules = await fetchSchedules(
        dayCategory,
        departureTime,
        source.toLowerCase(),
        destination.toLowerCase()
      );
      setSchedules(fetchedSchedules);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    } finally {
      setLoading(false);
    }
  }, [dayCategory, departureTime, source, destination]);

  useEffect(() => {
    loadSchedules();
  }, [loadSchedules]);

  const handleSourceChange = (event) => {
    const newSource = event.target.value;
    setSource(newSource);
    setDestination(allowedRoutes[newSource][0]);
  };

  const handleDestinationChange = (event) => setDestination(event.target.value);
  const handleDepartureTimeChange = (event) =>
    setDepartureTime(event.target.value);
  // const handleArrivalTimeChange = (event) => setArrivalTime(event.target.value);

  const handleCardClick = (busService, time) => {
    const scheduleData = setUpScheduleDataByService(schedules, busService);
    setSelectedSchedule({
      ...scheduleData,
      service: busService,
      selectedTime: time,
      source,
      destination,
      busStops: scheduleData.busStops || [],
    });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSchedule(null);
  };

  const renderBusCards = (busService) => {
    const scheduleData = setUpScheduleDataByService(schedules, busService);
    return scheduleData.times.map((time, index) => (
      <Box
        key={`${busService}-${index}`}
        sx={{
          padding: 1,
        }}
      >
        <BusCard
          service={busService}
          time={time}
          location={source}
          price={`${scheduleData.price}TL`}
          onClick={() => handleCardClick(busService, time)}
          color={busServiceColors[busService]}
        />
      </Box>
    ));
  };

  const swapLocations = () => {
    if (allowedRoutes[destination].includes(source)) {
      setSource(destination);
      setDestination(source);
    } else {
      setSource(destination);
      setDestination(allowedRoutes[destination][0]);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4, mt: 8 }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 4 },
            borderRadius: 4,
            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Stack spacing={4}>
            {/* Header Section */}
            <Box sx={{ textAlign: { xs: "center", sm: "center" } }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background: "linear-gradient(270deg, #FF4081, #1976D2)",
                  backgroundSize: "400% 400%", // Allow room for animation
                  animation: "gradientShift 8s ease infinite", // CSS animation
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  mb: 1,
                }}
              >
                Find Your Next Bus
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Plan your journey across Northern Cyprus
              </Typography>
            </Box>

            {/* Search Controls */}
            <Stack
              direction="column"
              spacing={3}
              sx={{
                padding: 2,
                width: "100%",
                margin: "0 auto",
              }}
            >
              {/* From & To Section */}
              <Stack direction="row" spacing={2} alignItems="center">
                <SelectWrapper
                  label="From"
                  value={source}
                  onChange={handleSourceChange}
                  options={locations}
                  icon={<LocationOn fontSize="small" color="primary" />}
                  helperText="Select your starting location"
                />

                <IconButton
                  onClick={swapLocations}
                  sx={{
                    bgcolor: "background.paper",
                    "&:hover": { bgcolor: "action.hover" },
                    border: "1px solid", // Adding a border for better contrast
                    borderColor: "divider", // Use theme color
                  }}
                  aria-label="Swap locations"
                >
                  <SwapVert fontSize="small" />
                </IconButton>

                <SelectWrapper
                  label="To"
                  value={destination}
                  onChange={handleDestinationChange}
                  options={allowedRoutes[source] || []}
                  icon={<LocationOn fontSize="small" color="secondary" />}
                  helperText="Select your destination"
                />
              </Stack>

              {/* Departure Time Section */}
              <Stack direction="row" spacing={2} alignItems="center">
                <SelectWrapper
                  label="Departure"
                  value={departureTime}
                  onChange={handleDepartureTimeChange}
                  options={times}
                  icon={<Schedule fontSize="small" color="primary" />}
                  helperText="Select your departure time"
                />
              </Stack>
            </Stack>

            {/* Results Section */}
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress size={40} thickness={4} />
              </Box>
            ) : (
              <Stack spacing={4}>
                {busServices.map((service) => (
                  <Paper
                    key={service}
                    elevation={1}
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      background: theme.palette.background.default,
                      borderLeft: `6px solid ${busServiceColors[service]}`,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 3,
                        fontWeight: 600,
                        color: busServiceColors[service],
                      }}
                    >
                      {service}
                    </Typography>
                    <CardSlider
                      cards={renderBusCards(service)}
                      isMobile={isMobile}
                    />
                  </Paper>
                ))}
              </Stack>
            )}
          </Stack>
        </Paper>

        <BusModal
          open={modalOpen}
          onClose={handleCloseModal}
          scheduleData={selectedSchedule}
        />
      </Container>
    </ThemeProvider>
  );
}
