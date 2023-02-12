import { Box, Stack, Typography, useTheme } from "@mui/material";
import EditPreviewCarousel from "../components/EditPreviewCarousel";
import UserDetails from "../components/UserDetails";
import { findData } from "../lib/discoveryData";
import AddIcon from '@mui/icons-material/Add';
import { useParams } from "react-router";
import { useAuthContext } from "../hooks/useAuthContext";
import useFetch from "../hooks/useFetch";
import JobInfoPanel from "../components/JobInfoPanel";

const Job = () => {
    let user = findData[1];
    user.name = "Търсим кларентист за извеждане в Пловдив zaradi bob bob";
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    return (
        <Box sx={{ overflowY: 'auto', height: '100vh-30px', borderRadius: "15px", width: "100%", backgroundColor: "background.default", margin: "15px 15px 15px 0" }}>
            <Box sx={{ height: '100%', scrollSnapAlign: 'start', backgroundSize: 'cover', backgroundPosition: 'right bottom', backgroundImage: `url(${"https://cdn.discordapp.com/attachments/802212627405078578/1072601131051663402/710c0ca6fdcd8cbb.png"})` }}>
                <Box sx={{ padding: { lg: "15px", xl: "50px 75px 0 75px", md: "50px 75px 0 75px" }, height: '100%', backgroundSize: "100% 100%", backgroundImage: `url(${isDark ? "https://cdn.discordapp.com/attachments/802212627405078578/1072555007527899206/Untitledbob.png" : "https://cdn.discordapp.com/attachments/802857269796667422/1073167144054947912/Untitledleshta.png"})` }}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: 'auto', alignItems: 'center' }}>
                        <UserDetails {...user} key={user.uid} editView isJob />
                        <Box sx={{ height: '1px', margin: {xl: '35px 45px 45px 45px', lg: '5px 15px 15px 15px'}, width: "75%", backgroundColor: 'primary.main' }} />
                        <JobInfoPanel desc={"JOBBBB"} editView isBand />
                    </div>
                </Box>
            </Box>
        </Box>
    );
}

export default Job;