import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { WbSunny, Cloud, Grain, Air } from "@mui/icons-material";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Make sure the correct db is imported
import axios from "axios";

const WeatherIcon = ({ type }) => {
  switch (type) {
    case "clear":
      return <WbSunny fontSize="large" sx={{ color: "orange" }} />;
    case "clouds":
      return <Cloud fontSize="large" sx={{ color: "grey.500" }} />;
    case "rain":
      return <Grain fontSize="large" sx={{ color: "blue" }} />;
    case "wind":
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

export default function WeatherForecast({ terminalId }) {
  const [hourlyData, setHourlyData] = useState([]);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    console.log("Inside the weather", terminalId);
    const fetchTerminalCoordinates = async () => {
      if (!terminalId) {
        console.error("Invalid terminal ID.");
        return;
      }

      try {
        const terminalRef = doc(db, "locations", terminalId);
        const terminalSnap = await getDoc(terminalRef);
        if (terminalSnap.exists()) {
          const { lat, lng } = terminalSnap.data().coordinates;
          setCoordinates({ lat, lng });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching terminal data:", error);
      }
    };

    fetchTerminalCoordinates();
  }, [terminalId]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!coordinates) return;

      try {
        const { lat, lng } = coordinates;
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,weathercode&timezone=auto`,
        );
        const { hourly, timezone } = response.data;

        const currentTime = new Date();
        const currentHour = currentTime.getHours();

        const forecast = hourly.time
          .slice(currentHour, currentHour + 4)
          .map((time, index) => {
            const weatherCode = hourly.weathercode[currentHour + index];
            let weatherType = "clear";
            if (weatherCode >= 2 && weatherCode <= 3) weatherType = "clouds";
            else if (weatherCode >= 61 && weatherCode <= 67)
              weatherType = "rain";
            else if (weatherCode >= 51 && weatherCode <= 57)
              weatherType = "wind";

            const forecastTime = new Date(time);
            const hour = forecastTime.getHours();
            const displayHour =
              hour === 0
                ? "12 AM"
                : hour > 12
                  ? `${hour - 12} PM`
                  : `${hour} AM`;

            return {
              hour: displayHour,
              type: weatherType,
              temperature: Math.round(
                hourly.temperature_2m[currentHour + index],
              ),
            };
          });
        setHourlyData(forecast);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [coordinates]);

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
