import { Typography, Box } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";

export default function WeatherHeading() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f0f0", // light grey background
        padding: "10px 20px", // padding for the bubbly effect
        borderRadius: "20px", // rounded corners for the bubbly look
        marginBottom: 3, // space below the heading
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // slight shadow for a button-like effect
        width: "fit-content", // fit the content width
        mx: "auto", // center the box horizontally
        width: "100%",
        height: 50,
      }}
    >
      {/* Left Weather Icon */}
      <WbSunnyIcon sx={{ fontSize: 40, marginRight: 1, color: "#f57c00" }} />
      {/* Heading Text */}
      <Typography
        variant="h5"
        gutterBottom
        textAlign="center"
        sx={{
          fontWeight: "bold",
          color: "#1976d2",
        }}
      >
        Weather Forecast
      </Typography>
      {/* Right Weather Icon */}
      <CloudIcon sx={{ fontSize: 40, marginLeft: 1, color: "#90a4ae" }} />
    </Box>
  );
}
