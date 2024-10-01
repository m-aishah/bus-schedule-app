import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { WbSunny, Cloud, Grain, Air } from "@mui/icons-material";

const WeatherIcon = ({ type }) => {
  switch (type) {
    case "sunny":
      return <WbSunny fontSize="large" sx={{ color: "orange" }} />;
    case "cloudy":
      return <Cloud fontSize="large" sx={{ color: "grey.500" }} />;
    case "rainy":
      return <Grain fontSize="large" sx={{ color: "blue" }} />;
    case "windy":
      return <Air fontSize="large" sx={{ color: "grey.700" }} />;
    default:
      return null;
  }
};

const HourlyForecast = ({ hour, type, temperature }) => (
  <Paper
    elevation={2}
    sx={{
      p: 2,
      textAlign: "center",
      height: "100%",
      transition: "all 0.3s ease-in-out",
      "&:hover": {
        transform: "scale(1.05)",
        boxShadow: 3,
        bgcolor: "action.hover",
      },
    }}
  >
    <Typography variant="subtitle1" gutterBottom>
      {hour}
    </Typography>
    <WeatherIcon type={type} />
    <Typography variant="h6" sx={{ mt: 1 }}>
      {temperature}°C
    </Typography>
  </Paper>
);

export default function WeatherForecast() {
  const hourlyData = [
    { hour: "12 PM", type: "sunny", temperature: 25 },
    { hour: "1 PM", type: "cloudy", temperature: 24 },
    { hour: "2 PM", type: "rainy", temperature: 22 },
    { hour: "3 PM", type: "windy", temperature: 23 },
  ];

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4 }}>
      <Grid container spacing={2}>
        {hourlyData.map((data, index) => (
          <Grid item xs={3} key={index}>
            <HourlyForecast {...data} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
