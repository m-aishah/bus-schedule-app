import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardActionArea,
    useTheme,
    Stack,
    Typography
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

const BusCard = React.memo(({ service, time, location, price, onClick }) => {
    const theme = useTheme();
  
    return (
      <Card elevation={3} sx={{ width: '100%', maxWidth: 300, margin: 'auto' }}>
        <CardActionArea onClick={onClick} sx={{height:'100%'}}>
          <CardContent>
            <Stack spacing={1.5}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <DirectionsBusIcon sx={{ fontSize: 28 }} />
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  {service}
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                Next bus is at:
              </Typography>
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AccessTimeIcon fontSize="small" />
                  <Typography variant="body2">{time}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <LocationOnIcon fontSize="small" />
                  <Typography variant="body2">{location}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AttachMoneyIcon fontSize="small" />
                  <Typography variant="body2">{price}</Typography>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  });
  BusCard.displayName = 'BusCard';
  
  export default BusCard;