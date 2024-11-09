import React, { useEffect, useState } from "react";
import { Sun, Moon, Cloud, CloudRain, Wind, Droplets } from "lucide-react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import axios from "axios";

const getBackgroundGradient = (weatherCode, isNight, temperature) => {
  const gradients = {
    clear: {
      day: `linear-gradient(135deg, 
        #4a90e2 0%, 
        #3a80e0 100%)`,
      night: "linear-gradient(135deg, #0c1445 0%, #203795 100%)",
    },
    cloudy: "linear-gradient(135deg, #d3d3d3 0%, #a8a8a8 100%)", // Light gray for cloudy
    rain: "linear-gradient(135deg, #60a5fa 0%, #a0c4ff 100%)", // Light blue for rain
    storm: "linear-gradient(135deg, #0e2d51 0%, #34495e 100%)", // Dark blue for storm
    snow: "linear-gradient(135deg, #e6e9f0 0%, #eef1f5 100%)", // Light gray for snow
    fog: "linear-gradient(135deg, #a0aec0 0%, #718096 100%)", // Gray for fog
  };

  if (weatherCode === 0)
    return isNight ? gradients.clear.night : gradients.clear.day;
  if (weatherCode >= 95) return gradients.storm;
  if (weatherCode >= 71 && weatherCode <= 77) return gradients.snow;
  if (weatherCode >= 51) return gradients.rain;
  if (weatherCode >= 45) return gradients.fog;
  return gradients.cloudy;
};

const WeatherIcon = ({ weatherCode, hour, temperature, size = 64 }) => {
  const isNight = hour < 6 || hour >= 18;

  const WeatherComposition = () => {
    const getColor = (type) => {
      const colors = {
        sun: "#ffdd57",
        moon: "#f0e68c",
        cloud: "#d3d3d3",
        rain: "#60a5fa",
      };
      return colors[type];
    };

    if (weatherCode === 0) {
      return isNight ? (
        <Moon size={size} color={getColor("moon")} />
      ) : (
        <Sun size={size} color={getColor("sun")} />
      );
    }

    if (weatherCode >= 95) {
      return <CloudRain size={size} color={getColor("rain")} />;
    }

    return <Cloud size={size} color={getColor("cloud")} />;
  };

  return (
    <Grid container alignItems="center">
      <Grid item>
        <WeatherComposition />
      </Grid>
    </Grid>
  );
};

const CurrentWeather = ({ terminalId }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!terminalId) {
        setError("No terminal ID provided");
        setLoading(false);
        return;
      }

      try {
        const terminalRef = doc(db, "locations", terminalId);
        const terminalSnap = await getDoc(terminalRef);

        if (!terminalSnap.exists()) {
          setError("Terminal not found");
          setLoading(false);
          return;
        }

        const { lat, lng } = terminalSnap.data().coordinates;

        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,weathercode,relativehumidity_2m,windspeed_10m,apparent_temperature&timezone=auto`,
        );

        const { hourly } = response.data;
        const currentHour = new Date().getHours();

        const currentData = {
          temperature: Math.round(hourly.temperature_2m[currentHour]),
          feelsLike: Math.round(hourly.apparent_temperature[currentHour]),
          weatherCode: hourly.weathercode[currentHour],
          humidity: Math.round(hourly.relativehumidity_2m[currentHour]),
          windSpeed: Math.round(hourly.windspeed_10m[currentHour]),
        };

        setWeatherData(currentData);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch weather data");
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [terminalId]);

  if (loading) return <Card className="animate-pulse bg-gray-800 h-96" />;

  if (error)
    return (
      <Card className="bg-red-900">
        <CardContent className="text-white text-center p-4">
          {error}
        </CardContent>
      </Card>
    );

  const gradient = getBackgroundGradient(
    weatherData.weatherCode,
    new Date().getHours() < 6 || new Date().getHours() >= 18,
    weatherData.temperature,
  );

  return (
    <Card
      sx={{
        background: "rgb(93,137,216)", //gradient
        boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        maxWidth: 1000,
        margin: "0 auto",
        borderRadius: "16px",
      }}
    >
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item spacing={10} xs={12} sm={6} container alignItems="center">
            <Grid item>
              <WeatherIcon
                weatherCode={weatherData.weatherCode}
                hour={new Date().getHours()}
                temperature={weatherData.temperature}
                size={isMobile ? 60 : 80}
              />
            </Grid>
            <Grid item>
              <Typography variant={isMobile ? "h4" : "h2"} color="white">
                {weatherData.temperature}°C
              </Typography>
              <Typography variant="body2" color="white">
                Feels like {weatherData.feelsLike}°C
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    p: 1,
                  }}
                >
                  <Droplets size={24} className="text-white" />
                  <Grid item>
                    <Typography variant="h6" color="white">
                      {weatherData.humidity}%
                    </Typography>
                    <Typography variant="caption" color="white">
                      Humidity
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    p: 1,
                  }}
                >
                  <Wind size={24} className="text-white" />
                  <Grid item>
                    <Typography variant="h6" color="white">
                      {weatherData.windSpeed} km/h
                    </Typography>
                    <Typography variant="caption" color="white">
                      Wind Speed
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
