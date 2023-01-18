import { Box, Chip, Stack, Typography } from "@mui/material";

const UserDetails = ({ name, pfp, instruments, genres }) => {
    return (
        <Box maxWidth={'700px'} margin={'auto'}>
            <Stack direction={'row'}>
                <Box style={{
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundImage: `url(${pfp})`,
                    borderRadius: '20px',
                    height: '125px',
                    width: '125px',
                    marginRight: '15px'
                }} />
                <Stack direction={'column'} padding={'5px 0 5px 0'}>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Stack direction='row' spacing={'2px'}>
                        {instruments.map(instr => <Chip label={instr} />)}
                    </Stack>
                    <Box sx={{ height: '5px' }} />
                    <Stack direction='row' spacing={'2px'}>
                        {genres.map(genre => <Chip label={genre} />)}
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}

export default UserDetails;