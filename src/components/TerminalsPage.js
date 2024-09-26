"use client"; // Mark this component as a client component
import { useRouter } from "next/router";
import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Paper, Grid, Container, Typography, Button } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

// Styled Paper Component for terminal cards
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#f5f5f5",
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  transition: "0.3s ease-in-out",
  "&:hover": {
    boxShadow: theme.shadows[6],
  },
}));

// Main Page for showing all terminals
export default function TerminalsPage() {
  // const [isClient, setIsClient] = useState(false);
  // const router = useRouter();
  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // if (!isClient) return null;

  const terminals = [
    {
      name: "Guzelyurt Terminal",
      description:
        "A hub for major bus routes connecting the capital to other cities.",
      image: "/nicosia.jpg",
    },
    {
      name: "Lefke Terminal",
      description:
        "Key terminal serving routes to and from Famagusta, a historic port city.",
      image: "/famagusta.jpg",
    },
  ];
  const clicked = (terminal) => {
    alert("You clicked on " + terminal.name);
  };

  return (
    <Container>
      <Box sx={{ flexGrow: 1, py: 4 }}>
        <Grid container spacing={3}>
          {terminals.map((terminal, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Item>
                {/* Left side: Image taking 30% of the width */}
                <Box sx={{ width: "30%", position: "relative" }}>
                  <Image
                    src={terminal.image}
                    alt={terminal.name}
                    width={300} // Define width
                    height={200} // Define height
                    layout="responsive"
                    style={{ borderRadius: "4px" }}
                  />
                </Box>

                {/* Right side: Text content and button taking 70% */}
                <Box sx={{ width: "70%", paddingLeft: 2 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {terminal.name}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" paragraph>
                    {terminal.description}
                  </Typography>
                  <Button variant="contained" color="primary">
                    View More
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
