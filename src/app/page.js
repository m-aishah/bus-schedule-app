"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  Stack,
  InputLabel,
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

// const SelectWrapper = ({ label, value, onChange, options, icon }) => (
//   <FormControl
//     fullWidth
//     size="small"
//     sx={{
//       "& .MuiOutlinedInput-root": {
//         borderRadius: 2,
//         backgroundColor: "background.paper",
//         transition: "all 0.2s",
//         "&:hover": {
//           backgroundColor: "action.hover",
//         },
//       },
//     }}
//   >
//     <InputLabel sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//       {icon}
//       {label}
//     </InputLabel>
//     <Select
//       value={value}
//       onChange={onChange}
//       label={label}
//       sx={{ minWidth: { xs: "140px", sm: "200px" } }}
//     >
//       {options.map((option) => (
//         <MenuItem key={option} value={option}>
//           {option}
//         </MenuItem>
//       ))}
//     </Select>
//   </FormControl>
// );

export default function SchedulePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const busServices = ["AKVA", "CIMEN", "EUL_BUS"];
  const locations = ["LEFKE", "GUZELYURT", "GIRNE", "NICOSIA"];
  const times = ["09:00", "10:00", "11:00", "12:00"];

  const [source, setSource] = useState(locations[1]);
  const [destination, setDestination] = useState(locations[0]);
  const [departureTime, setDepartureTime] = useState(times[0]);
  const [arrivalTime, setArrivalTime] = useState(times[1]);
  const [schedules, setSchedules] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [dayCategory, setDayCategory] = useState("weekdays");

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
      // Optionally handle the error state
    } finally {
      setLoading(false);
    }
  }, [dayCategory, departureTime, source, destination]);

  useEffect(() => {
    const today = new Date().getDay();
    setDayCategory(today === 0 || today === 6 ? "weekend" : "weekdays");
  }, []);

  useEffect(() => {
    loadSchedules();
  }, [loadSchedules]);

  const handleSourceChange = (event) => setSource(event.target.value);
  const handleDestinationChange = (event) => setDestination(event.target.value);
  const handleDepartureTimeChange = (event) =>
    setDepartureTime(event.target.value);
  const handleArrivalTimeChange = (event) => setArrivalTime(event.target.value);

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
          height: "100%",
        }}
      >
        <BusCard
          service={busService}
          time={time}
          location={source}
          price={`${scheduleData.price}TL`}
          onClick={() => handleCardClick(busService, time)}
        />
      </Box>
    ));
  };

  const swapLocations = () => {
    setSource(destination);
    setDestination(source);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
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
          <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
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
            />

            <IconButton
              onClick={swapLocations}
              sx={{
                bgcolor: "background.default",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <SwapVert />
            </IconButton>

            <SelectWrapper
              label="To"
              value={destination}
              onChange={handleDestinationChange}
              options={locations}
              icon={<LocationOn fontSize="small" color="secondary" />}
            />
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="center"
          >
            <SelectWrapper
              label="Departure"
              value={departureTime}
              onChange={handleDepartureTimeChange}
              options={times}
              icon={<Schedule fontSize="small" color="primary" />}
            />

            <SelectWrapper
              label="Arrival"
              value={arrivalTime}
              onChange={handleArrivalTimeChange}
              options={times}
              icon={<Schedule fontSize="small" color="secondary" />}
            />
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
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 3,
                      fontWeight: 600,
                      color: theme.palette.primary.main,
                    }}
                  >
                    {service}
                  </Typography>

                  <Box
                    sx={{
                      display: "grid",
                      gap: 2,
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                        lg: "repeat(4, 1fr)",
                      },
                    }}
                  >
                    {renderBusCards(service)}
                  </Box>
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
  );
}
