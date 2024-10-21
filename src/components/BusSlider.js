import React, { useRef } from "react";
import { Box, IconButton, Stack } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BusSlider = ({ children }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = container.clientWidth;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{ width: "100%", position: "relative" }}
    >
      <IconButton
        onClick={() => scroll("left")}
        sx={{
          position: "absolute",
          left: -20,
          zIndex: 2,
          bgcolor: "background.paper",
          boxShadow: 2,
          "&:hover": { bgcolor: "background.paper" },
        }}
      >
        <ChevronLeft />
      </IconButton>

      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          gap: 2,
          px: 1,
          py: 2,
          // Hide scrollbar
          "&::-webkit-scrollbar": { display: "none" },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {React.Children.map(children, (child) => (
          <Box
            sx={{
              flex: "0 0 auto",
              scrollSnapAlign: "start",
              width: {
                xs: "calc(100% - 16px)", // 1 card per view on mobile
                sm: "calc(50% - 16px)", // 2 cards per view on tablet
                md: "calc(33.333% - 16px)", // 3 cards per view on desktop
                lg: "calc(25% - 16px)", // 4 cards per view on large screens
              },
            }}
          >
            {child}
          </Box>
        ))}
      </Box>

      <IconButton
        onClick={() => scroll("right")}
        sx={{
          position: "absolute",
          right: -20,
          zIndex: 2,
          bgcolor: "background.paper",
          boxShadow: 2,
          "&:hover": { bgcolor: "background.paper" },
        }}
      >
        <ChevronRight />
      </IconButton>
    </Stack>
  );
};

export default BusSlider;
