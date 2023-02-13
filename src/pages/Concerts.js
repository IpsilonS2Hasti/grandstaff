import { Box, useTheme } from "@mui/material";
import {
    useHMSStore,
    selectIsConnectedToRoom,
} from '@100mslive/hms-video-react';
import Join from '../components/concerts/components/Join';
import Room from '../components/concerts/components/Room';

const Concerts = () => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    const isConnected = useHMSStore(selectIsConnectedToRoom);
    return (
        <Box sx={{ overflowY: 'auto', height: '100vh-30px', borderRadius: "15px", width: "100%", backgroundColor: "background.default", margin: "15px 15px 15px 0" }}>
            <Box sx={{ height: '100%', scrollSnapAlign: 'start', backgroundSize: 'cover', backgroundPosition: 'right bottom', backgroundImage: `url(${"https://cdn.discordapp.com/attachments/802857269796667422/1074727832510533713/wp5310213-concert-hall-wallpapers.png"})` }}>
                <Box sx={{ padding: { lg: "15px", xl: "50px 75px 0 75px", md: "50px 75px 0 75px" }, height: '100%', backgroundSize: "100% 100%", backgroundImage: `url(${isDark ? "https://cdn.discordapp.com/attachments/802212627405078578/1072555007527899206/Untitledbob.png" : "https://cdn.discordapp.com/attachments/802857269796667422/1073167144054947912/Untitledleshta.png"})` }}>
                    {
                        isConnected ? <Room /> : <Join />
                    }
                </Box>
            </Box>
        </Box>
    );
}

export default Concerts;