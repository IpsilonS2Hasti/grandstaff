import { Box, Stack, Typography } from "@mui/material";
import PreviewCarousel from "../components/PreviewCarousel";
import UserDetails from "../components/UserDetails";
import { findData } from "../lib/discoveryData";

const Find = () => {

    return (
        <Box sx={{ overflowY: 'auto', scrollSnapType: 'y mandatory', height: '100vh-30px', borderRadius: "15px", width: "100%", backgroundColor: "background.default", margin: "15px 15px 15px 0" }}>
            {
                findData.map(user => (
                    <Box  style={{ paddingTop: '50px', height: 'calc(100%)', scrollSnapAlign: 'start' }}>
                        <Stack direction={'column'} alignItems={'center'}>

                            <UserDetails {...user} key={user.uid} />
                            <Box sx={{ height: '1px', width: '628px', margin: '35px 45px 45px 45px', backgroundColor: 'primary.main' }} />
                            <Stack direction={'row'} justifyContent={'center'}>
                                <Box style={{ maxWidth: '628px' }}>
                                    <PreviewCarousel {...user} />
                                </Box>
                                <Box sx={{ backgroundColor: 'background.paper', padding: '15px', marginLeft: '25px', borderRadius: '16px', height: '400px', width: '300px' }}>
                                    <Typography variant="p" component="p">{user.desc}</Typography>
                                </Box>
                            </Stack>
                        </Stack>
                    </Box>
                ))
            }
        </Box>
    );
}

export default Find;