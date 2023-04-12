import { Box, Stack } from "@mui/material";
import React from "react";
import ChatSideView from "../components/messages/ChatSideView";
import ChatArea from "../components/messages/ChatArea";
import { useTheme } from "@emotion/react";
import { useParams } from "react-router";

const Messages = () => {
    let { chatUid } = useParams();
    let user = { background: "Тромпет" }; //Get background image from back end
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    return (
        <Box sx={{ height: '100vh-30px', width: "100%", backgroundImage: `url('https://grandstaff.herokuapp.com/images/inst/${user.background}.png')` }}>
            <Box sx={{ height: '100%', backgroundSize: "100% 100%", backgroundImage: `url(${isDark ? "https://cdn.discordapp.com/attachments/802212627405078578/1072555007527899206/Untitledbob.png" : "https://cdn.discordapp.com/attachments/802857269796667422/1073167144054947912/Untitledleshta.png"})` }}>
                <Stack width="100%" height="100%" direction={"row"}>
                    <ChatSideView />
                    <ChatArea/>
                </Stack>
            </Box>
        </Box>
    );
}

export default Messages;