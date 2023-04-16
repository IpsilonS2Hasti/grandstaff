import { Box, Stack, Typography, alpha } from "@mui/material";
import MemberTile from "../MemberTile";
import ChatPreview from "./ChatPreview";

const ChatSideView = () => {
    let chatPrevs = [ //Fetching from back end
        {
            firstName: "Chud",
            lastName: "Jack",
            pfpUrl: "https://cdn.discordapp.com/attachments/802857269796667422/1095381143207018526/b2f.png",
            lastMsg:"BILLIONS must die.",
            _id: "000"
        },
        {
            firstName: "Ivan",
            lastName: "Andonov",
            pfpUrl: "https://cdn.discordapp.com/attachments/802857269796667422/1095599208058335242/image.png",
            lastMsg:"Тъка Крис ти не спря да ме дефаш и мютваш bo bo bob oboboboobobbobobbo",
            _id: "001"
        },
    ];
    return (
        <Box sx={{ overflowY: 'auto', height: '100%', width: {lg: "350px", xs: "calc(100vw - 60px)"}, backgroundColor: "background.paper", borderLeft: {lg: '1px solid rgba(255, 255, 255, 0.12)', xs:""}, backdropFilter: 'blur(10px)', backgroundColor: theme => alpha(theme.palette.background.paper, 0.57) }}>
            <Stack direction="column">
                <Stack
                    justifyContent="center"
                    alignItems="center"
                    height="65px" style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.2)' }}>
                    <Typography variant="p" component="div" fontSize="20px">
                        <b>Съобщения</b>
                    </Typography>
                </Stack>
                {
                    chatPrevs.map(cp => <ChatPreview {...cp}/>)
                }
            </Stack>
        </Box>
    );
}

export default ChatSideView;