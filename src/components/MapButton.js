import React from "react";
import { Box, Typography } from "@mui/material";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "250px",
  overflow: "hidden",
  borderRadius: "20px",
};

const center = {
  lat: 40.7128, // Example: New York City coordinates
  lng: -74.006,
};

const zoom = 14;

export default function InteractiveMap() {
  return (
    <Box
      sx={{
        maxWidth: 1000,
        mx: "auto",
        mt: 4,
        // borderRadius: 20,
        // backgroundColor: "blue",
        overflow: "hidden",
      }}
    >
      <LoadScript googleMapsApiKey="">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </Box>
  );
}
