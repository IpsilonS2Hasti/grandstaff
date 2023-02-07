import { Box, Card, Stack, Typography } from "@mui/material";
import InfoPanel from "../components/InfoPanel";
import PreviewCarousel from "../components/PreviewCarousel";
import UserDetails from "../components/UserDetails";
import { findData } from "../lib/discoveryData";

const Find = () => {

    return (
        <Box sx={{ overflowY: 'auto', scrollSnapType: 'y mandatory', height: '100vh-30px', borderRadius: "15px", width: "100%", backgroundColor: "background.default", margin: "15px 15px 15px 0" }}>
            {
                findData.map(user => (
                    <Box sx={{ height: '100%', scrollSnapAlign: 'start', backgroundSize: 'cover', backgroundImage: `url(${"https://cdn.discordapp.com/attachments/802212627405078578/1072601131051663402/710c0ca6fdcd8cbb.png"})`}}>
                        <Box sx={{ padding: { lg: "15px", xl: "50px 75px 0 75px", md: "50px 75px 0 75px" }, height: '100%', backgroundSize: "100% 100%", backgroundImage: `url(${"https://cdn.discordapp.com/attachments/802212627405078578/1072555007527899206/Untitledbob.png"})`}}>
                            <div style={{ display: 'flex', height: '100%', width: 'auto' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0}}>
                                    <UserDetails {...user} key={user.uid} />
                                    <Box sx={{ height: '1px', margin: '35px 45px 45px 45px', backgroundColor: 'primary.main' }} />
                                    <Box style={{ maxWidth: '870px' }}>
                                        <PreviewCarousel {...user} />
                                    </Box>
                                </div>
                                <InfoPanel desc={user.desc}/>
                            </div>
                        </Box>
                    </Box>
                ))
            }
        </Box>
    );
}

export default Find;