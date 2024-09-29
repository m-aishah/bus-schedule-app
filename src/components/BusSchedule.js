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
    <Typography fontWeight={"bold"}>TO</Typography>
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
    <Typography fontWeight={"bold"}>TO</Typography>
    <CustomSelect
      value={arrivalTime}
      onChange={onArrivalChange}
      options={times}
    />
  </Box>
);

// Timeline Component for Bus Times
const BusTimesTimeline = ({ times }) => (
  <Paper sx={{ p: 2, borderRadius: 2, width: "100%" }}>
    <Box
      sx={{ display: "flex", flexDirection: "column", position: "relative" }}
    >
      {/* Vertical line */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 15,
          bottom: 0,
          width: 2,
          bgcolor: "#e0e0e0",
        }}
      />
      {times.map((time, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          {/* Dot for each time */}
          <CircleIcon sx={{ fontSize: 10, mr: 2, color: "#2196f3" }} />
          {/* Time display */}
          <Typography variant="body2">{time}</Typography>
        </Box>
      ))}
    </Box>
  </Paper>
);

// Main BusSchedule component
const BusSchedule = ({ scheduleData }) => {
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

      {/* Container for From Location and Timeline */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center", // Center vertically
          justifyContent: "center", // Center horizontally
          gap: 5,
          mt: 4,
        }}
      >
        {/* From Location Section */}
        <Box
          sx={{
            textAlign: "center",
            minWidth: "200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Adjusted icon positioning */}
          <LocationOnIcon sx={{ fontSize: 50, mb: 1 }} />
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
            FROM:
          </Typography>
          <CustomSelect
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
            options={fromLocations}
          />
        </Box>

        {/* Bus Times Timeline */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BusTimesTimeline times={times} />
        </Box>
      </Box>
    </Box>
  );
};

export default BusSchedule;
