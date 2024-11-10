import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  useTheme,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Alert,
} from "@mui/material";
import {
  Clock as ClockIcon,
  MapPin as LocationIcon,
  ArrowRight as ArrowRightIcon,
  Circle,
  MapPin,
  Navigation as NavigationIcon,
  List as ListIcon,
  Map as MapIcon,
  AlertCircle,
  Info as InfoIcon,
} from "lucide-react";
import MapContainer from "./MapContainer";

const RouteHeader = ({ from, to, time, price }) => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{
        p: 2,
        bgcolor: "#f5f9fc",
        minWidth: "min-content",
        overflowX: "auto",
        "&::-webkit-scrollbar": { display: "none" },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      <Typography
        variant="h5"
        color="primary"
        fontWeight="bold"
        sx={{
          fontSize: "1.25rem",
          whiteSpace: "nowrap",
          minWidth: "fit-content",
          flexShrink: 0,
        }}
      >
        {price}TL
      </Typography>

      <Typography
        variant="body"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          whiteSpace: "nowrap",
          minWidth: "fit-content",
          flexGrow: 1,
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <LocationIcon size={16} color={theme.palette.primary.main} />
        <span>{from}</span>
        <ArrowRightIcon size={16} />
        <span>{to}</span>
      </Typography>

      <Chip
        icon={<ClockIcon size={16} />}
        label={time}
        color="primary"
        sx={{
          height: 24,
          fontSize: "0.875rem",
          flexShrink: 0,
          minWidth: "fit-content",
          ml: "auto",
        }}
      />
    </Stack>
  );
};

export const BusSchedule = ({ scheduleData }) => {
  const theme = useTheme();
  const { price, times, source, destination } = scheduleData;

  return (
    <Box sx={{ p: 2 }}>
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
        <Stack spacing={3}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{
              minWidth: "fit-content",
              overflowX: "auto",
              "&::-webkit-scrollbar": { display: "none" },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            <Typography
              variant="body"
              fontWeight="500"
              sx={{ whiteSpace: "nowrap" }}
            >
              Today&apos;s Schedule
            </Typography>

            <Typography
              variant="body"
              color="primary"
              sx={{ whiteSpace: "nowrap" }}
            >
              ({times.length} Departures)
            </Typography>
          </Stack>

          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                position: "absolute",
                left: 12,
                top: 0,
                bottom: 0,
                width: 2,
                bgcolor: theme.palette.divider,
              }}
            />

            <Stack spacing={1}>
              {times.map((time, index) => {
                const isSelected = time === scheduleData.selectedTime;
                return (
                  <Stack
                    key={index}
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{
                      position: "relative",
                      py: 1.5,
                      minWidth: "fit-content",
                      overflowX: "auto",
                      "&::-webkit-scrollbar": { display: "none" },
                      msOverflowStyle: "none",
                      scrollbarWidth: "none",
                    }}
                  >
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        bgcolor: isSelected
                          ? theme.palette.primary.main
                          : "white",
                        border: `0.5px solid ${isSelected ? theme.palette.primary.main : theme.palette.grey[800]}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1,
                        flexShrink: 0,
                      }}
                    />
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{
                        flexGrow: 1,
                        minWidth: "fit-content",
                      }}
                    >
                      <Typography
                        variant="body"
                        fontWeight={isSelected ? "medium" : "regular"}
                        sx={{
                          fontSize: "0.875rem",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {time}
                      </Typography>
                      {isSelected && (
                        <Chip
                          label="Next departure"
                          size="small"
                          sx={{
                            height: 24,
                            bgcolor: "#dcfce7",
                            color: theme.palette.success.main,
                            fontWeight: "medium",
                            "& .MuiChip-label": {
                              px: 1,
                            },
                            fontSize: "0.75rem",
                            flexShrink: 0,
                          }}
                        />
                      )}
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          </Box>

          <Paper
            elevation={0}
            sx={{
              mt: 2,
              p: 2,
              bgcolor: theme.palette.grey[50],
              borderRadius: 2,
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <InfoIcon size={16} color={theme.palette.text.secondary} />
              <Typography variant="body2" color="text.secondary">
                Estimated travel time: 45 minutes
              </Typography>
            </Stack>
          </Paper>
        </Stack>
      </Paper>
    </Box>
  );
};

export const BusStops = ({ scheduleData }) => {
  const theme = useTheme();
  const [view, setView] = useState("list"); // 'list' or 'map'
  const { price, busStops, source, destination } = scheduleData;
  // TODO: Add bus stops to the database and use it here
  return (
    <Box sx={{ p: 2 }}>
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
      ></Paper>

      {/* View Toggle */}
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Button
          variant={view === "list" ? "contained" : "outlined"}
          startIcon={<ListIcon size={16} />}
          onClick={() => setView("list")}
          size="small"
        >
          Stop List
        </Button>
        <Button
          variant={view === "map" ? "contained" : "outlined"}
          startIcon={<MapIcon size={16} />}
          onClick={() => setView("map")}
          size="small"
        >
          Map View
        </Button>
      </Stack>

      {/* Content */}
      <Paper
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {view === "list" ? (
          <Box>
            <List sx={{ py: 0 }}>
              {/* Source Stop */}
              <ListItem
                sx={{
                  py: 2,
                  bgcolor: theme.palette.primary.soft,
                }}
              >
                <ListItemIcon>
                  <NavigationIcon
                    size={20}
                    color={theme.palette.primary.main}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={source}
                  secondary="Starting Point"
                  primaryTypographyProps={{
                    fontWeight: "bold",
                  }}
                />
              </ListItem>

              <Divider />

              {/* Intermediate Stops */}
              {busStops.map((stop, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ py: 2 }}>
                    <ListItemIcon>
                      <Circle size={12} color={theme.palette.text.secondary} />
                    </ListItemIcon>
                    <ListItemText primary={stop.name} secondary={stop.note} />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}

              {/* Destination Stop */}
              <ListItem
                sx={{
                  py: 2,
                  bgcolor: theme.palette.success.soft,
                }}
              >
                <ListItemIcon>
                  <MapPin size={20} color={theme.palette.success.main} />
                </ListItemIcon>
                <ListItemText
                  primary={destination}
                  secondary="Final Destination"
                  primaryTypographyProps={{
                    fontWeight: "bold",
                  }}
                />
              </ListItem>
            </List>

            {/* Important Notice */}
            <Alert
              severity="info"
              icon={<AlertCircle size={16} />}
              sx={{
                m: 2,
                bgcolor: theme.palette.grey[50],
              }}
            >
              <Typography variant="body2">
                Please note that buses may not stop at all locations. Always
                confirm with the driver about specific stops.
              </Typography>
            </Alert>
          </Box>
        ) : (
          <Box sx={{ p: 1 }}>
            <Box sx={{ height: 400, mb: 2 }}>
              <MapContainer
                busStops={busStops}
                source={source}
                destination={destination}
              />
            </Box>
            <Alert
              severity="info"
              icon={<AlertCircle size={16} />}
              sx={{ mt: 2, bgcolor: theme.palette.grey[50] }}
            >
              <Typography variant="body2">
                Map shows approximate stop locations. Actual stops may vary.
              </Typography>
            </Alert>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default BusSchedule;
