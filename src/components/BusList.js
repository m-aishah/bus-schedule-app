import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import BusAlertIcon from "@mui/icons-material/BusAlert";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { styled } from "@mui/material/styles";

// Group the bus companies by the destination
const groupByDestination = (busCompanies) => {
  return busCompanies.reduce((acc, company) => {
    const destination = company.schedules.to;
    if (!acc[destination]) {
      acc[destination] = [];
    }
    acc[destination].push(company);
    return acc;
  }, {});
};

const col = "rgb(93,137,216)";

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "50px",
  textTransform: "none",
  padding: "8px 24px",
  transition: "all 0.3s ease",
  color: "black",
  background: "transparent",
  border: "2px solid",
  borderColor: col,
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(33, 150, 243, 0.2)",
  },
}));
export default function BusList({ busCompanies, handleViewSchedules }) {
  // Sort the companies by destination and group them
  const groupedBusCompanies = groupByDestination(busCompanies);

  return (
    <Box sx={{ marginBottom: 4 }}>
      {Object.keys(groupedBusCompanies).map((destination, index) => (
        <Box key={index} sx={{ marginBottom: 5 }}>
          {/* horizontal line which seperates destinations */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white", //gradient
              // backgroundColor: "#F0F4F8",
              padding: 1,
              borderRadius: "10px",
              marginBottom: 2,
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
            }}
          >
            <PlaceIcon
              sx={{ color: col, marginRight: 1, fontSize: "1.5rem" }}
            />
            {/* Wrapping in separate boxes for better alignment */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  color: "#333",
                  textAlign: "center",
                  letterSpacing: "0.5px",
                  marginRight: 1, // Space between from text and arrow
                }}
              >
                {/* Assuming all buses have the same 'from' location for the same destination */}
                {groupedBusCompanies[
                  destination
                ][0].schedules.from[0].toUpperCase() +
                  groupedBusCompanies[destination][0].schedules.from.slice(1)}
              </Typography>
              <ArrowForwardIcon
                sx={{
                  marginX: 0.5, // Reduced margin
                  fontSize: "1.25rem", // Smaller arrow size for better alignment
                  color: col,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  color: "#333",
                  textAlign: "center",
                  letterSpacing: "0.5px",
                }}
              >
                {destination[0].toUpperCase() + destination.slice(1)}
              </Typography>
            </Box>
          </Box>
          {/* Render buses going to this destination */}
          <Grid container spacing={4}>
            {groupedBusCompanies[destination].map((company, companyIndex) => (
              <Grid item xs={12} md={6} sm={6} key={companyIndex}>
                <Card
                  onClick={() => handleViewSchedules(company)}
                  sx={{
                    cursor: "pointer",
                    // boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
                    borderRadius: "12px",
                    // transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    // "&:hover": {
                    //   transform: "scale(1.01)",
                    //   boxShadow: "0 16px 32px rgba(0, 0, 0, 0.2)",
                    // },
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
                          color: "black", // Updated to modern blue
                        }}
                      >
                        {company.name[0].toUpperCase() + company.name.slice(1)}
                      </Typography>
                      <BusAlertIcon sx={{ fontSize: "2rem", color: col }} />
                    </Box>

                    {/* Contact details */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 1,
                      }}
                    >
                      <PhoneIcon sx={{ marginRight: 1, color: col }} />
                      <Typography variant="body1" sx={{ color: "#333" }}>
                        {company.phone}
                      </Typography>
                    </Box>

                    {/* CTA Button */}
                    <StyledButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewSchedules(company);
                      }}
                    >
                      View Schedules
                    </StyledButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
