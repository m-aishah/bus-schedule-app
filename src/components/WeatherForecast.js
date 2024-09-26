import React from "react";
import { Box, Typography } from "@mui/material";

export default function WeatherForecast() {
  return (
    <Box mt={4} p={2} bgcolor="lightgray" textAlign="center">
      <Typography variant="h6">5-Day Weather Forecast</Typography>
      <Typography>Day 1: Sunny, 25°C</Typography>
      <Typography>Day 2: Cloudy, 22°C</Typography>
      <Typography>Day 3: Rain, 20°C</Typography>
      <Typography>Day 4: Sunny, 27°C</Typography>
      <Typography>Day 5: Windy, 24°C</Typography>
    </Box>
  );
}
