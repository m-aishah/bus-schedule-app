"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  ThemeProvider,
  Tabs,
  Tab,
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
  ];

  const [activeTab, setActiveTab] = useState("all");
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

    setSource(locations[0]);
    setDestination(allowedRoutes[locations[0]][0]);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && "geolocation" in navigator) {
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
        }
      );
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
          elevation={0}
          sx={{
            p: { xs: 2, sm: 4 },
            borderRadius: 2,
            bgcolor: "background.paper",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
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
            {/* Search Controls - More compact and modern */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: "grey.50",
              }}
            >
              <Stack spacing={3}>
                {/* From & To Section */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  alignItems="center"
                >
                  <SelectWrapper
                    label="From"
                    value={source}
                    onChange={handleSourceChange}
                    options={locations}
                    icon={<LocationOn fontSize="small" color="primary" />}
                    fullWidth
                  />

                  <IconButton
                    onClick={swapLocations}
                    sx={{
                      p: 1,
                      bgcolor: "background.paper",
                      boxShadow: 1,
                      "&:hover": {
                        bgcolor: "grey.100",
                      },
                    }}
                  >
                    <SwapVert fontSize="small" />
                  </IconButton>

                  <SelectWrapper
                    label="To"
                    value={destination}
                    onChange={handleDestinationChange}
                    options={allowedRoutes[source] || []}
                    icon={<LocationOn fontSize="small" color="secondary" />}
                    fullWidth
                  />
                </Stack>

                {/* Departure Time Section */}
                <SelectWrapper
                  label="Departure Time"
                  value={departureTime}
                  onChange={handleDepartureTimeChange}
                  options={times}
                  icon={<Schedule fontSize="small" color="primary" />}
                  fullWidth
                />
              </Stack>
            </Paper>
            {/* Tabs Section */}
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                sx={{
                  "& .MuiTab-root": {
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: "1rem",
                    minWidth: 100,
                  },
                }}
              >
                <Tab label="All Services" value="all" />
                {busServices.map((service) => (
                  <Tab
                    key={service}
                    label={service}
                    value={service.toLowerCase()}
                    // icon={
                    //   <DirectionsBusIcon
                    //     sx={{ color: busServiceColors[service] }}
                    //   />
                    // }
                    // iconPosition="start"
                  />
                ))}
              </Tabs>
            </Box>
            {/* Results Section - Improved card layout */}
            {/* Results Section */}
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress size={40} thickness={4} />
              </Box>
            ) : (
              <Box sx={{ mt: 3 }}>
                {activeTab === "all" ? (
                  <Stack spacing={4}>
                    {busServices.map((service) => {
                      const scheduleData = setUpScheduleDataByService(
                        schedules,
                        service
                      );
                      if (scheduleData.times.length === 0) return null;

                      return (
                        <Box key={service}>
                          <Typography
                            variant="h6"
                            sx={{
                              mb: 2,
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
                        </Box>
                      );
                    })}
                  </Stack>
                ) : (
                  <Box sx={{ mt: 2 }}>
                    <CardSlider
                      cards={renderBusCards(activeTab.toUpperCase())}
                      isMobile={isMobile}
                    />
                  </Box>
                )}
              </Box>
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
