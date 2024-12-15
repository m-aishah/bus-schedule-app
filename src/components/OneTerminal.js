import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Select,
  MenuItem,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import TerminalHeading from "./TerminalHeading";
import BusList from "./BusList";
import WeatherForecast from "./WeatherForecast";
import Departure from "./OverlayDepature";
import Price from "./Price";
import TimeChip from "./TimeChip";
import CloseIcon from "@mui/icons-material/Close";
import BackButton from "./BackButton";
export default function OneTerminal({ busCompanies, id, size }) {
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedCity, setSelectedCity] = useState("");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleViewSchedules = (company) => {
    setSelectedBus(company);
    setIsOverlayOpen(true);
    setSelectedCity(company.schedules.from);
  };

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
  };

  const displayTimes = (times) => {
    const sortedTimes = times.sort((a, b) => (a < b ? -1 : 1));
    const midPoint = Math.ceil(sortedTimes.length / 2);
    const leftColumn = sortedTimes.slice(0, midPoint);
    const rightColumn = sortedTimes.slice(midPoint);

    return (
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        <Grid item xs={6}>
          {leftColumn.map((time, index) => (
            <TimeChip time={time} key={index} />
          ))}
        </Grid>
        <Grid item xs={6}>
          {rightColumn.map((time, index) => (
            <TimeChip time={time} key={index} />
          ))}
        </Grid>
      </Grid>
    );
  };

  return (
    <Box sx={{ maxWidth: 1000, padding: 3, mx: "auto", marginTop: 7 }}>
      {/* <BackButton /> */}
      <TerminalHeading terminalId={id} />

      {size > 0 ? (
        busCompanies.length > 0 ? (
          <BusList
            busCompanies={busCompanies}
            handleViewSchedules={handleViewSchedules}
          />
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", margin: 3 }}>
            <CircularProgress />
          </Box>
        )
      ) : (
        <Box sx={{ textAlign: "center", marginTop: 5, marginBottom: 25 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            🚍 We are building something amazing!
          </Typography>
          <Typography variant="body1" color="textSecondary">
            While there are not any bus schedules here yet, stay tuned—bus
            companies will be joining soon! Our goal is to make your travel
            planning even easier. Check back later for updates!
          </Typography>
        </Box>
      )}

      <Box sx={{ marginBottom: 3 }}>
        <WeatherForecast terminalId={id} />
      </Box>

      {isOverlayOpen && selectedBus && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backdropFilter: "blur(5px)",
            padding: 2,
            transition: "all 0.3s ease-in-out",
          }}
        >
          <Paper
            elevation={6}
            sx={{
              padding: 3,
              maxWidth: 500,
              borderRadius: "16px",
              animation: "fadeIn 0.5s ease-in-out",
              position: "relative",
            }}
          >
            <IconButton
              onClick={handleCloseOverlay}
              sx={{
                position: "absolute",
                top: 2,
                right: 2,
                color: "black",
                fontSize: "30px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "50%",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
            <Departure destination={selectedBus.schedules.to} />
            <Box mb={3}>
              <Typography>Select Day:</Typography>
              <Select
                value={selectedDay}
                onChange={handleDayChange}
                fullWidth
                sx={{ marginBottom: 2 }}
              >
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            {selectedCity && (
              <Box>
                {displayTimes(
                  selectedDay === "Saturday" || selectedDay === "Sunday"
                    ? selectedBus.schedules.times.weekend
                    : selectedBus.schedules.times.weekdays,
                )}
                <Price price={selectedBus.schedules.price} />
              </Box>
            )}
          </Paper>
        </Box>
      )}
    </Box>
  );
}
