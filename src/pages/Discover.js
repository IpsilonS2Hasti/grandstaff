import { useTheme } from "@emotion/react";
import { Box, Card, CircularProgress, Stack, Typography } from "@mui/material";
import { useTransition } from "react";
import InfoPanel from "../components/InfoPanel";
import JobInfoPanel from "../components/JobInfoPanel";
import PreviewCarousel from "../components/PreviewCarousel";
import UserDetails from "../components/UserDetails";
import useFetch from "../hooks/useFetch";
import { findData } from "../lib/discoveryData";

const Find = () => {

    const { data, loading } = useFetch('https://grandstaff.herokuapp.com/api/feed/serveNext');

    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <Box sx={{ overflowY: 'auto', scrollSnapType: 'y mandatory', height: '100vh-30px', borderRadius: "15px", width: "100%", backgroundColor: isDark ? "background.default" : "#707070", margin: "15px 15px 15px 0" }}>
            {
                loading ? <CircularProgress /> :
                data.users.map(user => (
                    <Box sx={{ height: '100%', scrollSnapAlign: 'start', backgroundSize: 'cover', backgroundPosition: 'right bottom', backgroundImage: `url('https://grandstaff.herokuapp.com/images/inst/${user.background}.png')` }}>
                        <Box sx={{ padding: { lg: "15px", xl: "50px 75px 0 75px", md: "50px 75px 0 75px" }, height: '100%', backgroundSize: "100% 100%", backgroundImage: `url(${isDark ? "https://cdn.discordapp.com/attachments/802212627405078578/1072555007527899206/Untitledbob.png" : "https://cdn.discordapp.com/attachments/802857269796667422/1073167144054947912/Untitledleshta.png"})`}}>
                        {
                            user.type === 'Employer'
                                ?
                                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: 'auto', alignItems: 'center' }}>
                                    <UserDetails {...user} key={user._id} isBand={user.type === 'Band' ? true : false} isJob={user.type === 'Employer' ? true : false } />
                                    <Box sx={{ height: '1px', margin: { xl: '35px 45px 45px 45px', lg: '5px 15px 15px 15px' }, width: "75%", backgroundColor: 'primary.main' }} />
                                    <JobInfoPanel desc={user.desc} gsm={user.gsm} contactEmail={user.contactEmail} uniEd={user.uniEd} userId={user._id} isBand={user.type === 'Band' ? true : false} members={user.type === 'Band' ? user.members : user.bands} previews={user.previews} _id={user.id} />
                                </div>
                                :
                                <div style={{ display: 'flex', height: '100%', width: 'auto' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0}}>
                                        <UserDetails {...user} key={user._id} isBand={user.type === 'Band' ? true : false} />
                                        <Box sx={{ height: '1px', margin: '35px 45px 45px 45px', backgroundColor: 'primary.main' }} />
                                        <Box sx={{ maxWidth: {xl: '870px', lg: '570px'} }}> {/* If you change preview size, adjust this*/}
                                            <PreviewCarousel {...user} />
                                        </Box>
                                    </div>
                                    <InfoPanel desc={user.desc} gsm={user.gsm} contactEmail={user.contactEmail} uEdu={user.uniEd} userId={user._id} isBand={user.type === 'Band' ? true : false} members={user.type === 'Band' ? user.members : user.bands} />
                                </div>
                        }
                        </Box>
                    </Box>
                ))
            }
        </Box>
    );
}

export default Find;