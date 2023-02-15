import React from 'react';
import {
  useHMSActions,
  useHMSStore,
  selectIsLocalAudioEnabled,
} from '@100mslive/hms-video-react';
import { Box, Button, IconButton, Stack } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

const Footer = ({ count }) => {
  const hmsActions = useHMSActions();
  const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  return (
    <Stack direction="row" spacing="5px">
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <PeopleAltIcon />
        <Box width="5px" />
        <b>{count}</b>
      </div>
      <IconButton
        onClick={() => {
          hmsActions.setLocalAudioEnabled(!isLocalAudioEnabled);
        }}
      >
        {
          isLocalAudioEnabled
            ?
            <MicIcon fontSize="13px" />
            :
            <MicOffIcon color='error' fontSize="13px" />
        }
      </IconButton>
      <Button style={{marginLeft: "20px"}} color='error' onClick={() => {
        hmsActions.leave();
      }}>
        Напусни
      </Button>
    </Stack>
  );
};

export default Footer;
