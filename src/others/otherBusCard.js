// BusCard.js
import React from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  useTheme,
  Stack,
  Typography,
  Box,
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
        elevation={0}
        sx={{
          width: "100%",
          minWidth: 280,
          bgcolor: "background.paper",
          transition: "all 0.2s ease-in-out",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          },
        }}
      >
        <CardActionArea onClick={onClick}>
          <CardContent>
            <Stack spacing={2}>
              {/* Service & Time Header */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <DirectionsBusIcon sx={{ color: color }} />
                  <Typography variant="subtitle1" fontWeight={600}>
                    {service}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AccessTimeIcon sx={{ color: color, fontSize: "1.2rem" }} />
                  <Typography variant="h6" fontWeight={600}>
                    {time}
                  </Typography>
                </Stack>
              </Stack>

              {/* Location & Price */}
              <Stack spacing={1}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LocationOnIcon
                    sx={{ color: "text.secondary", fontSize: "1.2rem" }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    From{" "}
                    <span style={{ color: "text.primary", fontWeight: 500 }}>
                      {location}
                    </span>
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <LocalOfferIcon
                    sx={{ color: "text.secondary", fontSize: "1.2rem" }}
                  />
                  <Typography variant="body2" fontWeight={500} color={color}>
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
