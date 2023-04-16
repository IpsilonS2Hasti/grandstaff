import React, { useState } from 'react';
import SelectRole from './Select';
import getToken from './utils/getToken';
import { useHMSActions } from '@100mslive/react-sdk';
import { Button, Card, Typography } from '@mui/material';
import { alpha, Box, Stack } from '@mui/system';
import useFetch from '../../hooks/useFetch'

const Join = () => {
  const hmsActions = useHMSActions();
  const [role, setRole] = useState('listener');
  const user = JSON.parse(localStorage.getItem('user'));

  let username;
  let pfpUrl;
  const { data, loading, error } = useFetch('https://grandstaff.herokuapp.com/api/getUser/' + (user ? user.userId : '0'));
  if (!user) {
    username = "Гост"
    pfpUrl = "https://cdn.discordapp.com/attachments/802857269796667422/1075553313283645440/image.png";
  } else {
    if (!loading) {
      username = data.user.firstName + ' ' + data.user.lastName;
      pfpUrl = data.user.pfpUrl;
    }
  }
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
    <Card sx={{ position: 'relative', margin: "auto", marginTop: {lg: '40px', xs: '0'}, borderRadius: '10px', backdropFilter: 'blur(10px)', width: {lg: '420px', xs: 'calc(100% - 64px)'}, padding: '15px', backgroundColor: theme => alpha(theme.palette.background.paper, 0.57) }}>
      <Stack direction={'row'} alignItems="center">
        <Box sx={{
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundImage: `url(${pfpUrl})`,
          borderRadius: '20px',
          height: {lg: '125px', xs: '85px'},
          width: {lg: '125px', xs: '85px'},
          marginRight: '15px',
          flexShrink: 0
        }} />
        <Box>
          <Typography variant='h5' fontSize={{lg:"", xs:"20px"}}>{username}</Typography>
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
