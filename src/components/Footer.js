import { Box, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, GitHub } from "@mui/icons-material";
import { Github } from "lucide-react";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: "auto",
        textAlign: "center",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        color: "white",
      }}
    >
      {/* Social Media Icons */}
      <Box sx={{ mb: 1 }}>
        <IconButton
          color="inherit"
          href="https://github.com/m-aishah/bus-schedule-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
        </IconButton>
      </Box>

      {/* Copyright */}
      <Typography variant="body2" color="inherit">
        Built with <span style={{ color: "red" }}>❤️</span> by
        <Link
          href="https://github.com/m-aishah"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
          sx={{ mx: 1 }}
        >
          m-aishah
        </Link>
        &amp;
        <Link
          href="https://github.com/godfreydekew"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
          sx={{ mx: 1 }}
        >
          godfreydekew
        </Link>
        .
      </Typography>
    </Box>
  );
};

export default Footer;
