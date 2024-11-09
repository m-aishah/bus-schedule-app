"use client";
import { Typography, Container, Paper } from "@mui/material";

export default function AdminPage() {
  return (
    <Container sx={{ py: 4, mt: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: "center",
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Admin Panel
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Coming Soon
        </Typography>
      </Paper>
    </Container>
  );
}
