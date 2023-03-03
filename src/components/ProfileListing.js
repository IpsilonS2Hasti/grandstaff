import { Card, CardActionArea, Chip, Stack, Typography } from "@mui/material";
import { alpha, Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';

const ProfileListing = ({ _id, firstName, lastName, pfpUrl, instruments, city, genres, uniEd }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    return (
        <Card sx={{ borderRadius: '10px' }}>
            <CardActionArea onClick={() => navigate('/profile/' + _id)}>
                <Stack direction='row' height={'85px'}>
                    <Box style={{
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundImage: `url(${pfpUrl})`,
                        borderRadius: '10px',
                        margin: '5px 15px 5px 5px',
                        width: '75px',
                        height: '75px'
                    }} />
                    <Typography sx={{ width: 'calc(100% - 90px)', overflow: 'hidden', mt: '10px', lineHeight: '1.2' }} gutterBottom variant="h6" component="div">
                        {firstName + ' ' + lastName}
                        {
                            city !== 'Undefined' ?
                            <Typography sx={{ fontSize: '13px', opacity: '0.5', fontStyle: 'italic', marginBottom: "1.5px" }} variant="p" component="div">
                                <LocationOnIcon fontSize='13px' style={{marginBottom: "-2.5px",  marginRight: '2px'}}/>{city}
                            </Typography> : null
                        }
                        {
                            uniEd !== 'Undefined' ? 
                            <Typography sx={{ fontSize: '13px', opacity: '0.5', fontStyle: 'italic' }} variant="p" component="div">
                                <SchoolIcon fontSize='13px' style={{marginBottom: "-2.5px", marginRight: '2px'}}/>{uniEd !== 'Undefined' ? uniEd : ""}
                            </Typography> : null
                        }
                        
                    </Typography>
                </Stack>
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
                <Stack direction='row' spacing={'5px'} margin='5px'>
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
            </CardActionArea>
        </Card>
    );
}

export default ProfileListing;