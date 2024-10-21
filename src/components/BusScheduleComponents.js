import React, { useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Stack,
  Paper,
  useTheme,
  Chip,
  Divider,
} from "@mui/material";
import {
  Clock as ClockIcon,
  MapPin as LocationIcon,
  ArrowRight as ArrowRightIcon,
  Circle as CircleIcon,
  DollarSign as PriceIcon,
  Bus as BusIcon,
} from "lucide-react";
import MapContainer from "./MapContainer";

// Shared components
const RouteHeader = ({ from, to, time, price }) => {
  const theme = useTheme();

  return (
    <Stack spacing={3} sx={{ mb: 4 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Paper
          elevation={0}
          sx={{
            p: 2,
            bgcolor: theme.palette.primary.soft,
            borderRadius: 2,
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <PriceIcon size={16} />
          <Typography variant="h6" color="primary" fontWeight="bold">
            {price}TL
          </Typography>
        </Paper>

        <Divider orientation="vertical" flexItem />

        <Stack spacing={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <LocationIcon size={16} color={theme.palette.primary.main} />
            <Typography variant="body1">
              {from} <ArrowRightIcon size={16} /> {to}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <ClockIcon size={16} color={theme.palette.secondary.main} />
            <Typography variant="body2" color="text.secondary">
              {time}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

// BusSchedule Component
export const BusSchedule = ({ scheduleData }) => {
  const theme = useTheme();
  const { price, times, source, destination } = scheduleData;

  return (
    <Box sx={{ p: 3 }}>
      <RouteHeader
        from={source}
        to={destination}
        time={scheduleData.selectedTime}
        price={price}
      />

      <Paper
        elevation={0}
        sx={{
          p: 3,
          bgcolor: theme.palette.background.default,
          borderRadius: 2,
        }}
      >
        <Stack direction="row" spacing={4}>
          <Stack spacing={2} sx={{ minWidth: 200 }}>
            <Typography variant="subtitle1" fontWeight="500">
              Today's Schedule
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <BusIcon size={16} />
              <Typography variant="body2" color="text.secondary">
                {times.length} Departures
              </Typography>
            </Stack>
          </Stack>

          <Box sx={{ position: "relative", flexGrow: 1 }}>
            {/* Timeline line */}
            <Box
              sx={{
                position: "absolute",
                left: 10,
                top: 15,
                bottom: 15,
                width: 2,
                bgcolor: theme.palette.divider,
                zIndex: 0,
              }}
            />

            {/* Timeline items */}
            <Stack spacing={2}>
              {times.map((time, index) => (
                <Stack
                  key={index}
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      bgcolor:
                        time === scheduleData.selectedTime
                          ? theme.palette.primary.main
                          : theme.palette.background.paper,
                      border: `2px solid ${
                        time === scheduleData.selectedTime
                          ? theme.palette.primary.main
                          : theme.palette.divider
                      }`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {time === scheduleData.selectedTime && (
                      <CircleIcon size={8} color="white" />
                    )}
                  </Box>
                  <Chip
                    label={time}
                    variant={
                      time === scheduleData.selectedTime ? "filled" : "outlined"
                    }
                    color={
                      time === scheduleData.selectedTime ? "primary" : "default"
                    }
                    size="small"
                  />
                </Stack>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

// BusStops Component
export const BusStops = ({ scheduleData }) => {
  const theme = useTheme();
  const { price, busStops, source, destination } = scheduleData;

  return (
    <Box sx={{ p: 3 }}>
      <RouteHeader
        from={source}
        to={destination}
        time={scheduleData.selectedTime}
        price={price}
      />

      <Paper
        elevation={0}
        sx={{
          p: 3,
          bgcolor: theme.palette.background.default,
          borderRadius: 2,
          height: 400, // Adjust based on your needs
        }}
      >
        <Box sx={{ height: "100%" }}>
          <MapContainer busStops={busStops} />
        </Box>
      </Paper>
    </Box>
  );
};

// // Add this to your theme setup
// const theme = {
//   palette: {
//     primary: {
//       soft: alpha(theme.palette.primary.main, 0.1),
//     },
//   },
// };

export default BusSchedule;
