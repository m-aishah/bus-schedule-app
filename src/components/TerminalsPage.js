"use client";
import { useRouter } from "next/router";
import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Paper, Grid, Container, Typography, Button } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
// Styled Paper Component for terminal cards
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#f5f5f5",
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  borderRadius: "20px", // Increase for a more rounded, modern look
  boxShadow: theme.shadows[3],
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)", // Subtle scaling effect on hover
    boxShadow: theme.shadows[6], // Enhanced shadow on hover
    backgroundColor: "#e0f7fa", // Lighter color on hover
  },
}));

// Main Page for showing all terminals
export default function TerminalsPage() {
  const [terminals, setTerminals] = useState([]);
  const image = "/images/terminal.png";

  useEffect(() => {
    async function fetchAllDocuments(collectionName) {
      try {
        const collectionRef = collection(db, collectionName);
        const querySnapshot = await getDocs(collectionRef);

        const documents = [];
        querySnapshot.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() });
        });

        setTerminals(documents);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    }

    fetchAllDocuments("locations");
  }, []);
  // const terminals = await fetchAllDocuments("locations");
  // const terminals = [
  //   {
  //     name: "Guzelyurt Terminal",
  //     description:
  //       "A hub for major bus routes connecting the capital to other cities.",
  //     image: "/images/terminal.png",
  //   },
  //   {
  //     name: "Lefke Terminal",
  //     description:
  //       "Key terminal serving routes to and from Famagusta, a historic port city.",
  //     image: "/images/terminal.png",
  //   },
  //   {
  //     name: "Girne Terminal",
  //     description:
  //       "A hub for major bus routes connecting the capital to other cities.",
  //     image: "/images/terminal.png",
  //   },
  //   {
  //     name: "Nicosia Terminal",
  //     description:
  //       "Key terminal serving routes to and from Famagusta, a historic port city.",
  //     image: "/images/terminal.png",
  //   },
  // ];

  const clicked = (terminal) => {
    // alert("You clicked on " + terminal.name);
  };

  return (
    <Container>
      <Box sx={{ flexGrow: 1, py: 4 }}>
        {/* GIF Image */}
        {/* <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <Image
            src="https://cdn.dribbble.com/users/3593902/screenshots/6886578/bus-animation-1.gif"
            alt="Bus Animation"
            width={600}
            height={200}
            // layout="fill"
            style={{ objectFit: "contain" }} //
            unoptimized
          />
        </Box> */}

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
                {/* Left side: Image taking 30% of the width */}
                <Box sx={{ width: "30%", position: "relative" }}>
                  <Image
                    src={image}
                    alt={terminal.name}
                    width={300}
                    height={200}
                    layout="responsive"
                    style={{ borderRadius: "10px" }} // More rounded image corners
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
                    {terminal.name}
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
                      borderRadius: "50px", // Rounded button
                      padding: "8px 16px",
                      textTransform: "none", // No uppercase text
                      "&:hover": {
                        backgroundColor: "#0277bd", // Darker blue on hover
                      },
                    }}
                    component={Link}
                    href={`/oneterminal/${terminal.id}`}
                  >
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
