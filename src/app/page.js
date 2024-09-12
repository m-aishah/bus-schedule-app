"use client";
import React, { useState } from 'react';
import {
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  Modal,
  IconButton,
  useTheme,
  useMediaQuery,
  Stack,
  InputLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BusCard from '@/components/BusCard';

const BusModal = ({ open, onClose }) => {
  const theme = useTheme();
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: 400 },
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2">
          Bus Details
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Additional information about the bus will be displayed here.
        </Typography>
      </Box>
    </Modal>
  );
};

const SelectWrapper = ({ label, value, onChange, options }) => (
  <FormControl fullWidth size="small">
    <InputLabel>{label}</InputLabel>
    <Select value={value} onChange={onChange} label={label}>
      {options.map((option) => (
        <MenuItem key={option} value={option}>{option}</MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default function SchedulePage() {
  const busServices = ['AKVA', 'METRO', 'CITY'];
  const locations = ['LEFKE', 'GIRNE', 'NICOSIA'];
  const times = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [from, setFrom] = useState(locations[0]);
  const [to, setTo] = useState(locations[1]);
  const [departureTime, setDepartureTime] = useState(times[0]);
  const [arrivalTime, setArrivalTime] = useState(times[1]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleFromChange = (event) => setFrom(event.target.value);
  const handleToChange = (event) => setTo(event.target.value);
  const handleDepartureTimeChange = (event) => setDepartureTime(event.target.value);
  const handleArrivalTimeChange = (event) => setArrivalTime(event.target.value);

  const handleCardClick = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
       <Box mb={4}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={4}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            NEXT BUS FROM
          </Typography>

          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <SelectWrapper label="From" value={from} onChange={handleFromChange} options={locations} />
              <Typography variant="body1">TO</Typography>
              <SelectWrapper label="To" value={to} onChange={handleToChange} options={locations} />
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <SelectWrapper label="Departure Time" value={departureTime} onChange={handleDepartureTimeChange} options={times} />
              <Typography variant="body1">TO</Typography>
              <SelectWrapper label="Arrival Time" value={arrivalTime} onChange={handleArrivalTimeChange} options={times} />
            </Stack>
          </Stack>
        </Stack>
      </Box>
      
      <Stack 
        direction="row" 
        flexWrap="wrap" 
        justifyContent="space-between"
        sx={{ gap: 2 }}
      >
        {[...Array(8)].map((_, index) => (
          <Box key={index} sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(25% - 12px)' }, mb: 2 }}>
            <BusCard
              service={busServices[index % busServices.length]}
              time={times[index % times.length]}
              location={locations[index % locations.length]}
              price={"45TL"}
              onClick={handleCardClick}
            />
          </Box>
        ))}
      </Stack>
      <BusModal open={modalOpen} onClose={handleCloseModal} />
    </Box>
  );
}