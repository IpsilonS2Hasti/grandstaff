import { Card, Chip, Stack, Typography } from "@mui/material";
import { alpha, Box } from "@mui/system";

const ProfileListing = ({ name, pfp, instruments, city }) => {
    return (
        <Card sx={{ borderRadius: '10px' }}>
            <Stack direction='row' height={'85px'}>
                <Box style={{
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundImage: `url(${pfp})`,
                    borderRadius: '10px',
                    margin: '5px 15px 5px 5px',
                    width: '75px',
                    height: '75px'
                }} />
                <Typography sx={{ width: 'calc(100% - 90px)', overflow: 'hidden', mt: '10px', lineHeight: '1.2' }} gutterBottom variant="h6" component="div">
                    {name}
                    <Typography sx={{ fontSize: '13px', opacity: '0.5', fontStyle: 'italic' }} variant="p" component="div">
                        {city}
                    </Typography>
                </Typography>
            </Stack>
            <Stack direction='row' spacing={'2px'} margin='5px'>
                {instruments.map(instr => <Chip label={instr} />)}
            </Stack>
        </Card>
    );
}

export default ProfileListing;