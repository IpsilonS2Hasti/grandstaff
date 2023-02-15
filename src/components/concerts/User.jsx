import React from 'react';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import Avatar from 'boring-avatars';

import {
  useHMSStore,
  selectPeerAudioByID,
  selectIsPeerAudioEnabled,
  selectLocalPeer,
} from '@100mslive/hms-video-react';
import Permission from './Roles';
import { alpha, Box } from '@mui/system';
import { Card, Stack, Typography } from '@mui/material';

const User = ({ peer }) => {
  const level = useHMSStore(selectPeerAudioByID(peer.id)) || 0;
  const audioEnabled = useHMSStore(selectIsPeerAudioEnabled(peer.id));
  const localPeer = useHMSStore(selectLocalPeer);
  const isModerator = localPeer.roleName === 'musician';
  return (
    <Card sx={{
      position: 'relative', height: "fit-content", borderRadius: '10px', backdropFilter: 'blur(10px)', padding: '10px',
      backgroundColor: theme => alpha(theme.palette.background.paper, 0.57), boxShadow: `0px 0px ${level || 0 / 4}px #3d5afe`
    }}>
      <div>
        <Stack direction="row" alignItems='center' justifyContent="center"> {/* Name and Settings*/}
          <Typography variant='p'>{peer.name}</Typography>
          {
            isModerator
              ?
              <Permission id={peer.id} audioTrack={peer.audioTrack} />
              :
              null
          }
        </Stack>
      </div>
      <Stack direction="row" justifyContent="center">
        <Avatar variant='marble' size={90} name={peer.name} />
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="center">
        {
          audioEnabled
            ?
            <MicIcon fontSize="13px" />
            :
            <MicOffIcon color='error' fontSize="13px" />
        }
        {' '}
        <Typography variant='p' fontSize="13px">
          {
            peer.roleName === "musician"
              ?
              "Изпълнител"
              :
              "Слушател"
          }
        </Typography>
      </Stack>
    </Card>
  );
};

export default User;
