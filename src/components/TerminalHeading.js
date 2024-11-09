import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Box, Paper, Typography, CircularProgress } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RouteIcon from "@mui/icons-material/Route";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
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
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "12rem",
          background: "linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)",
        }}
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (!coordinates) {
    return (
      <Typography align="center" color="text.secondary">
        Location data unavailable
      </Typography>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: "1100px",
        mx: "auto",
        mb: 6,
        background: "linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)",
        borderRadius: { xs: "0 0 24px 24px", md: "32px" },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)",
          borderRadius: "50%",
          transform: "translate(50%, -50%)",
        }}
      />

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
                  color: "#FFD700",
                  fontSize: "2.5rem",
                  mr: 2,
                  animation: "bounce 2s infinite",
                  "@keyframes bounce": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                  },
                  filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.3))",
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: "#fff",
                  fontSize: { xs: "1.75rem", sm: "2rem", md: "2rem" },
                  textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                  letterSpacing: "-0.5px",
                }}
              >
                {name[0].toUpperCase() + name.slice(1)} Terminal
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{
                color: "rgba(255,255,255,0.85)",
                maxWidth: "600px",
                fontSize: { xs: "1rem", md: "1.1rem" },
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
          <Paper
            sx={{
              p: 2,
              bgcolor: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <AccessTimeIcon
              sx={{
                color: "#4CAF50",
                fontSize: "1.5rem",
                filter: "drop-shadow(0 0 4px rgba(76, 175, 80, 0.3))",
              }}
            />
            <Typography
              sx={{ color: "#fff", fontSize: "0.9rem", fontWeight: 500 }}
            >
              24/7 Service
            </Typography>
          </Paper>

          <Paper
            sx={{
              p: 2,
              bgcolor: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <RouteIcon
              sx={{
                color: "#FF9800",
                fontSize: "1.5rem",
                filter: "drop-shadow(0 0 4px rgba(255, 152, 0, 0.3))",
              }}
            />
            <Typography
              sx={{ color: "#fff", fontSize: "0.9rem", fontWeight: 500 }}
            >
              Multiple Routes
            </Typography>
          </Paper>

          <Paper
            sx={{
              p: 2,
              bgcolor: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <CalendarTodayIcon
              sx={{
                color: "#E91E63",
                fontSize: "1.5rem",
                filter: "drop-shadow(0 0 4px rgba(233, 30, 99, 0.3))",
              }}
            />
            <Typography
              sx={{ color: "#fff", fontSize: "0.9rem", fontWeight: 500 }}
            >
              Daily Schedules
            </Typography>
          </Paper>

          <Link
            href={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Paper
              sx={{
                px: 3,
                py: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 1,
                bgcolor: "#2196F3",
                borderRadius: "100px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)",
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "#1976D2",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 16px rgba(33, 150, 243, 0.4)",
                },
              }}
            >
              <MapIcon
                sx={{
                  color: "#fff",
                  fontSize: "1.5rem",
                  filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))",
                }}
              />
              <Typography
                sx={{
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                }}
              >
                View Map
              </Typography>
            </Paper>
          </Link>
        </Box>
      </Box>
    </Paper>
  );
}
