import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const CardSlider = ({ cards }) => {
  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };
  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      {/* Previous button */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      >
        <ArrowBackIos />
      </IconButton>
      <Swiper
        ref={swiperRef}
        spaceBetween={10}
        slidesPerView={1}
        modules={[Navigation]}
        breakpoints={{
          600: {
            slidesPerView: 1,
          },
          960: {
            slidesPerView: 4,
          },
        }}
        navigation={{
          nextEl: null,
          prevEl: null,
        }}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            <Box sx={{ padding: 1, boxSizing: "border-box" }}>{card}</Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};

export default CardSlider;
