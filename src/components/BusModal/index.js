import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Tab,
  useTheme,
  useMediaQuery,
  Fade,
  Stack,
  Paper,
  Divider,
} from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import {
  X as CloseIcon,
  Clock as ClockIcon,
  MapPin as LocationIcon,
  Bus as BusIcon,
} from "lucide-react";
import { BusSchedule, BusStops } from "./BusScheduleComponents";

const BusModal = ({ open, onClose, scheduleData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeTab, setActiveTab] = useState("schedule");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (!scheduleData) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 400 }}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 3,
          background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
          overflow: "hidden",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          background: theme.palette.background.paper,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" fontWeight="bold">
            {scheduleData.service}
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              color: "text.secondary",
              "&:hover": {
                background: theme.palette.action.hover,
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </Box>

      {/* Tabs */}
      <TabContext value={activeTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleTabChange}
            centered
            sx={{
              "& .MuiTab-root": {
                minHeight: 64,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 500,
              },
            }}
          >
            <Tab
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <BusIcon size={18} />
                  <span>Schedule</span>
                </Stack>
              }
              value="schedule"
            />
            <Tab
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <LocationIcon size={18} />
                  <span>Stops</span>
                </Stack>
              }
              value="stops"
            />
          </TabList>
        </Box>

        {/* Content */}
        <DialogContent>
          <Fade in={activeTab === "schedule"} unmountOnExit>
            <Box sx={{ display: activeTab === "schedule" ? "block" : "none" }}>
              <BusSchedule scheduleData={scheduleData} />
            </Box>
          </Fade>

          <Fade in={activeTab === "stops"} unmountOnExit>
            <Box sx={{ display: activeTab === "stops" ? "block" : "none" }}>
              <BusStops scheduleData={scheduleData} />
            </Box>
          </Fade>
        </DialogContent>
      </TabContext>
    </Dialog>
  );
};

export default BusModal;
