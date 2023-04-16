import { selectPeers, useHMSStore } from '@100mslive/react-sdk';
import { Stack } from '@mui/system';
import Footer from './Footer';
import User from './User';
import ChatContainer from './ChatContainer';
import { Box, useMediaQuery } from '@mui/material';

const Room = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const peers = useHMSStore(selectPeers);
  return (
    <Stack direction="column">
      <Stack direction="row" margin="0 30px">
        <Stack direction="column" flex={3} justifyContent="space-between">
          <Stack direction={{lg: "row", xs: "column"}} sx={{flexWrap: "wrap"}} gap="15px">
            {peers.map((p) => (
              <User key={p.id} peer={p} />
            ))}
          </Stack>
          <Footer count={peers.length} />
        </Stack>
        {
          isMobile ?
            <Box height="87vh"/>
            :
            <ChatContainer />
        }
      </Stack>
    </Stack>
  );
};

export default Room;
