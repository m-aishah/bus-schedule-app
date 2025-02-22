import React from "react";
import { Typography, Stack, useTheme, Chip } from "@mui/material";
import {
  Clock as ClockIcon,
  MapPin as LocationIcon,
  ArrowRight as ArrowRightIcon,
} from "lucide-react";

const RouteHeader = ({ from, to, time, price }) => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{
        marginX: 2,
        padding: 2,
        width: "100%",
        maxWidth: "100%",
        bgcolor: "#f5f9fc",
        overflowX: "auto",
        "&::-webkit-scrollbar": { display: "none" },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        [theme.breakpoints.down("sm")]: {
          padding: 1,
          spacing: 1,
        },
      }}
    >
      <Typography
        variant="h5"
        color="primary"
        fontWeight="bold"
        sx={{
          fontSize: "1.25rem",
          whiteSpace: "nowrap",
          minWidth: "fit-content",
          flexShrink: 0,
          [theme.breakpoints.down("sm")]: {
            fontSize: "1rem",
          },
        }}
      >
        {price}TL
      </Typography>

      <Typography
        variant="body"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          whiteSpace: "nowrap",
          minWidth: "fit-content",
          flexGrow: 1,
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <LocationIcon size={16} color={theme.palette.primary.main} />
        <span>{from}</span>
        <ArrowRightIcon size={16} />
        <span>{to}</span>
      </Typography>

      {time && (
        <Chip
          icon={<ClockIcon size={16} />}
          label={time}
          color="primary"
          sx={{
            height: 24,
            fontSize: "0.875rem",
            flexShrink: 0,
            minWidth: "fit-content",
            ml: "auto",
            [theme.breakpoints.down("sm")]: {
              fontSize: "0.75rem",
            },
          }}
        />
      )}
    </Stack>
  );
};

export default RouteHeader;
