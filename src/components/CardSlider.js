import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowForwardIos, ArrowBackIos } from "@mui/icons-material";

const CardSlider = ({ cards, isMobile }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerPage = isMobile ? 1 : 4;

  const nextCards = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, cards.length - cardsPerPage)
    );
  };

  const prevCards = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      {/* Previous button */}
      <IconButton
        onClick={prevCards}
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
        disabled={currentIndex === 0}
      >
        <ArrowBackIos />
      </IconButton>

      {/* Slider container */}
      <Box
        sx={{
          display: "flex",
          transition: "transform 0.3s ease-in-out",
          transform: `translateX(-${(100 / cardsPerPage) * currentIndex}%)`,
        }}
      >
        {cards.map((card, index) => (
          <Box
            key={index}
            sx={{
              flex: `0 0 ${100 / cardsPerPage}%`, // Makes each card take up an equal portion of the space
              padding: 1,
              boxSizing: "border-box",
            }}
          >
            {card}
          </Box>
        ))}
      </Box>

      {/* Next button */}
      <IconButton
        onClick={nextCards}
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
        disabled={currentIndex >= cards.length - cardsPerPage}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};

export default CardSlider;
