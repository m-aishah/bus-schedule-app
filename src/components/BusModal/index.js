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
} from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import { X as CloseIcon, Bus as BusIcon } from "lucide-react";
import { BusStops, BusSchedule } from "./BusModalComponents";

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
          background: theme.palette.background.paper,
          overflow: "hidden",
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 1,
            bgcolor: theme.palette.primary.soft,
            borderRadius: 1,
          }}
        >
          <BusIcon size={24} color={theme.palette.primary.main} />
        </Paper>

        <Stack spacing={0.5} sx={{ flexGrow: 1 }}>
          <Typography variant="h6" fontWeight="bold">
            {scheduleData.service}
          </Typography>
          <Typography variant="body2" color="primary">
            Bus Service
          </Typography>
        </Stack>

        <IconButton
          onClick={onClose}
          sx={{
            color: "text.secondary",
            "&:hover": { bgcolor: theme.palette.action.hover },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <TabContext value={activeTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              "& .MuiTab-root": {
                minHeight: 56,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 500,
              },
            }}
          >
            <Tab label="Schedule" value="schedule" />
            <Tab label="Stops" value="stops" />
          </TabList>
        </Box>

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
