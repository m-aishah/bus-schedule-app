import React from "react";
import {
  MapContainer as LeafletMap,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Box } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

// Create a custom icon for markers
const customIcon = new L.Icon({
  iconUrl: require("../assets/location-icon.png"),
  iconSize: [30, 30],
});

const MapContainer = () => {
  return (
    <Box
      sx={{
        height: { xs: 300, sm: 400 },
        width: "100%",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      {/* Leaflet Map Container */}
      <LeafletMap
        center={[35.2456, 33.0266]}
        zoom={14} // Set zoom level
        style={{ height: "100%", width: "100%" }}
      >
        {/* Map Tile Layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Example Marker for Current Location */}
        <Marker position={[35.2456, 33.0266]} icon={customIcon}>
          <Popup>Current Location</Popup>
        </Marker>

        {/* Add more markers as needed for bus stops */}
        <Marker position={[35.2482, 33.0211]} icon={customIcon}>
          <Popup>Bus Stop 1</Popup>
        </Marker>
        <Marker position={[35.2493, 33.0302]} icon={customIcon}>
          <Popup>Bus Stop 2</Popup>
        </Marker>
      </LeafletMap>
    </Box>
  );
};

export default MapContainer;
