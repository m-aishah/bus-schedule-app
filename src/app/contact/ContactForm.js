import React from "react";
import { useForm, ValidationError } from "@formspree/react";
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
import { Email, Message } from "@mui/icons-material"; // Import Material Icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // For success message

function ContactForm() {
  const [state, handleSubmit] = useForm("xbljdoee");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
    setErrorSnackbarOpen(false);
  };

  React.useEffect(() => {
    if (state.succeeded) {
      setOpenSnackbar(true);
    } else if (state.errors && state.errors.length > 0) {
      // Ensure state.errors is defined
      setErrorMessage(
        "Email not sent. Please check your email address or entered details.",
      );
      setErrorSnackbarOpen(true);
    }
  }, [state.succeeded, state.errors]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 500,
        margin: "0 auto",
        padding: 4,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "background.paper",
        transition: "0.3s ease-in-out",
        "&:hover": {
          boxShadow: 6, // Shadow effect on hover
        },
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", mb: 3 }}
      >
        Contact Us
      </Typography>
      <Typography
        variant="body1"
        align="center"
        sx={{ mb: 4, color: "text.secondary" }}
      >
        We value your feedback! Please use this form to report any issues,
        suggestions, or questions you may have. We will get back to you as soon
        as possible.
      </Typography>

      {state.succeeded ? (
        <Fade in={true} timeout={500}>
          <Box
            className="text-center p-8 bg-green-50 rounded-lg"
            sx={{
              marginBottom: 3,
              border: "1px solid #d1fae5",
              transition: "0.3s ease-in-out",
            }}
          >
            <CheckCircleIcon
              className="text-green-500 mb-4"
              sx={{ fontSize: 56 }}
            />
            <Typography variant="h5" className="text-green-700 mb-2">
              Message Sent Successfully!
            </Typography>
            <Typography variant="body1" className="text-green-600">
              Thank you for reaching out. We will get back to you within 24
              hours.
            </Typography>
          </Box>
        </Fade>
      ) : (
        <>
          <Box mb={3}>
            <TextField
              id="email"
              label="Email Address"
              type="email"
              name="email"
              fullWidth
              variant="outlined"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: "primary.main" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                borderRadius: 2, // Increased border radius for modern look
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2, // Consistent radius with the TextField
                },
              }}
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
              sx={{ color: "error.main", mt: 1 }} // Error message styling
            />
          </Box>
          <Box mb={4}>
            <TextField
              id="message"
              label="Message"
              name="message"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Message sx={{ color: "primary.main" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
              sx={{ color: "error.main", mt: 1 }} // Error message styling
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={state.submitting}
            sx={{
              padding: "12px 24px",
              borderRadius: 25, // Increased border radius for the button
              margin: "0 auto",
              display: "block", // Center button
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            {state.submitting ? "Submitting..." : "Submit"}
          </Button>
        </>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Thank you for your message!
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ContactForm;
