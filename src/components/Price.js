import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import { Typography } from "@mui/material";
export default function Price({ price }) {
  return (
    <Typography
      variant="body1"
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#fff7e6",
        padding: "8px 16px",
        borderRadius: "8px",
        fontSize: "1.2rem",
        fontWeight: "bold",
        color: "#ff5722",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        marginTop: 2,
      }}
    >
      Price:
      <CurrencyLiraIcon sx={{ marginRight: 1, fontSize: "1.5rem" }} /> {price}
    </Typography>
  );
}
