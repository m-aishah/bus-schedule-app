import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Box, Button } from "@mui/material";

const LeafletMap = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const locationCoordinates = {
  Lefke: { lat: 35.1175, lon: 32.8464 },
  Guzelyurt: { lat: 35.1537804, lon: 32.878825 },
  Girne: { lat: 35.3364, lon: 33.3182 },
  Nicosia: { lat: 35.1856, lon: 33.3823 },
  Yedidalga: { lat: 35.1754, lon: 32.8129 },
};

const createCustomIcon = (iconComponent, color = "#1976d2") => {
  return L.divIcon({
    html: `<div style="font-size: 30px; color: ${color};">${iconComponent}</div>`,
    className: "custom-marker",
  });
};

const MapContainer = ({ busStops, source, destination }) => {
  const [sourceLocation, setSourceLocation] = useState(
    locationCoordinates[source] || null
  );
  const [destinationLocation, setDestinationLocation] = useState(
    locationCoordinates[destination] || null
  );
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const googleMapsUrl =
    sourceLocation && destinationLocation
      ? `https://www.google.com/maps/dir/?api=1&origin=${sourceLocation.lat},${sourceLocation.lon}&destination=${destinationLocation.lat},${destinationLocation.lon}`
      : null;

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        position: "relative",
        "& .leaflet-container": {
          height: "100%",
          width: "100%",
          borderRadius: "8px",
        },
      }}
    >
      <LeafletMap
        center={sourceLocation || [35.2456, 33.0266]}
        zoom={10}
        style={{
          height: "100%",
          width: "100%",
          zIndex: 1,
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {sourceLocation && (
          <Marker
            position={[sourceLocation.lat, sourceLocation.lon]}
            icon={createCustomIcon(`<RoomIcon />`, "#ff5722")}
          >
            <Popup>Source: {source}</Popup>
          </Marker>
        )}

        {destinationLocation && (
          <Marker
            position={[destinationLocation.lat, destinationLocation.lon]}
            icon={createCustomIcon(`<RoomIcon />`, "#4caf50")}
          >
            <Popup>Destination: {destination}</Popup>
          </Marker>
        )}

        {userLocation && (
          <Marker
            position={userLocation}
            icon={createCustomIcon(`<RoomIcon />`, "#1976d2")}
          >
            <Popup>Your current location</Popup>
          </Marker>
        )}

        {busStops?.map((stop, index) => (
          <Marker
            key={index}
            position={stop.coordinates}
            icon={createCustomIcon(`<CircleIcon />`, "#2196f3")}
          >
            <Popup>{stop.name}</Popup>
          </Marker>
        ))}
      </LeafletMap>

      {googleMapsUrl && (
        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
        >
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#1976d2",
                color: "white",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Open in Google Maps
            </Button>
          </a>
        </Box>
      )}
    </Box>
  );
};

export default MapContainer;
