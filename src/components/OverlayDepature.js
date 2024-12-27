import { Box, Typography, Paper } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";

const colors = {
  primary: "rgb(93,137,216)",
  secondary: "#F8FAFC",
  text: "#1E293B",
  textLight: "#64748B",
  accent: "#E2E8F0",
};

const Departure = ({ from, to, price }) => {
  return (
    <Paper
      sx={{
        padding: 2,
        width: "100%",
        maxWidth: 400,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
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
        <Typography
          variant="h6"
          sx={{
            color: colors.primary,
            fontWeight: "700",
            fontSize: { xs: "1.2rem", sm: "1.35rem" },
          }}
        >
          <CurrencyLiraIcon />
          {price}
        </Typography>
        <LocationOnIcon
          sx={{
            fontSize: 20,
            color: "#1976d2",
            marginRight: 1,
          }}
        />
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          From: {from}
          To: {to}
        </Typography>
      </Box>
    </Paper>
  );
};

export default Departure;
