import { Box, CircularProgress, Stack, Typography, useTheme } from "@mui/material";
import EditPreviewCarousel from "../components/EditPreviewCarousel";
import UserDetails from "../components/UserDetails";
import { findData } from "../lib/discoveryData";
import AddIcon from '@mui/icons-material/Add';
import InfoPanel from "../components/InfoPanel";
import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import PreviewCarousel from "../components/PreviewCarousel";

const Band = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    let editView = false;
    let band;
    let { _id } = useParams();
    const { data, loading, error } = useFetch('https://grandstaff.herokuapp.com/api/band/getBand/' + _id); //TODO
    if (!loading) {
        band = data.band; 
        console.log(band);
        if (user) {
            console.log('MEMBERS', band.members);
            console.log('USERID', user.userId);
            if (band.members.includes(user.userId)) {
                editView = true;
            }
        }
    }

    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <Box sx={{ overflowY: 'auto', height: '100vh-30px', borderRadius: "15px", width: "100%", backgroundColor: "background.default", margin: "15px 15px 15px 0" }}>
            {loading ? <CircularProgress /> :
                <Box sx={{ height: '100%', scrollSnapAlign: 'start', backgroundSize: 'cover', backgroundPosition: 'right bottom', backgroundImage: `url('https://grandstaff.herokuapp.com/images/inst/${band.background}.png')` }}>
                    <Box sx={{ padding: { lg: "15px", xl: "50px 75px 0 75px", md: "50px 75px 0 75px" }, height: '100%', backgroundSize: "100% 100%", backgroundImage: `url(${isDark ? "https://cdn.discordapp.com/attachments/802212627405078578/1072555007527899206/Untitledbob.png" : "https://cdn.discordapp.com/attachments/802857269796667422/1073167144054947912/Untitledleshta.png"})` }}>
                        <div style={{ display: 'flex', height: '100%', width: 'auto' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                                <UserDetails {...band} key={band._id} editView={editView} isBand={band.type === 'Band' ? true : false} />
                                <Box sx={{ height: '1px', margin: '35px 45px 45px 45px', backgroundColor: 'primary.main' }} />
                                <Box sx={{ maxWidth: { xl: '870px', lg: '570px' } }}> {/* If you change preview size, adjust this*/}
                                    {editView ? <EditPreviewCarousel initPreviews={band.previews} _id={band._id} isBand /> :
                                        <PreviewCarousel previews={band.previews} _id={band._id} />}
                                </Box>
                            </div>
                            <InfoPanel desc={band.desc} gsm={band.gsm} contactEmail={band.contactEmail} userId={band._id} isBand={true} members={band.members} editView={editView} />
                        </div>
                    </Box>
                </Box>
            }
        </Box>
    );
}

export default Band;