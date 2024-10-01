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

export default function BusList({ busCompanies, handleViewSchedules }) {
  return (
    <Grid container spacing={2} sx={{ marginBottom: 3 }}>
      {busCompanies.map((company, index) => (
        <Grid item xs={12} md={6} key={index}>
          {/* Entire card clickable */}
          <Card
            onClick={() => handleViewSchedules(company)}
            sx={{
              cursor: "pointer",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent>
              {/* Company Name */}
              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "center" }}
              >
                {company.name}
                <ArrowForwardIcon sx={{ marginLeft: "auto" }} />
              </Typography>

              {/* Destinations with Icon */}
              <Box sx={{ display: "flex", alignItems: "center", marginY: 1 }}>
                <PlaceIcon sx={{ marginRight: 1, color: "#1976d2" }} />
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Destinations:{" "}
                </Typography>
                <Typography variant="body2" sx={{ marginLeft: 0.5 }}>
                  {company.destinations.join(", ")}
                </Typography>
              </Box>

              {/* Phone with Icon */}
              <Box sx={{ display: "flex", alignItems: "center", marginY: 1 }}>
                <PhoneIcon sx={{ marginRight: 1, color: "#1976d2" }} />
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Phone:{" "}
                </Typography>
                <Typography variant="body2" sx={{ marginLeft: 0.5 }}>
                  {company.phone}
                </Typography>
              </Box>

              {/* View Schedules Button */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={(e) => {
                  e.stopPropagation(); // prevent card click
                  handleViewSchedules(company);
                }}
                sx={{ marginTop: 2 }}
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
