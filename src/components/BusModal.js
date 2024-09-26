import React from 'react';
import { Modal, Box, Typography, IconButton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
  
    export default BusModal;