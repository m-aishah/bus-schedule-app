"use client";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
const ContactForm = () => {
  const [issueType, setIssueType] = useState("wrong-information");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with issue type:", issueType);
    console.log("Description:", description);
  };
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        maxWidth: 400,
        margin: "auto",
      }}
      onSubmit={handleSubmit}
    >
      {/* Issue Type */}
      <TextField
        select
        label="What is the issue?"
        required
        SelectProps={{
          native: true,
        }}
        variant="outlined"
        value={issueType}
        onChange={(e) => setIssueType(e.target.value)}
      >
        <option value="wrong-information">Wrong information</option>
        <option value="missing-data">Missing data</option>
        <option value="schedule-issue">Schedule issue</option>
        <option value="other">Other</option>
      </TextField>

      {/* Description */}
      <TextField
        label="Describe the issue"
        multiline
        rows={3}
        variant="outlined"
        required
        placeholder="Briefly describe the issue you're facing"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Optional Upload Screenshot */}
      <Button variant="outlined" component="label">
        Attach a screenshot (optional)
        <input type="file" hidden />
      </Button>

      {/* Submit */}
      <Button type="submit" variant="contained" color="primary">
        Submit Complaint
      </Button>
    </Box>
  );
};

export default ContactForm;
