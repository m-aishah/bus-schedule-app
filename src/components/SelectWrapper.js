import React, { memo } from "react";
import PropTypes from "prop-types"; // For prop validation
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectWrapper = memo(({ label, value, onChange, options, icon }) => (
  <FormControl
    fullWidth
    size="small"
    variant="outlined"
    sx={{
      "& .MuiOutlinedInput-root": {
        borderRadius: 2,
        backgroundColor: "background.paper",
        transition: "background-color 0.3s",
        "&:hover": {
          backgroundColor: "action.hover",
        },
      },
    }}
  >
    <InputLabel sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {icon}
      {label}
    </InputLabel>
    <Select
      value={value}
      onChange={onChange}
      label={label}
      aria-label={label} // For better accessibility
      sx={{ minWidth: { xs: "140px", sm: "200px" } }}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
));

SelectWrapper.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  icon: PropTypes.element,
};

export default SelectWrapper;
