import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import EditPreviewCarousel from "../components/EditPreviewCarousel";
import UserDetails from "../components/UserDetails";
import { findData } from "../lib/discoveryData";
import AddIcon from '@mui/icons-material/Add';
import InfoPanel from "../components/InfoPanel";
import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import PreviewCarousel from "../components/PreviewCarousel";
import { useNavigate } from 'react-router-dom';
import { useTheme } from "@emotion/react";

const Profile = () => {
    let isLoading = false;
    let editView = false;
    let { _id } = useParams();
    if (!_id) isLoading = true;
    let params = _id;
    console.log(_id);
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    const navigate = useNavigate();
    if (!params && !user) navigate('/login');
    if (user) {
        if (!params || params === user.userId) {
            isLoading = false;
            _id = user.userId;
            console.log('set Id to', _id);
            editView = true;
        }
    }
    
    if (isLoading) _id = '63d01d72c6ff2d38b2c3a43b';
    if (!isLoading && params) _id = params;
    const { data, loading, error } = useFetch('https://grandstaff.herokuapp.com/api/getUser/' + _id); //TODO
    if (!loading) { user = data.user; console.log(data);}

    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <Box sx={{ overflowY: 'auto', height: '100vh-30px', borderRadius: "15px", width: "100%", backgroundColor: "background.default", margin: "15px 15px 15px 0" }}>
            { loading ? <CircularProgress /> :
            <Box sx={{ height: '100%', scrollSnapAlign: 'start', backgroundSize: 'cover', backgroundPosition: 'right bottom', backgroundImage: `url('https://grandstaff.herokuapp.com/images/inst/${user.background}.png')` }}>
                <Box sx={{ padding: { lg: "15px", xl: "50px 75px 0 75px", md: "50px 75px 0 75px" }, height: '100%', backgroundSize: "100% 100%", backgroundImage: `url(${isDark ? "https://cdn.discordapp.com/attachments/802212627405078578/1072555007527899206/Untitledbob.png" : "https://cdn.discordapp.com/attachments/802857269796667422/1073167144054947912/Untitledleshta.png"})` }}>
                    <div style={{ display: 'flex', height: '100%', width: 'auto' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                            <UserDetails {...user} key={user._id} editView={editView} isBand={user.type === 'Band' ? true : false} />
                            <Box sx={{ height: '1px', margin: '35px 45px 45px 45px', backgroundColor: 'primary.main' }} />
                            <Box sx={{ maxWidth: { xl: '870px', lg: '570px' } }}> {/* If you change preview size, adjust this*/}
                                { editView ? <EditPreviewCarousel initPreviews={user.previews} _id={user._id} /> :
                                <PreviewCarousel previews={user.previews} _id={user._id} />}
                            </Box>
                        </div>
                        <InfoPanel desc={user.desc} gsm={user.gsm} contactEmail={user.contactEmail} uEdu={user.uniEd} userId={user._id} isBand={user.type === 'Band' ? true : false} members={user.type === 'Band' ? user.members : user.bands} editView={editView} />
                    </div>
                </Box>
            </Box>
            }
        </Box>
    );
}

export default Profile;