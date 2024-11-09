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

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 2, md: 3 },
        px: { xs: 1, md: 2 },
        mt: "auto",
        backgroundColor: "white",
        borderTop: "1px solid rgba(0, 0, 0, 0.08)",
        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.03)",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: { xs: 1.5, md: 2 },
          }}
        >
          {/* Left Side - Bus Tracker Info */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Bus size={20} color="#2196f3" />
            <Typography
              variant="h6"
              color="black"
              sx={{
                fontSize: { xs: "1rem", md: "1.25rem" },
                fontWeight: "bold",
              }}
            >
              Bus Tracker
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
                        },
                      }}
                    >
                      <IconButton
                        size="small"
                        sx={{
                          padding: { xs: "4px", md: "8px" },
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "rgba(33, 150, 243, 0.04)",
                          },
                        }}
                      >
                        <dev.icon size={14} />
                      </IconButton>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: { xs: "0.75rem", md: "0.875rem" },
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
