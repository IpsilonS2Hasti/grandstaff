import React from 'react';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import Avatar from 'boring-avatars';
import {
  useHMSStore,
  selectPeerAudioByID,
  selectIsPeerAudioEnabled,
  selectLocalPeer,
  selectIsPeerVideoEnabled
} from '@100mslive/react-sdk';
import Permission from './Roles';
import { alpha, Box } from '@mui/system';
import { Card, Stack, Typography } from '@mui/material';
import { useVideo } from "@100mslive/react-sdk";

const User = ({ peer }) => {
  const level = useHMSStore(selectPeerAudioByID(peer.id)) || 0;
  const audioEnabled = useHMSStore(selectIsPeerAudioEnabled(peer.id));
  const videoEnabled = useHMSStore(selectIsPeerVideoEnabled(peer.id));
  const localPeer = useHMSStore(selectLocalPeer);
  const isModerator = localPeer.roleName === 'musician';
  const { videoRef } = useVideo({
    trackId: peer.videoTrack
  });
  return (
    <Card sx={{
      position: 'relative', height: "170px", width: {lg: "200px", xs: "calc(100vw - 64px)"}, borderRadius: '10px', backdropFilter: 'blur(10px)',
      backgroundColor: theme => alpha(theme.palette.background.paper, 0.57), boxShadow: `0px 0px ${level || 0 / 4}px #3d5afe`
    }}>
      <video
        ref={videoRef}
        className={`peer-video ${peer.isLocal ? "local" : ""}`}
        autoPlay
        muted
        playsInline
        style={{ width: "100%", height: "100%", position: "absolute", objectFit: "cover", zIndex: 0 }}
      />
      <Box sx={{ zIndex: 1, position: "relative", padding: '10px', display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
        <div>

          <Typography marginBottom={"5px"} variant='p' style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{peer.name}</Typography>

        </div>
        <Stack direction="row" justifyContent="center">
          {videoEnabled ? null : <Avatar variant='marble' size={90} name={peer.name} />}
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
          <Stack direction="row" alignItems='center' justifyContent="center"> {/* Name and Settings*/}
            <Typography variant='p' fontSize="13px">
              {
                peer.roleName === "musician"
                  ?
                  "Изпълнител"
                  :
                  "Слушател"
              }
            </Typography>
            {
              isModerator
                ?
                <Permission id={peer.id} audioTrack={peer.audioTrack} />
                :
                null
            }
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
};

export default User;
