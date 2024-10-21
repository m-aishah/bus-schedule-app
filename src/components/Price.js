import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira"; // Import currency icon
import { Typography } from "@mui/material";
export default function Price({ price }) {
  return (
    <Typography
      variant="body1"
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#fff7e6", // Light background to highlight price
        padding: "8px 16px",
        borderRadius: "8px", // Smooth corners for modern look
        fontSize: "1.2rem", // Larger font size
        fontWeight: "bold", // Bold font for emphasis
        color: "#ff5722", // Accent color
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
        marginTop: 2, // Add margin for spacing
      }}
    >
      Price:
      <CurrencyLiraIcon sx={{ marginRight: 1, fontSize: "1.5rem" }} />{" "}
      {/* Slightly larger icon */}
      {price} {/* Displaying the price dynamically */}
    </Typography>
  );
}
