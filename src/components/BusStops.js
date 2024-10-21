import { React, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Paper,
  Grid,
} from "@mui/material";
import MapContainer from "./MapContainer";

// Reusable Select component
const CustomSelect = ({ value, onChange, options }) => (
  <FormControl size="small" variant="standard" fullWidth>
    <Select value={value} onChange={onChange}>
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

// Price component
const Price = ({ amount }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      border: "1px solid #ccc",
      width: 70,
      height: 70,
      boxShadow: 2,
      mr: 2,
    }}
  >
    <Typography variant="body2" fontWeight="bold">
      {amount}TL
    </Typography>
  </Box>
);

// Location and time selectors
const LocationBox = ({ from, to }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <Typography>{from}</Typography>
    <Typography fontWeight={"bold"}>TO</Typography>
    <Typography> {to}</Typography>
  </Box>
);

const TimeBox = ({ departureTime, arrivalTime }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <Typography>{departureTime}</Typography>
    <Typography fontWeight={"bold"}>TO</Typography>
    <Typography>{arrivalTime}</Typography>
  </Box>
);

// Main  component
const BusStops = ({ scheduleData }) => {
  const { price, locations, times, busStops } = scheduleData;

  const [from, setFrom] = useState(scheduleData.source);
  const [to, setTo] = useState(scheduleData.destination);
  const [departureTime, setDepartureTime] = useState(times[0]);
  const [arrivalTime, setArrivalTime] = useState(times[1]);

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "#fafafa",
        borderRadius: 3,
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        width: "100%",
      }}
    >
      <Grid container spacing={2} alignItems="flex-start">
        {/* Price and Location Selectors */}
        <Grid item xs={12} sm={3}>
          <Price amount={price} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocationBox from={from} to={to} />
          <TimeBox departureTime={departureTime} arrivalTime={arrivalTime} />
        </Grid>
      </Grid>

      {/* Map Container */}
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <MapContainer busStops={busStops} />
      </Box>
    </Box>
  );
};

export default BusStops;
