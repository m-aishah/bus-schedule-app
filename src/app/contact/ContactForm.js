import React, { useState, useEffect } from "react";
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
  Grid,
} from "@mui/material";
import { Email, Message, Send } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  borderRadius: "16px",
  transition: "all 0.3s ease-in-out",
  padding: theme.spacing(3, 4),
  maxWidth: 600,
  margin: "0 auto",
  marginTop: theme.spacing(8),
  "&:hover": {
    boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.12)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  borderRadius: "8px",
  color: theme.palette.primary.main,
  border: `2px solid ${theme.palette.primary.main}`,
  padding: "10px 24px",
  textTransform: "none",
  fontSize: "14px",
  fontWeight: 500,
  minWidth: "120px",
  transition: "all 0.3s ease",
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
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
    setErrorSnackbarOpen(false);
  };

  useEffect(() => {
    if (state.succeeded) {
      setOpenSnackbar(true);
    } else if (state.errors?.length > 0) {
      setErrorMessage("Please check your email address and try again.");
      setErrorSnackbarOpen(true);
    }
  }, [state.succeeded, state.errors]);

  return (
    <StyledContainer component="form" onSubmit={handleSubmit}>
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
              Message sent successfully!
            </Typography>
            <Typography variant="body1" sx={{ color: "success.dark" }}>
              We&apos;ll get back to you within 24 hours.
            </Typography>
          </Box>
        </Fade>
      ) : (
        <>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(270deg, #FF4081, #1976D2)",
              backgroundSize: "400% 400%",
              animation: "gradientShift 8s ease infinite",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
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

          <Grid container spacing={3}>
            <Grid item xs={12}>
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
            </Grid>

            <Grid item xs={12}>
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
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <StyledButton
              type="submit"
              variant="outlined"
              disabled={state.submitting}
              startIcon={<Send />} // Added icon
            >
              {state.submitting ? "Sending..." : "Send Message"}
            </StyledButton>
          </Box>
        </>
      )}

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
