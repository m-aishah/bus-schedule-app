import React from "react";
import { Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function MapButton() {
  return (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<LocationOnIcon />}
      onClick={() => window.open("https://maps.google.com", "_blank")}
    >
      View on Google Maps
    </Button>
  );
}
