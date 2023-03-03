import { Box, CircularProgress, Stack, Typography, useTheme } from "@mui/material";
import EditPreviewCarousel from "../components/EditPreviewCarousel";
import UserDetails from "../components/UserDetails";
import { findData } from "../lib/discoveryData";
import AddIcon from '@mui/icons-material/Add';
import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import JobInfoPanel from "../components/JobInfoPanel";

const Job = () => {
    let { _id } = useParams();
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    let user;
    let editView = false;
    const { data, loading, error } = useFetch('https://grandstaff.herokuapp.com/api/getUser/' + _id); //TODO
    if (!loading) { user = data.user;
        if (user.owner === loggedUser.userId) editView = true;
    }
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    return (
        <Box sx={{ overflowY: 'auto', height: '100vh-30px', borderRadius: "15px", width: "100%", backgroundColor: "background.default", margin: "15px 15px 15px 0" }}>
            { loading ? <CircularProgress /> :
            <Box sx={{ height: '100%', scrollSnapAlign: 'start', backgroundSize: 'cover', backgroundPosition: 'right bottom', backgroundImage: `url('https://grandstaff.herokuapp.com/images/inst/${user.background}.png')` }}>
                <Box sx={{ padding: { lg: "15px", xl: "50px 75px 0 75px", md: "50px 75px 0 75px" }, height: '100%', backgroundSize: "100% 100%", backgroundImage: `url(${isDark ? "https://cdn.discordapp.com/attachments/802212627405078578/1072555007527899206/Untitledbob.png" : "https://cdn.discordapp.com/attachments/802857269796667422/1073167144054947912/Untitledleshta.png"})` }}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: 'auto', alignItems: 'center' }}>
                        <UserDetails {...user} key={user._id} editView={editView} isBand={false} isJob />
                        <Box sx={{ height: '1px', margin: {xl: '35px 45px 45px 45px', lg: '5px 15px 15px 15px'}, width: "75%", backgroundColor: 'primary.main' }} />
                        <JobInfoPanel desc={user.desc} gsm={user.gsm} contactEmail={user.contactEmail} uniEd={user.uniEd} userId={user._id} isBand={false} editView={editView} _id={_id} previews={user.previews} />
                    </div>
                </Box>
            </Box>
            }
        </Box>
    );
}

export default Job;