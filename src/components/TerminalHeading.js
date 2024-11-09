import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Box, Paper, Typography, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import MapIcon from "@mui/icons-material/Map";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RouteIcon from "@mui/icons-material/Route";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

// Styled Components to match navbar design system
const StyledPaper = styled(Paper)(({ theme }) => ({
  maxWidth: "1100px",
  margin: "0 auto",
  marginBottom: theme.spacing(6),
  background: "rgb(93,137,216)",
  borderRadius: theme.breakpoints.down("md") ? "0 0 24px 24px" : "32px",
  position: "relative",
  overflow: "hidden",
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.03)",
  borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
}));

const InfoCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-1px)",
    backgroundColor: "rgba(255,255,255,0.15)",
  },
}));

const MapButton = styled(Paper)(({ theme }) => ({
  padding: "8px 24px",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  backgroundColor: "#2196f3",
  borderRadius: "8px",
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(33, 150, 243, 0.9)",
    transform: "translateY(-1px)",
  },
}));

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
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "12rem",
          background: "white",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.03)",
        }}
      >
        <CircularProgress sx={{ color: "#2196f3" }} size={40} />
      </Box>
    );
  }

  if (!coordinates) {
    return (
      <Typography align="center" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
        Location data unavailable
      </Typography>
    );
  }

  return (
    <StyledPaper elevation={0}>
      <Box sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 3,
            mb: 4,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <DirectionsBusIcon
                sx={{
                  color: "white",
                  fontSize: "2.5rem",
                  mr: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  fontSize: { xs: "1.75rem", sm: "2rem" },
                  background:
                    "linear-gradient(45deg, #fff, rgba(255,255,255,0.8))",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {name[0].toUpperCase() + name.slice(1)} Terminal
              </Typography>
            </Box>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.85)",
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: 400,
                lineHeight: 1.5,
              }}
            >
              Your gateway to travel! Find all bus latest schedules, routes and
              prices in {name} terminal.
            </Typography>
          </Box>
        </Box>

        {/* Info Cards Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
            gap: 2,
            mt: 4,
          }}
        >
          <InfoCard>
            <AccessTimeIcon sx={{ color: "white" }} />
            <Typography
              sx={{ color: "white", fontSize: "0.9rem", fontWeight: 500 }}
            >
              24/7 Service
            </Typography>
          </InfoCard>

          <InfoCard>
            <RouteIcon sx={{ color: "white" }} />
            <Typography
              sx={{ color: "white", fontSize: "0.9rem", fontWeight: 500 }}
            >
              Multiple Routes
            </Typography>
          </InfoCard>

          <InfoCard>
            <CalendarTodayIcon sx={{ color: "white" }} />
            <Typography
              sx={{ color: "white", fontSize: "0.9rem", fontWeight: 500 }}
            >
              Daily Schedules
            </Typography>
          </InfoCard>

          <Link
            href={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <MapButton>
              <MapIcon sx={{ color: "white" }} />
              <Typography
                sx={{
                  color: "white",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                }}
              >
                View Map
              </Typography>
            </MapButton>
          </Link>
        </Box>
      </Box>
    </StyledPaper>
  );
}
