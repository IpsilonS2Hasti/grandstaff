import React, { useState } from 'react';
import SelectRole from './Select';
import getToken from './utils/getToken';
import { useHMSActions } from '@100mslive/react-sdk';
import { Button, Card, Typography } from '@mui/material';
import { alpha, Box, Stack } from '@mui/system';

const Join = () => {
  const hmsActions = useHMSActions();
  const [role, setRole] = useState('listener');

  const username = "Красимир Карадонев"
  const pfpUrl = "https://www.meme-arsenal.com/memes/17d66979cdcfc3363aee314f4967254a.jpg";
  const joinRoom = () => {
    getToken(role)
      .then((token) => {
        hmsActions.join({
          userName: username || 'Анонимен',
          authToken: token,
        });
      })
      .catch((error) => {
        console.log('Token API Error', error);
      });
  };
  return (
    <Card sx={{ position: 'relative', margin: "auto", marginTop: '40px', borderRadius: '10px', backdropFilter: 'blur(10px)', width: '420px', padding: '15px', backgroundColor: theme => alpha(theme.palette.background.paper, 0.57) }}>
      <Stack direction={'row'} alignItems="center">
        <Box style={{
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundImage: `url(${pfpUrl})`,
          borderRadius: '20px',
          height: '125px',
          width: '125px',
          marginRight: '15px'
        }} />
        <Box>
          <Typography variant='h5'>{username}</Typography>
          <SelectRole state={{ role, setRole }} />
        </Box>
      </Stack>
      <Stack direction="row" justifyContent='center' alignItems="center" marginTop="20px">
        <Button onClick={joinRoom}>Присъединяване</Button>
      </Stack>
    </Card>
  );
};

export default Join;
