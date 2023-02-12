import { Card, CardActionArea, Chip, Stack, Typography } from "@mui/material";
import { alpha, Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';

const JobListing = ({ id, name, pfp, instruments, city, genres, uEdu }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    return (
        <Card sx={{ borderRadius: '10px' }}>
            <CardActionArea onClick={() => navigate('/profile/' + id)}>
                <Box style={{ backgroundImage: `url(${"https://cdn.discordapp.com/attachments/802857269796667422/1074267791311511552/Cool_Effegts.png"})`, backgroundSize: "contain", backgroundPosition: "bottom right", backgroundRepeat: "no-repeat" }}>
                    <Stack direction='row' height={'85px'} marginLeft="7.5px" >
                        <Typography sx={{ width: 'calc(100% - 60px)', overflow: 'visible', mt: '10px', lineHeight: '1.2' }} gutterBottom variant="h6" component="div">
                            {name}
                        </Typography>
                    </Stack>
                    {
                        <Typography sx={{ overflow: 'hidden', mt: '2px', lineHeight: '1.2' }} gutterBottom variant="h6" component="div">
                            <Stack direction='row' marginLeft="7.5px">
                                <Typography sx={{ fontSize: '13px', opacity: '0.5', fontStyle: 'italic' }} variant="p" component="div">
                                    <LocationOnIcon fontSize='13px' style={{ marginBottom: "-2.5px", marginRight: '2px' }} />{city}
                                </Typography>
                                <Box width="10px" />
                                <Typography sx={{ fontSize: '13px', opacity: '0.5', fontStyle: 'italic' }} variant="p" component="div">
                                    <SchoolIcon fontSize='13px' style={{ marginBottom: "-2.5px", marginRight: '2px' }} />{uEdu}
                                </Typography>
                            </Stack>
                        </Typography>
                    }
                    <Stack direction='row' spacing={'5px'} margin='5px'>
                        {instruments.map(instr => {
                            let isHighlighted = false;
                            searchParams.forEach(e => { if (e === instr) isHighlighted = true; });
                            return (<Chip label={instr} sx={

                                isHighlighted ?
                                    { backgroundColor: theme => alpha(theme.palette.primary.main, 0.6), color: '#fff', [':hover']: { backgroundColor: theme => alpha(theme.palette.primary.main, 0.7) } }
                                    :
                                    null
                            } />)
                        })}
                    </Stack>
                    <Stack direction='row' spacing={'5px'} margin='5px 5px 0 5px' paddingBottom="5px">
                        {genres.map(genre => {
                            let isHighlighted = false;
                            searchParams.forEach(e => { if (e === genre) isHighlighted = true; });
                            return (<Chip label={genre} sx={

                                isHighlighted ?
                                    { backgroundColor: theme => alpha(theme.palette.primary.main, 0.6), color: '#fff', [':hover']: { backgroundColor: theme => alpha(theme.palette.primary.main, 0.7) } }
                                    :
                                    null
                            } />)
                        })}
                    </Stack>
                    {
                        instruments.length === 0
                            ?
                            <Box height="32px" />
                            :
                            null
                    }
                </Box>
            </CardActionArea>
        </Card>
    );
}

export default JobListing;