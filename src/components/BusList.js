import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BusAlertIcon from "@mui/icons-material/BusAlert";

export default function BusList({ busCompanies, handleViewSchedules }) {
  return (
    <Grid container spacing={4} sx={{ marginBottom: 4 }}>
      {busCompanies.map((company, index) => (
        <Grid item xs={12} md={6} key={index}>
          {/* Elevated card for modern feel */}
          <Card
            onClick={() => handleViewSchedules(company)}
            sx={{
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.04)",
                boxShadow: "0 16px 32px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <CardContent sx={{ padding: 4 }}>
              {/* Company Info */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "700",
                    color: "#1E88E5", // Updated to a modern blue shade
                  }}
                >
                  {company.name}
                </Typography>
                <BusAlertIcon sx={{ fontSize: "2rem", color: "#1E88E5" }} />
              </Box>

              {/* Destination section - bold, clean, and highly visible */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#F0F4F8",
                  padding: 2,
                  borderRadius: "8px",
                  marginBottom: 2,
                }}
              >
                <PlaceIcon sx={{ color: "#1E88E5", marginRight: 1 }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    color: "#333", // Darker font color for contrast
                  }}
                >
                  {company.schedules.from}
                  <ArrowForwardIcon
                    sx={{ marginX: 1, fontSize: "1.5rem", color: "#1E88E5" }}
                  />
                  {company.schedules.to}
                </Typography>
              </Box>

              {/* Contact details */}
              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
              >
                <PhoneIcon sx={{ marginRight: 1, color: "#1E88E5" }} />
                <Typography variant="body1" sx={{ color: "#333" }}>
                  {company.phone}
                </Typography>
              </Box>

              {/* CTA Button */}
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewSchedules(company);
                }}
                sx={{
                  width: "100%",
                  fontWeight: "600",
                  backgroundColor: "#1E88E5",
                  textTransform: "none", // Keeps the text in its original format
                  "&:hover": {
                    backgroundColor: "#1565C0",
                  },
                }}
              >
                View Bus Schedules
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
