"use client";
import {
  Box,
  Typography,
  Link,
  IconButton,
  Container,
  Tooltip,
  Divider,
} from "@mui/material";
import { Code, Bus, Github, Terminal, Cpu } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [isHovered, setIsHovered] = useState(false);

  const developers = [
    {
      name: "m-aishah",
      github: "https://github.com/m-aishah",
      role: "Computer Engineer",
      icon: Cpu,
    },
    {
      name: "godfreydekew",
      github: "https://github.com/godfreydekew",
      role: "Software Engineer",
      icon: Cpu,
    },
  ];

  const pulseAnimation = {
    "@keyframes pulse": {
      "0%": { transform: "scale(1)" },
      "50%": { transform: "scale(1.1)" },
      "100%": { transform: "scale(1)" },
    },
  };

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 2, md: 3 },
        px: { xs: 1, md: 2 },
        mt: "auto",
        backgroundColor: "white",
        borderTop: "1px solid rgba(0, 0, 0, 0.06)",
        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.03)",
        position: "relative",
        overflow: "visible",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, #2196f3, #e91e63, #2196f3)",
          backgroundSize: "200% 100%",
          animation: "gradient 15s ease infinite",
        },
        "@keyframes gradient": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        ...pulseAnimation,
      }}
    >
      <Container maxWidth="lg">
        {/* Main Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: { xs: 1.5, md: 2 }, // Reduced gap on mobile
          }}
        >
          {/* Left Side - Bus Tracker Info */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              "&:hover": {
                "& svg": {
                  animation: "pulse 1s infinite",
                },
              },
            }}
          >
            <Bus size={20} color="#2196f3" />
            <Typography
              variant="h6"
              color="text.primary"
              sx={{
                fontSize: { xs: "1rem", md: "1.25rem" },
                fontWeight: "bold",
                background: "linear-gradient(45deg, #2196f3, #e91e63)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Bus Tracker-CY
            </Typography>
          </Box>

          {/* Center - Developers */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, md: 2 },
              py: { xs: 0.5, md: 1 },
              px: { xs: 1.5, md: 3 },
              borderRadius: 2,
              backgroundColor: "rgba(33, 150, 243, 0.03)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(33, 150, 243, 0.07)",
                transform: "translateY(-2px)",
              },
              width: { xs: "100%", md: "auto" },
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Code size={14} color="#666" />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: { xs: "0.75rem", md: "0.875rem" },
                }}
              >
                by
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, md: 2 },
              }}
            >
              {developers.map((dev, index) => (
                <Box
                  key={dev.name}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {index > 0 && (
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ mx: { xs: 0.5, md: 1 }, height: 20 }}
                    />
                  )}
                  <Tooltip
                    title={
                      <Box sx={{ p: 1 }}>
                        <Typography variant="body2">{dev.role}</Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mt: 0.5,
                          }}
                        >
                          <Github size={14} />
                          <Typography variant="caption">
                            View Profile
                          </Typography>
                        </Box>
                      </Box>
                    }
                    arrow
                  >
                    <Link
                      href={dev.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        textDecoration: "none",
                        color: "text.primary",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          color: "#2196f3",
                          transform: "translateY(-1px)",
                        },
                      }}
                    >
                      <IconButton
                        size="small"
                        sx={{
                          padding: { xs: "4px", md: "8px" }, // Smaller padding on mobile
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "rgba(33, 150, 243, 0.04)",
                            transform: "rotate(10deg)",
                          },
                        }}
                      >
                        <dev.icon size={14} />
                      </IconButton>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: { xs: "0.75rem", md: "0.875rem" }, // Smaller font on mobile
                        }}
                      >
                        {dev.name}
                      </Typography>
                    </Link>
                  </Tooltip>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Right Side - Copyright */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: { xs: "0.75rem", md: "0.875rem" },
              mt: { xs: 1, md: 0 },
            }}
          >
            © {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
