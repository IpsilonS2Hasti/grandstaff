import React from 'react';
import {
  useHMSActions,
  useHMSStore,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
} from '@100mslive/react-sdk';
import { Box, Button, IconButton, Stack } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import ChatContainer from './ChatContainer';
import MobileChatPopUp from './MobileChatPopUp';

const Footer = ({ count }) => {
  const hmsActions = useHMSActions();
  const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const isLocalVideoEnabled = useHMSStore(selectIsLocalVideoEnabled);
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
      <IconButton
        onClick={() => {
          hmsActions.setLocalVideoEnabled(!isLocalVideoEnabled);
        }}
      >
        {
          isLocalVideoEnabled
            ?
            <VideocamIcon fontSize="13px" />
            :
            <VideocamOffIcon color='error' fontSize="13px" />
        }
      </IconButton>
      <Button style={{ marginLeft: "20px" }} color='error' onClick={() => {
        hmsActions.leave();
      }}>
        Напусни
      </Button>
      <MobileChatPopUp>
        <ChatContainer />
      </MobileChatPopUp>
    </Stack>
  );
};

export default Footer;
