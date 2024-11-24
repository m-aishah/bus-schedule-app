import React, { useState, useEffect } from "react";
import { TextField, InputAdornment, Box, Chip, Stack } from "@mui/material";
import { Schedule } from "@mui/icons-material";

const TimeInput = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [isCustom, setIsCustom] = useState(false);

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
    {
      label: "Evening",
      value: "19:00",
    },
    {
      label: "Custom",
      value: "custom",
    },
  ];

  // Set default to "Now" on component mount
  useEffect(() => {
    const nowTime = getCurrentRoundedTime();
    setInputValue(nowTime);
    onChange(nowTime);
  }, []);

  // Handle external value changes
  useEffect(() => {
    if (value) {
      setInputValue(value);
      setIsCustom(!quickTimeOptions.some((option) => option.value === value));
    }
  }, [value]);

  const validateTime = (time) => {
    if (!time) return false;
    const [hours, minutes] = time.split(":").map(Number);
    return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
  };

  const handleTimeChange = (event) => {
    const newTime = event.target.value;
    setInputValue(newTime);
    setIsCustom(true);

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

  const handleQuickOptionClick = (option) => {
    if (option.value === "custom") {
      setIsCustom(true);
      return;
    }

    setIsCustom(false);
    setInputValue(option.value);
    setError("");
    onChange(option.value);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        fullWidth
        placeholder="Enter time (HH:MM)"
        label="Show buses after"
        value={inputValue}
        onChange={handleTimeChange}
        error={!!error}
        size="medium"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Schedule fontSize="small" color={error ? "error" : "primary"} />
            </InputAdornment>
          ),
          sx: {
            bgcolor: "background.paper",
            "&:hover": {
              bgcolor: "background.paper",
            },
            height: 45,
            borderRadius: 2,
          },
        }}
        helperText={error}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
          mb: 2,
        }}
      />

      <Stack
        direction="row"
        sx={{
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {quickTimeOptions.map((option) => {
          const isSelected =
            option.value === "custom" ? isCustom : inputValue === option.value;

          return (
            <Chip
              key={option.label}
              label={option.label}
              onClick={() => handleQuickOptionClick(option)}
              color={isSelected ? "primary" : "default"}
              variant={isSelected ? "filled" : "outlined"}
              sx={{
                borderRadius: "16px",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-1px)",
                  boxShadow: 1,
                },
              }}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default TimeInput;
