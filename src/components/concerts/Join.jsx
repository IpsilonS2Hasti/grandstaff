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
