import React, { useState } from "react";
import {
  Modal,
  Box,
  Tabs,
  Tab,
  Typography,
  IconButton,
  useTheme,
  Grid,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CircleIcon from "@mui/icons-material/Circle";
import BusSchedule from "./BusSchedule"; // Make sure to import the BusSchedule component
import BusStops from "./BusStops"; // Import the BusStops component

const scheduleData = {
  price: 45,
  locations: ["LEFKE", "GIRNE", "NICOSIA"],
  times: [
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ],
  fromLocations: [
    "EUROPEAN UNIVERSITY OF LEFKE",
    "GIRNE AMERICAN UNIVERSITY",
    "NEAR EAST UNIVERSITY",
  ],
};

const BusModal = ({ open, onClose }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "60%" }, // Responsive width
          maxHeight: "90vh", // Max height for scrolling
          overflowY: "auto", // Scroll on overflow
          bgcolor: "background.paper",
          boxShadow: 24,
          p: { xs: 2, sm: 4 }, // Padding based on screen size
          borderRadius: 2,
        }}
      >
        {/* Close Button */}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Tabs for Navigation */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          sx={{ mb: 2 }}
        >
          <Tab label="BUS SCHEDULE" />
          <Tab label="BUS STOPS" />
        </Tabs>

        {/* Content for Bus Schedule */}
        {activeTab === 0 && (
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <BusSchedule scheduleData={scheduleData} />
          </Box>
        )}

        {/* Content for Bus Stops */}
        {activeTab === 1 && (
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <BusStops scheduleData={scheduleData} />
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default BusModal;
