import { useRouter } from "next/navigation";
import { IconButton, Typography, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { styled } from "@mui/material/styles";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: "rgba(255, 255, 255, 0.9)",
  padding: theme.spacing(1),
  transition: "all 0.3s ease",
  borderRadius: "5px",
  backgroundColor: "rgba(90,138,228, 1)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  marginBottom: theme.spacing(2),
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    transform: "translateX(-2px)",
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: "rgba(255, 255, 255, 0.9)",
  marginLeft: theme.spacing(1),
  fontWeight: 500,
  fontSize: "0.9rem",
  transition: "all 0.3s ease",
}));

const BackButton = () => {
  const router = useRouter();

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <StyledIconButton
        sx={{ padding: 0, paddingRight: 1, marginLeft: 2, marginTop: 2 }}
        onClick={() => router.back()}
        aria-label="go back"
        z
      >
        <ArrowBackIcon />
        <StyledTypography>Back</StyledTypography>
      </StyledIconButton>
    </Box>
  );
};
export default BackButton;
