import React from "react";
import { useForm } from "@formspree/react";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  Snackbar,
  Alert,
  Fade,
} from "@mui/material";
import { Email, Message } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/material/styles";

// Styled components to match navbar styling
const StyledContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  borderRadius: "16px",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.12)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#2196F3",
  borderRadius: "50px",
  color: "white",
  padding: "12px 32px",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 500,
  minWidth: "140px",
  display: "flex",
  gap: "8px",
  alignItems: "center",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "#1976D2",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
    },
    "&.Mui-focused": {
      backgroundColor: "rgba(255, 255, 255, 1)",
    },
  },
}));

function ContactForm() {
  const [state, handleSubmit] = useForm("xbljdoee");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
    setErrorSnackbarOpen(false);
  };

  React.useEffect(() => {
    if (state.succeeded) {
      setOpenSnackbar(true);
    } else if (state.errors?.length > 0) {
      setErrorMessage("Please check your email address and try again.");
      setErrorSnackbarOpen(true);
    }
  }, [state.succeeded, state.errors]);

  return (
    <StyledContainer
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: { xs: 3, md: 4 },
        mt: 8,
      }}
    >
      {state.succeeded ? (
        <Fade in={true} timeout={500}>
          <Box
            sx={{
              textAlign: "center",
              p: 4,
              backgroundColor: "rgba(209, 250, 229, 0.4)",
              borderRadius: "12px",
              border: "1px solid #d1fae5",
            }}
          >
            <CheckCircleIcon
              sx={{ fontSize: 56, color: "success.main", mb: 2 }}
            />
            <Typography variant="h5" sx={{ color: "success.dark", mb: 1 }}>
              Message Sent Successfully!
            </Typography>
            <Typography variant="body1" sx={{ color: "success.dark" }}>
              We'll get back to you within 24 hours.
            </Typography>
          </Box>
        </Fade>
      ) : (
        <>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 1,
              textAlign: "center",
            }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: "text.secondary",
              textAlign: "center",
            }}
          >
            We value your feedback! Please use this form to report any issues,
            suggestions, or questions you may have. We will get back to you as
            soon as possible.
          </Typography>

          <Box sx={{ mb: 3 }}>
            <StyledTextField
              id="email"
              label="Email Address"
              type="email"
              name="email"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: "primary.main" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <StyledTextField
              id="message"
              label="Message"
              name="message"
              multiline
              rows={4}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Message sx={{ color: "primary.main" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <StyledButton
            type="submit"
            variant="contained"
            fullWidth
            disabled={state.submitting}
          >
            {state.submitting ? "Sending..." : "Send Message"}
          </StyledButton>
        </>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            borderRadius: "12px",
            backgroundColor: "success.main",
            color: "white",
          }}
        >
          Thank you for your message!
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{
            borderRadius: "12px",
          }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </StyledContainer>
  );
}

export default ContactForm;
