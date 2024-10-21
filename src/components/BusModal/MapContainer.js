import React, { useEffect, useState } from "react";
import {
  MapContainer as LeafletMap,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Box, Button, IconButton } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import CircleIcon from "@mui/icons-material/Circle";

// Create a custom icon using Material-UI's RoomIcon
const createCustomIcon = (iconComponent) => {
  return L.divIcon({
    html: `<div style="font-size: 30px; color: #1976d2;">${iconComponent}</div>`,
    className: "custom-marker",
  });
};

const MapContainer = ({ busStops }) => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  const openGoogleMaps = () => {
    if (userLocation) {
      const [lat, lng] = userLocation;
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
        "_blank"
      );
    }
  };

  return (
    <Box
      sx={{
        height: { xs: 300, sm: 400 },
        width: "100%",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        position: "relative",
      }}
    >
      {/* Leaflet Map Container */}
      <LeafletMap
        center={userLocation || [35.2456, 33.0266]}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Show user's current location */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={createCustomIcon(`<RoomIcon />`)}
          >
            <Popup>Your current location</Popup>
          </Marker>
        )}

        {/* Add markers for bus stops */}
        {busStops.map((stop, index) => (
          <Marker
            key={index}
            position={stop.coordinates}
            icon={createCustomIcon(`<CircleIcon />`)}
          >
            <Popup>{stop.name}</Popup>
          </Marker>
        ))}
      </LeafletMap>

      {/* Button to open Google Maps for directions */}
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          bottom: 10,
          right: 10,
          backgroundColor: "#1976d2",
          color: "white",
          zIndex: 1000,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
        onClick={openGoogleMaps}
        disabled={!userLocation}
      >
        Open in Google Maps
      </Button>
    </Box>
  );
};

export default MapContainer;
