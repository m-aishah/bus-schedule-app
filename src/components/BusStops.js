import React from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Paper,
  Grid,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
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
const LocationSelector = ({
  from,
  to,
  onFromChange,
  onToChange,
  locations,
}) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <CustomSelect value={from} onChange={onFromChange} options={locations} />
    <Typography>TO</Typography>
    <CustomSelect value={to} onChange={onToChange} options={locations} />
  </Box>
);

const TimeSelector = ({
  departureTime,
  arrivalTime,
  onDepartureChange,
  onArrivalChange,
  times,
}) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <CustomSelect
      value={departureTime}
      onChange={onDepartureChange}
      options={times}
    />
    <Typography>TO</Typography>
    <CustomSelect
      value={arrivalTime}
      onChange={onArrivalChange}
      options={times}
    />
  </Box>
);

// Main  component
const BusStops = ({ scheduleData }) => {
  const { price, locations, times, fromLocations } = scheduleData;

  const [from, setFrom] = React.useState(locations[0]);
  const [to, setTo] = React.useState(locations[1]);
  const [departureTime, setDepartureTime] = React.useState(times[0]);
  const [arrivalTime, setArrivalTime] = React.useState(times[1]);
  const [fromLocation, setFromLocation] = React.useState(fromLocations[0]);

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
          <LocationSelector
            from={from}
            to={to}
            onFromChange={(e) => setFrom(e.target.value)}
            onToChange={(e) => setTo(e.target.value)}
            locations={locations}
          />
          <TimeSelector
            departureTime={departureTime}
            arrivalTime={arrivalTime}
            onDepartureChange={(e) => setDepartureTime(e.target.value)}
            onArrivalChange={(e) => setArrivalTime(e.target.value)}
            times={times}
          />
        </Grid>
      </Grid>

      {/* Map Container */}
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <MapContainer />
      </Box>
    </Box>
  );
};

export default BusStops;
