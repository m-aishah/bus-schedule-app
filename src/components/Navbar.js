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
  Fade,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { Menu, Bus, Home, Calendar, Mail, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "white",
  color: theme.palette.text.primary,
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.03)",
  borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
  backdropFilter: "blur(10px)",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "20px",
  textTransform: "none",
  padding: "8px 20px",
  marginLeft: "12px",
  color: theme.palette.text.primary,
  transition: "all 0.3s ease",
  fontSize: "0.9rem",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  "&:hover": {
    backgroundColor: "rgba(33, 150, 243, 0.08)",
    transform: "translateY(-1px)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.04)",
  },
}));

const ActiveIndicator = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: 0,
  width: "3px",
  height: "70%",
  backgroundColor: "#2196f3",
  borderRadius: "0 4px 4px 0",
  transition: "opacity 0.3s ease",
}));

const menuItems = [
  { text: "Home", icon: <Home size={18} />, path: "/" },
  { text: "Schedule", icon: <Calendar size={18} />, path: "/schedule" },
  { text: "Contact", icon: <Mail size={18} />, path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        height: "100%",
        backgroundColor: "white",
        padding: 0,
        display: "flex",
        flexDirection: "column",
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
          backgroundColor: "rgba(33, 150, 243, 0.02)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Bus size={20} color="#2196f3" />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "black",
            }}
          >
            Bus Tracker
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle}>
          <X size={20} />
        </IconButton>
      </Box>

      {/* Drawer Content */}
      <List sx={{ padding: "16px", flex: 1 }}>
        {menuItems.map((item) => (
          <Fade in={true} key={item.text} timeout={500}>
            <ListItem
              component={Link}
              href={item.path}
              sx={{
                borderRadius: "12px",
                mb: 1,
                position: "relative",
                padding: "12px 16px",
                transition: "all 0.3s ease",
                backgroundColor:
                  pathname === item.path
                    ? "rgba(33, 150, 243, 0.04)"
                    : "transparent",
                "&:hover": {
                  backgroundColor: "rgba(33, 150, 243, 0.08)",
                  transform: "translateX(4px)",
                },
              }}
              onClick={handleDrawerToggle}
            >
              {pathname === item.path && <ActiveIndicator />}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  ml: pathname === item.path ? 1 : 0,
                }}
              >
                <Box
                  sx={{
                    color: pathname === item.path ? "#2196f3" : "black",
                    transition: "color 0.3s ease",
                  }}
                >
                  {item.icon}
                </Box>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: pathname === item.path ? 600 : 500,
                      color: pathname === item.path ? "#2196f3" : "black",
                    },
                  }}
                />
              </Box>
            </ListItem>
          </Fade>
        ))}
      </List>

      <Box
        sx={{
          padding: "16px",
          borderTop: "1px solid rgba(0, 0, 0, 0.06)",
          backgroundColor: "rgba(33, 150, 243, 0.02)",
          textAlign: "center",
        }}
      >
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Version 1.0
        </Typography>
      </Box>
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
              onClick={() => router.push("/")}
            >
              <Bus size={24} color="#2196f3" />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  color: "black",
                }}
              >
                Bus Tracker
              </Typography>
            </Box>

            {/* Desktop Menu */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                ml: "auto",
                gap: 1,
              }}
            >
              {menuItems.map((item) => (
                <StyledButton
                  key={item.text}
                  component={Link}
                  href={item.path}
                  startIcon={item.icon}
                  sx={{
                    backgroundColor:
                      pathname === item.path
                        ? "rgba(33, 150, 243, 0.08)"
                        : "transparent",
                    fontWeight: pathname === item.path ? 600 : 500,
                  }}
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
                  backgroundColor: "rgba(33, 150, 243, 0.08)",
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
            maxWidth: "300px",
            borderTopLeftRadius: "16px",
            borderBottomLeftRadius: "16px",
            boxShadow: "-4px 0 16px rgba(0, 0, 0, 0.05)",
          },
        }}
        SlideProps={{
          timeout: 300,
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
