import { Box, useTheme } from "@mui/material";
import { useContext } from "react";
import InfoPanel from "../components/InfoPanel";
import JobInfoPanel from "../components/JobInfoPanel";
import PreviewCarousel from "../components/PreviewCarousel";
import UserDetails from "../components/UserDetails";
import { EntityContext } from "../context/EntityContext";
import EditPreviewCarousel from "./EditPreviewCarousel";

const Entity = () => {
    const user = useContext(EntityContext);
    console.log(user);
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    return (
        <Box sx={{ height: '100%', scrollSnapAlign: 'start', backgroundSize: 'cover', backgroundPosition: 'right bottom', backgroundImage: `url('https://grandstaff.herokuapp.com/images/inst/${user.background}.png')` }}>
            <Box sx={{ padding: { lg: "15px", xl: "50px 75px 0 75px", md: "50px 75px 0 75px" }, height: '100%', backgroundSize: "100% 100%", backgroundImage: `url(${isDark ? "https://cdn.discordapp.com/attachments/802212627405078578/1072555007527899206/Untitledbob.png" : "https://cdn.discordapp.com/attachments/802857269796667422/1073167144054947912/Untitledleshta.png"})` }}>
                TESTING!!!
                {
                    user.type === 'Employer'
                        ?
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: 'auto', alignItems: 'center' }}>
                            <UserDetails/>
                            <Box sx={{ height: '1px', margin: { xl: '35px 45px 45px 45px', lg: '5px 15px 15px 15px' }, width: "75%", backgroundColor: 'primary.main' }} />
                            <JobInfoPanel/>
                        </div>
                        :
                        <div style={{ display: 'flex', height: '100%', width: 'auto' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                                <UserDetails/>
                                <Box sx={{ height: '1px', margin: '35px 45px 45px 45px', backgroundColor: 'primary.main' }} />
                                <Box sx={{ maxWidth: { xl: '870px', lg: '570px' } }}> {/* If you change preview size, adjust this*/}
                                    {
                                        user.editView ?
                                        <EditPreviewCarousel/> :
                                        <PreviewCarousel/>
                                    }
                                </Box>
                            </div>
                            <InfoPanel/>
                        </div>
                }
            </Box>
        </Box>
    );
}

export default Entity;