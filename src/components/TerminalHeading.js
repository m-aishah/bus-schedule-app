import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function TerminalHeading({ terminalId }) {
  const [coordinates, setCoordinates] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoordinates = async () => {
      setLoading(true);
      if (!terminalId) {
        console.log("Waiting for terminal id...");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "locations", terminalId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setCoordinates(data.coordinates);
          setName(data.name);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [terminalId]);

  if (loading) {
    return; //<CircularProgress />;
  }

  if (!coordinates) {
    return <Typography>Loading location data...</Typography>;
  }

  return (
    <Link
      href={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`}
      passHref
      target="_blank"
      rel="noopener noreferrer"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 1,
          width: "100%",
          textDecoration: "none",
        }}
      >
        <Paper
          elevation={5}
          sx={{
            display: "flex",
            alignItems: "center",
            padding: 2,
            borderRadius: "50px",
            backgroundColor: "#1976d2",
            color: "#fff",
          }}
        >
          <LocationOnIcon sx={{ fontSize: 25, marginRight: 1 }} />
          <Typography
            variant="h6"
            textAlign="center"
            sx={{ fontWeight: "bold" }}
          >
            {name} Terminal Location
          </Typography>
        </Paper>
      </Box>
    </Link>
  );
}
