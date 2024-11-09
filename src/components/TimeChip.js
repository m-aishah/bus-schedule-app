import { KeyOffRounded } from "@mui/icons-material";
import { Chip } from "@mui/material";

const TimeChip = ({ time }) => {
  return (
    <Chip
      //   key={key}
      label={time}
      clickable
      sx={{
        width: "100%",
        justifyContent: "center",
        backgroundColor: "#1976d2", // Modern blue
        color: "#fff",
        fontWeight: "bold",
        fontSize: "1.2rem",
        marginBottom: "8px",
        "&:hover": {
          backgroundColor: "#1565c0", // Darker blue hover effect
        },
      }}
    />
  );
};

export default TimeChip;
