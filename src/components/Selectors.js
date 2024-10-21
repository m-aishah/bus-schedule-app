import React from "react";
import { Box, Typography, Select, MenuItem, FormControl } from "@mui/material";

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

export { CustomSelect, LocationSelector, TimeSelector, Price };
