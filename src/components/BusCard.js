import React from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  useTheme,
  Stack,
  Typography,
  Box,
  alpha,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

const BusCard = React.memo(
  ({ service, time, location, price, onClick, color }) => {
    const theme = useTheme();

    return (
      <Card
        elevation={2}
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "background.paper",
          transition: "transform 0.2s, box-shadow 0.2s",
          borderRadius: 3,
          overflow: "hidden",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: theme.shadows[8],
            "& .service-icon": {
              transform: "scale(1.1)",
            },
          },
        }}
      >
        <CardActionArea
          onClick={onClick}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              background: `linear-gradient(135deg, ${color || theme.palette.primary.main}, ${color || theme.palette.primary.dark})`,
              p: 2,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              className="service-icon"
              sx={{
                position: "absolute",
                right: -10,
                top: -10,
                transform: "rotate(15deg)",
                opacity: 0.3,
                transition: "transform 0.3s ease",
                filter: "drop-shadow(0 0 15px rgba(0, 0, 0, 0.2))",
              }}
            >
              {/* Bus Icon */}
              <DirectionsBusIcon sx={{ fontSize: 100, color: "black" }} />
            </Box>
            <Stack direction="row" alignItems="center" spacing={1}>
              <DirectionsBusIcon sx={{ color: "white" }} />
              <Typography variant="h6" sx={{ color: "white", fontWeight: 700 }}>
                {service}
              </Typography>
            </Stack>
          </Box>

          <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
            <Stack spacing={2}>
              {/* Time Section */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={1.5}
                sx={{
                  p: 1,
                  bgcolor: alpha(color || theme.palette.primary.main, 0.05),
                  borderRadius: 2,
                }}
              >
                <AccessTimeIcon
                  sx={{
                    color: color || theme.palette.primary.main,
                    fontSize: "1.5rem",
                  }}
                />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Next departure
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, lineHeight: 1 }}
                  >
                    {time}
                  </Typography>
                </Box>
              </Stack>

              {/* Location & Price */}
              <Stack spacing={1.5}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <LocationOnIcon
                    sx={{
                      color: "black",
                      fontSize: "1.25rem",
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    From{" "}
                    <span
                      style={{
                        color: color || theme.palette.text.primary,
                        fontWeight: 600,
                      }}
                    >
                      {location}
                    </span>
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <LocalOfferIcon
                    sx={{
                      color: "black",
                      fontSize: "1.25rem",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: color || theme.palette.success.main,
                      fontWeight: 600,
                    }}
                  >
                    {price}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
);
BusCard.displayName = "BusCard";

export default BusCard;
