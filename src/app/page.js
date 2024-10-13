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
} from "@mui/material";
import BusCard from "@/components/BusCard";
import BusModal from "@/components/BusModal";
import fetchSchedules from "@/actions/databaseActions";

const SelectWrapper = ({ label, value, onChange, options }) => (
  <FormControl fullWidth size="small">
    <InputLabel>{label}</InputLabel>
    <Select value={value} onChange={onChange} label={label}>
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default function SchedulePage() {
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
          width: {
            xs: "100%",
            sm: "calc(50% - 8px)",
            md: "calc(25% - 12px)",
          },
          mb: 2,
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

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", padding: 3 }}>
      <Box mb={4}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={4}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            NEXT BUS FROM
          </Typography>

          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <SelectWrapper
                label="From"
                value={source}
                onChange={handleSourceChange}
                options={locations}
              />
              <Typography variant="body1">TO</Typography>
              <SelectWrapper
                label="To"
                value={destination}
                onChange={handleDestinationChange}
                options={locations}
              />
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <SelectWrapper
                label="Departure Time"
                value={departureTime}
                onChange={handleDepartureTimeChange}
                options={times}
              />
              <Typography variant="body1">TO</Typography>
              <SelectWrapper
                label="Arrival Time"
                value={arrivalTime}
                onChange={handleArrivalTimeChange}
                options={times}
              />
            </Stack>
          </Stack>
        </Stack>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {busServices.map((service) => (
            <Box key={service}>
              <Typography variant="h5" sx={{ mb: 2, mt: 4 }}>
                {service}
              </Typography>
              <Stack
                direction="row"
                flexWrap="wrap"
                justifyContent="flex-start"
                sx={{ gap: 2 }}
              >
                {renderBusCards(service)}
              </Stack>
            </Box>
          ))}
        </>
      )}

      <BusModal
        open={modalOpen}
        onClose={handleCloseModal}
        scheduleData={selectedSchedule}
      />
    </Box>
  );
}
