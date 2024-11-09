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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { styled } from "@mui/material/styles";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly transparent for modern look
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Light shadow for floating effect
  color: theme.palette.text.primary,
  backdropFilter: "blur(10px)", // Blur effect for modern aesthetic
}));

const StyledButton = styled(Button)({
  borderRadius: "20px",
  textTransform: "none",
  marginLeft: "15px",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Subtle hover effect
  },
});

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        width: 250,
        padding: 2,
      }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        Bus Tracker
      </Typography>
      <List>
        {["Home", "Schedule", "Contact", "Admin"].map((text, index) => (
          <ListItem
            button
            key={index}
            component={Link}
            href={text === "Home" ? "/" : `/${text.toLowerCase()}`}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <StyledAppBar position="fixed">
        {" "}
        {/* Changed to fixed for floating effect */}
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Brand Logo / Title */}
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Bus Tracker
          </Typography>

          {/* Desktop Menu */}
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <StyledButton color="inherit" component={Link} href="/">
              Home
            </StyledButton>
            <StyledButton color="inherit" component={Link} href="/schedule">
              Schedule
            </StyledButton>
            <StyledButton color="inherit" component={Link} href="/contact">
              Contact
            </StyledButton>
            <StyledButton color="inherit" component={Link} href="/admin">
              Admin
            </StyledButton>
          </Box>

          {/* Mobile Menu - Hamburger Icon */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end" // Move to the right
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </StyledAppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right" // Drawer opens from the right
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
