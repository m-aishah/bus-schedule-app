// BusScheduleOverlay.js
import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import Departure from "./OverlayDepature";

const BusScheduleOverlay = ({
  selectedBus,
  selectedDay,
  selectedCity,
  isOverlayOpen,
  handleDayChange,
  handleCloseOverlay,
}) => {
  return (
    <>
      {isOverlayOpen && selectedBus && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Paper sx={{ padding: 2, width: "100%", maxWidth: 400 }}>
            <Departure destination={selectedBus.schedules.to} />

            {/* Day Selection */}
            <Box mb={2}>
              <Typography>Select Day:</Typography>
              <Select value={selectedDay} onChange={handleDayChange} fullWidth>
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

            {/* Bus Schedule and Price Display */}
            {selectedCity && (
              <Box>
                <Grid container spacing={1} sx={{ marginBottom: 2 }}>
                  {(selectedDay === "Saturday" || selectedDay === "Sunday"
                    ? selectedBus.schedules.times.weekend
                    : selectedBus.schedules.times.weekdays
                  ).map((time, index) => (
                    <Grid item xs={6} sm={4} key={index}>
                      <Chip
                        icon={<AccessTimeIcon />}
                        label={time}
                        clickable
                        color="primary"
                        sx={{
                          width: "100%",
                          justifyContent: "center",
                          backgroundColor: "#1976d2",
                          color: "#fff",
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>

                {/* Display Price with Icon */}
                <Typography
                  variant="body1"
                  sx={{ color: "red", display: "flex", alignItems: "center" }}
                >
                  <CurrencyLiraIcon sx={{ marginRight: 1 }} />
                  Price: {selectedBus.schedules.price}
                </Typography>
              </Box>
            )}

            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseOverlay}
              sx={{ marginTop: 2 }}
              fullWidth
            >
              Close
            </Button>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default BusScheduleOverlay;
