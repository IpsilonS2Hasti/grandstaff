import { Box, Stack, Typography } from "@mui/material";
import EditPreviewCarousel from "../components/EditPreviewCarousel";
import UserDetails from "../components/UserDetails";
import { findData } from "../lib/discoveryData";
import AddIcon from '@mui/icons-material/Add';
import InfoPanel from "../components/InfoPanel";

const Profile = () => {
    const user = findData[1];

    return (
        <Box sx={{ overflowY: 'auto', height: '100vh-30px', borderRadius: "15px", width: "100%", backgroundColor: "background.default", margin: "15px 15px 15px 0" }}>

            <Box style={{ paddingTop: '50px', height: 'calc(100%)' }}>
                <Stack direction={'column'} alignItems={'center'}>

                    <UserDetails {...user} key={user.uid} editView />
                    <Box sx={{ height: '1px', width: '628px', margin: '35px 45px 45px 45px', backgroundColor: 'primary.main' }} />
                    <Stack direction={'row'} justifyContent={'center'} alignItems='center'>
                        <Box style={{ maxWidth: '628px' }}>
                            <EditPreviewCarousel initPreviews={user.previews} uid={user.uid} />
                        </Box>
                        <InfoPanel desc={user.desc}/>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    );
}

export default Profile;