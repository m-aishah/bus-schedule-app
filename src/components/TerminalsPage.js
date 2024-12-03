import React from "react";
import { Box, Paper, Grid, Container, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { Bus } from "lucide-react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "white",
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  borderRadius: "8px",
  border: "1px solid rgba(0, 0, 0, 0.06)",
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.03)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.06)",
    backgroundColor: "rgba(33, 150, 243, 0.04)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "24px",
  textTransform: "none",
  padding: "8px 24px",
  transition: "all 0.3s ease",
  background: "linear-gradient(45deg, #2196f3, #e91e63)",
  color: "white",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(33, 150, 243, 0.2)",
  },
}));

const GradientText = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  background: "linear-gradient(45deg, #2196f3, #e91e63)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textAlign: "center",
}));

export default function TerminalsPage({ terminals }) {
  return (
    <Box
      sx={{
        pt: { xs: 8, sm: 9 },
        pb: 4,
        minHeight: "100vh",
        backgroundColor: "#fafafa",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(270deg, #FF4081, #1976D2)",
              backgroundSize: "400% 400%",
              animation: "gradientShift 8s ease infinite",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              mb: 1,
              textAlign: "center",
            }}
          >
            Bus Terminals
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: "text.secondary",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Explore our bus terminals and find detailed information about routes
            and schedules
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {terminals.map((terminal, index) => (
            <Grid item xs={12} key={index}>
              <Item>
                <Box
                  sx={{
                    width: "120px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Bus
                    size={48}
                    style={{
                      color: "#2196f3",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </Box>

                <Box sx={{ flex: 1, pl: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      color: "text.primary",
                    }}
                  >
                    {terminal.name[0].toUpperCase() + terminal.name.slice(1)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      mb: 2,
                      lineHeight: 1.6,
                    }}
                  >
                    {terminal.description}
                  </Typography>
                  <StyledButton
                    component={Link}
                    href={{
                      pathname: `/terminal/${terminal.id}`,
                      query: {
                        size: terminal.services.length,
                      },
                    }}
                  >
                    View Details
                  </StyledButton>
                </Box>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
