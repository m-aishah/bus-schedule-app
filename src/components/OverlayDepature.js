import {
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
  Paper,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const Departure = ({ destination }) => {
  return (
    <Paper
      sx={{
        padding: 2,
        width: "100%",
        maxWidth: 400,
        backgroundColor: "#f5f5f5", // light grey background for contrast
        borderRadius: 2,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // subtle shadow for depth
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 2,
        }}
      >
        {/* Adding a location pin icon */}
        <AccessTimeIcon
          sx={{
            fontSize: 30,
            color: "#1976d2", // Color to match the theme
            marginRight: 1,
          }}
        />
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            color: "#333", // dark color for good contrast
          }}
        >
          Destination: {destination}
        </Typography>
      </Box>
      <Typography
        variant="body2"
        sx={{ textAlign: "center", color: "#666", fontStyle: "italic" }}
      >
        Departure Schedule
      </Typography>
    </Paper>
  );
};

export default Departure;
