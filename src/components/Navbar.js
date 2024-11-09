"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { Menu, Bus, Home, Calendar, Mail, UserCog, X } from "lucide-react";

// Styled Components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "white",
  color: theme.palette.text.primary,
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.03)",
  borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
  backdropFilter: "blur(10px)",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
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
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  textTransform: "none",
  padding: "8px 16px",
  marginLeft: "8px",
  color: theme.palette.text.primary,
  transition: "all 0.3s ease",
  fontSize: "0.9rem",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  "&:hover": {
    backgroundColor: "rgba(33, 150, 243, 0.04)",
    transform: "translateY(-1px)",
  },
}));

const menuItems = [
  { text: "Home", icon: <Home size={18} />, path: "/" },
  { text: "Schedule", icon: <Calendar size={18} />, path: "/schedule" },
  { text: "Contact", icon: <Mail size={18} />, path: "/contact" },
  { text: "Admin", icon: <UserCog size={18} />, path: "/admin" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        height: "100%",
        backgroundColor: "white",
        padding: 0,
      }}
    >
      {/* Drawer Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
          borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Bus size={20} color="#2196f3" />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(45deg, #2196f3, #e91e63)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            BusTracker-CY
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle}>
          <X size={20} />
        </IconButton>
      </Box>

      {/* Drawer Content */}
      <List sx={{ padding: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component={Link}
            href={item.path}
            sx={{
              borderRadius: "8px",
              mb: 1,
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(33, 150, 243, 0.04)",
                transform: "translateX(4px)",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {item.icon}
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  sx: { fontWeight: 500 },
                }}
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <StyledAppBar position="fixed">
        <Container maxWidth="lg">
          <Toolbar sx={{ padding: { xs: 1, md: 2 } }}>
            {/* Brand Logo */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexGrow: { xs: 1, md: 0 },
              }}
            >
              <Bus
                size={24}
                color="#2196f3"
                style={{
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  background: "linear-gradient(45deg, #2196f3, #e91e63)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Bus Tracker-CY
              </Typography>
            </Box>

            {/* Desktop Menu */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                ml: "auto",
              }}
            >
              {menuItems.map((item) => (
                <StyledButton
                  key={item.text}
                  component={Link}
                  href={item.path}
                  startIcon={item.icon}
                >
                  {item.text}
                </StyledButton>
              ))}
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{
                display: { xs: "block", md: "none" },
                ml: "auto",
                "&:hover": {
                  backgroundColor: "rgba(33, 150, 243, 0.04)",
                },
              }}
            >
              <Menu size={24} />
            </IconButton>
          </Toolbar>
        </Container>
      </StyledAppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: "320px",
            borderTopLeftRadius: "16px",
            borderBottomLeftRadius: "16px",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
