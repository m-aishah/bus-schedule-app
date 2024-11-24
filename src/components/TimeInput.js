import React, { useState, useEffect } from "react";
import {
  TextField,
  InputAdornment,
  Box,
  Stack,
  Chip,
  IconButton,
  Collapse,
} from "@mui/material";
import { Schedule, ChevronRight } from "@mui/icons-material";

const TimeInput = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState("");
  const [showQuickPicks, setShowQuickPicks] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const getCurrentRoundedTime = () => {
    const now = new Date();
    now.setMinutes(Math.ceil(now.getMinutes() / 5) * 5);
    return now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const quickTimeOptions = [
    {
      label: "Now",
      value: getCurrentRoundedTime(),
    },
    {
      label: "+1h",
      value: (() => {
        const date = new Date();
        date.setHours(date.getHours() + 1);
        date.setMinutes(Math.ceil(date.getMinutes() / 5) * 5);
        return date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      })(),
    },
    {
      label: "Morning",
      value: "09:00",
    },
    {
      label: "Afternoon",
      value: "14:00",
    },
  ];

  const validateTime = (time) => {
    if (!time) return false;
    const [hours, minutes] = time.split(":").map(Number);
    return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
  };

  const handleTimeChange = (event) => {
    const newTime = event.target.value;
    setInputValue(newTime);

    if (newTime === "") {
      setError("Please enter a time");
      return;
    }

    if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(newTime)) {
      setError("Please enter a valid time (HH:MM)");
      return;
    }

    if (!validateTime(newTime)) {
      setError("Invalid time");
      return;
    }

    setError("");
    onChange(newTime);
  };

  const handleQuickOptionClick = (timeValue) => {
    setInputValue(timeValue);
    setError("");
    onChange(timeValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          position: "relative",
          mb: error ? 3 : 1,
        }}
      >
        <TextField
          fullWidth
          placeholder="Select departure time"
          value={inputValue}
          label="Show buses after"
          onChange={handleTimeChange}
          error={!!error}
          size="medium"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Schedule
                  fontSize="small"
                  color={error ? "error" : "primary"}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setShowQuickPicks(!showQuickPicks)}
                  sx={{
                    transform: showQuickPicks ? "rotate(90deg)" : "none",
                    transition: "transform 0.3s ease",
                  }}
                >
                  <ChevronRight />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              bgcolor: "background.paper",
              "&:hover": {
                bgcolor: "background.paper",
              },
              height: 45,
            },
          }}
          helperText={error}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />

        <Collapse
          in={showQuickPicks}
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1,
            mt: 0.5,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 3,
            overflow: "hidden",
          }}
        >
          <Stack
            direction="row"
            sx={{
              p: 1.5,
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {quickTimeOptions.map((option) => (
              <Chip
                key={option.label}
                label={option.label}
                onClick={() => handleQuickOptionClick(option.value)}
                color={inputValue === option.value ? "primary" : "default"}
                variant={inputValue === option.value ? "filled" : "outlined"}
                sx={{
                  borderRadius: 1.5,
                  transition: "all 0.2s ease-in-out",
                  flex: {
                    xs: "1 0 calc(50% - 8px)",
                    sm: "0 1 auto",
                  },
                  "&:hover": {
                    bgcolor:
                      inputValue === option.value
                        ? "primary.main"
                        : "action.hover",
                    transform: "translateY(-1px)",
                  },
                }}
              />
            ))}
          </Stack>
        </Collapse>
      </Box>
    </Box>
  );
};

export default TimeInput;
