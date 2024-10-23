"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Paper, Grid, Container, Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: "#f5f5f5",
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  borderRadius: "20px", // for a more rounded, modern look
  boxShadow: theme.shadows[3],
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)", // Subtle scaling effect on hover
    boxShadow: theme.shadows[6], // Enhanced shadow on hover
    backgroundColor: "#e0f7fa", // Lighter color on hover
  },
}));

export default function TerminalsPage({ terminals }) {
  const clicked = (terminal) => {
    // Handle click event
  };

  return (
    <Container>
      <Box sx={{ flexGrow: 1, py: 4 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 4,
            color: "#1976d2",
          }}
        >
          Explore Terminals
        </Typography>

        <Grid container spacing={3}>
          {terminals.map((terminal, index) => (
            <Grid item xs={12} sm={12} key={index}>
              <Item onClick={() => clicked(terminal)}>
                {/* Left side: Icon taking 30% of the width */}
                <Box
                  sx={{
                    width: "30%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <DirectionsBusIcon
                    sx={{
                      fontSize: 80,
                      color: "#0288d1", // Stylish bus icon color
                    }}
                  />
                </Box>

                {/* Right side: Text content and button taking 70% */}
                <Box sx={{ width: "70%", paddingLeft: 2 }}>
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{ fontWeight: "bold", color: "#004d40" }} // Stronger color
                    gutterBottom
                  >
                    {terminal.name[0].toUpperCase() + terminal.name.slice(1)}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    paragraph
                    sx={{ marginBottom: 2, color: "#616161" }} // Lighter grey text
                  >
                    {terminal.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      backgroundColor: "#0288d1",
                      borderRadius: "50px",
                      padding: "8px 16px",
                      width: "100px",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#0277bd",
                      },
                    }}
                    component={Link}
                    href={`/oneterminal/${terminal.id}`}
                  >
                    View
                  </Button>
                </Box>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
