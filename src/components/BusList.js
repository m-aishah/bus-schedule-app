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
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import TrendingFlatRoundedIcon from "@mui/icons-material/TrendingFlatRounded";
import { styled } from "@mui/material/styles";

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

const colors = {
  primary: "rgb(93,137,216)",
  secondary: "#F8FAFC",
  text: "#1E293B",
  textLight: "#64748B",
  accent: "#E2E8F0",
};

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "16px",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  backgroundColor: colors.secondary,
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 24px rgba(148, 163, 184, 0.15)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "25px",
  textTransform: "none",
  padding: "10px 24px",
  transition: "all 0.3s ease",
  color: colors.primary,
  background: "white",
  border: "1.5px solid",
  borderColor: colors.primary,
  fontWeight: 600,
  fontSize: "0.95rem",
  "&:hover": {
    background: colors.primary,
    color: "white",
    borderColor: colors.primary,
  },
  "& .MuiSvgIcon-root": {
    marginLeft: "8px",
    fontSize: "1.2rem",
  },
}));

const PhoneButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "white",
  padding: "8px",
  boxShadow: "0 2px 8px rgba(148, 163, 184, 0.12)",
  "&:hover": {
    backgroundColor: colors.primary,
    "& .MuiSvgIcon-root": {
      color: "white",
    },
  },
  "& .MuiSvgIcon-root": {
    color: colors.primary,
    fontSize: "1.3rem",
    transition: "color 0.2s ease",
  },
}));

export default function BusList({ busCompanies, handleViewSchedules }) {
  const groupedBusCompanies = groupByDestination(busCompanies);

  const handlePhoneClick = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <Box sx={{ marginBottom: 4, px: { xs: 2, sm: 0 } }}>
      {Object.keys(groupedBusCompanies).map((destination, index) => (
        <Box key={index} sx={{ marginBottom: 5 }}>
          {/* Destination Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              padding: 2,
              borderRadius: "12px",
              marginBottom: 3,
              boxShadow: "0 2px 12px rgba(148, 163, 184, 0.12)",
            }}
          >
            <LocationOnRoundedIcon
              sx={{
                color: colors.primary,
                marginRight: 1,
                fontSize: "1.5rem",
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "700",
                  color: colors.text,
                  letterSpacing: "0.5px",
                  marginRight: 1,
                  fontSize: { xs: "1.1rem", sm: "1.25rem" },
                }}
              >
                {groupedBusCompanies[
                  destination
                ][0].schedules.from[0].toUpperCase() +
                  groupedBusCompanies[destination][0].schedules.from.slice(1)}
              </Typography>
              <TrendingFlatRoundedIcon
                sx={{
                  marginX: 1,
                  fontSize: "1.75rem",
                  color: colors.primary,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "700",
                  color: colors.text,
                  letterSpacing: "0.5px",
                  fontSize: { xs: "1.1rem", sm: "1.25rem" },
                }}
              >
                {destination[0].toUpperCase() + destination.slice(1)}
              </Typography>
            </Box>
          </Box>

          {/* Bus Cards Grid */}
          <Grid container spacing={3}>
            {groupedBusCompanies[destination].map((company, companyIndex) => (
              <Grid item xs={12} md={6} key={companyIndex}>
                <StyledCard>
                  <CardContent sx={{ paddingTop: 3, paddingBottom: 3 }}>
                    <Grid container spacing={2} alignItems="center">
                      {/* Left side: Company name and phone */}
                      <Grid item xs={7}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "700",
                            color: colors.text,
                            marginBottom: 1,
                            fontSize: { xs: "1.1rem", sm: "1.25rem" },
                          }}
                        >
                          {company.name[0].toUpperCase() +
                            company.name.slice(1)}
                        </Typography>

                        {company.phone !== "N/A" && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <PhoneButton
                              onClick={() => handlePhoneClick(company.phone)}
                              aria-label="call company"
                            >
                              <LocalPhoneRoundedIcon />
                            </PhoneButton>
                            <Typography
                              variant="body1"
                              sx={{
                                color: colors.textLight,
                                fontWeight: 500,
                                fontSize: "0.95rem",
                              }}
                            >
                              {company.phone}
                            </Typography>
                          </Box>
                        )}
                      </Grid>

                      {/* Right side: Price and View Schedules button */}
                      <Grid item xs={5}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            gap: 2,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              color: colors.primary,
                              fontWeight: "700",
                              fontSize: { xs: "1.2rem", sm: "1.35rem" },
                            }}
                          >
                            <CurrencyLiraIcon />
                            {company.schedules.price}
                          </Typography>
                          <StyledButton
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewSchedules(company);
                            }}
                          >
                            Timetable
                          </StyledButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
