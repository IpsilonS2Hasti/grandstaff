import { useTheme } from "@emotion/react";
import { Box, Stack, TextField, Typography, alpha } from "@mui/material";
import { useParams } from "react-router";
import Message from "./Message";
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';

const ChatArea = ({ user }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    const [chatInput, setChatInput] = useState('');

    let { chatUid } = useParams();
    let username = "Ivan Andonov" //fetch from back end using chatUid
    let pfpUrl = "https://cdn.discordapp.com/attachments/802857269796667422/1095599208058335242/image.png"; //fetch from back end using chatUid
    let messages = [ //fetch from back end using chatUid
        {
            content: "аааа",
            timestamp: "5-5-2023",
            sender: "Ivan Andonov"
        },
        {
            content: "аааа",
            timestamp: "5-5-2023",
            sender: "Ivan Andonov"
        },
        {
            content: "аааа",
            timestamp: "5-5-2023",
            sender: "Ivan Andonov"
        },
        {
            content: "Andonov?",
            timestamp: "5-5-2023",
            sender: ""
        },
        ,
        {
            content: "Sdrafei asam ihs- tei de ifan! Sdrafei asam ihs- tei de ifan! Sdrafei asam ihs- tei de ifan! Sdrafei asam ihs- tei de ifan! Sdrafei asam ihs- tei de ifan! Sdrafei asam ihs- tei de ifan!",
            timestamp: "11-4-2023",
            sender: "Ivan Andonov"
        },
        {
            content: "Вие се нуждаете от хоспитализация.",
            timestamp: "12-4-2023",
            sender: ""
        },
        {
            content: "Sdrafei asam ihs- tei de ifan! Sdrafei asam ihs- tei de ifan! Sdrafei asam ihs- tei de ifan! Sdrafei asam ihs- tei de ifan! Sdrafei asam ihs- tei de ifan! Sdrafei asam ihs- tei de ifan!",
            timestamp: "11-4-2023",
            sender: "Ivan Andonov"
        },
        {
            content: "Вие се нуждаете от хоспитализация.",
            timestamp: "12-4-2023",
            sender: ""
        },
        ,
        {
            content: "Sdrafei asam ihs- tei de ifan! Sdrafei asam ihs- tei de ifan! Sdrafei asam ihs- tei de ifan! Sdrafei asam ihs- tei de ifan! Sdrafei asam ihs- tei de ifan! Sdrafei asam ihs- tei de ifan!",
            timestamp: "11-4-2023",
            sender: "Ivan Andonov"
        },
        {
            content: "Вие се нуждаете от хоспитализация.",
            timestamp: "12-4-2023",
            sender: ""
        },
        ,
        {
            content: "Sdrafei asam ihs- tei de ifan! Sdrafei asam ihs- tei de ifan! Sdrafei asam ihs- tei de ifan! Sdrafei asam ihs- tei de ifan! Sdrafei asam ihs- tei de ifan! Sdrafei asam ihs- tei de ifan!",
            timestamp: "11-4-2023",
            sender: "Ivan Andonov"
        },
        {
            content: "Вие се нуждаете от хоспитализация.",
            timestamp: "12-4-2023",
            sender: ""
        },
    ];

    const sendMessage = () => {
        console.log(chatInput);
        setChatInput('');
    };

    return (
        <Stack sx={{ width: "675px", height: '100%', direction: "column" }}>
            <Stack
                direction='row'
                flexShrink={0}
                paddingLeft="25px"
                alignItems="center"
                height="65px" style={{
                    borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
                    borderImage: "linear-gradient(to right, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 78%, rgba(255,255,255,0) 100%) 2"
                }}>
                <Box style={{
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundImage: `url(${pfpUrl})`,
                    borderRadius: '20px',
                    height: '35px',
                    width: '35px',
                    marginRight: '12px',
                    flexShrink: 0
                }} >
                </Box>
                <Typography variant="p" component="div" fontSize="20px">
                    <b>{username}</b>
                </Typography>
            </Stack>
            <Stack sx={{ direction: 'column', width: "675px", overflowY: 'auto', flexGrow: 1 }}>
                {messages.map(msg => <Message {...msg} />)}
            </Stack>
            <Box sx={{ margin: "0 15px 15px 15px", }}>
                <TextField
                    label="Съобщение"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    style={{ width: '100%' }}
                    multiline
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
            </Box>
        </Stack>
    );
}

export default ChatArea;