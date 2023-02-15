import {
  useHMSStore,
  selectHMSMessages,
  useHMSActions,
} from '@100mslive/react-sdk';
import React from 'react';
import { alpha, Box, Card, Divider, TextField, Typography } from '@mui/material';

const ChatContainer = (props) => {
  const hmsActions = useHMSActions();
  const storeMessages = useHMSStore(selectHMSMessages);
  const [chatInput, setChatInput] = React.useState('');
  const sendMessage = () => {
    hmsActions.sendBroadcastMessage(chatInput);
    setChatInput('');
  };
  React.useEffect(() => {
    const el = document.getElementById('chat-feed');
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [storeMessages]);
  return (
    <Card sx={{ flex: 1, position: 'relative', height: "fit-content", borderRadius: '10px', backdropFilter: 'blur(10px)', padding: '10px',
      backgroundColor: theme => alpha(theme.palette.background.paper, 0.57) }}>
      <Box id='chat-feed' style={{ height: 'calc(80vh - 100px)', overflowY: "auto", whiteSpace: "break-spaces", wordWrap: "break-word"}}>
        {storeMessages.map((m) => (
          <Typography>{m.senderName + ": " + m.message}</Typography>
        ))}
      </Box>
      <Divider style={{marginBottom: "15px"}}/>
      <TextField
          label="Съобщение"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          style={{width: '100%'}}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              if (!event.shiftKey) {
                event.preventDefault();
                if (chatInput.trim() !== '') {
                  sendMessage();
                }
              }
            }
          }}
        />
    </Card>
  );
};

export default ChatContainer;
