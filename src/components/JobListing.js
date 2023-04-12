import { Card, CardActionArea, Chip, Stack, Typography } from "@mui/material";
import { alpha, Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';

const JobListing = ({ _id, firstName, pfp, instruments, city, genres, uniEd }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    return (
        <Card sx={{ borderRadius: '10px' }}>
            <CardActionArea onClick={() => navigate('/job/' + _id)}>
                <Box style={{ backgroundImage: `url('https://grandstaff.herokuapp.com/images/inst/${genres.at(0)}Фейд.png')`, backgroundSize: "contain", backgroundPosition: "bottom right", backgroundRepeat: "no-repeat" }}>
                    <Stack direction='row' height={'85px'} marginLeft="7.5px" >
                        <Typography sx={{ width: 'calc(100% - 60px)', overflow: 'visible', mt: '10px', lineHeight: '1.2' }} gutterBottom variant="h6" component="div">
                            {firstName}
                        </Typography>
                    </Stack>
                    {
                        <Typography sx={{ overflow: 'hidden', mt: '2px', lineHeight: '1.2' }} gutterBottom variant="h6" component="div">
                            <Stack direction='row' marginLeft="7.5px">
                                {
                                    city !== 'Undefined' ?
                                        <Typography sx={{ fontSize: '13px', opacity: '0.5', fontStyle: 'italic' }} variant="p" component="div">
                                            <LocationOnIcon fontSize='13px' style={{ marginBottom: "-2.5px", marginRight: '2px' }} />{city}
                                        </Typography> : null
                                }
                                
                                <Box width="10px" />
                                {uniEd !== 'Undefined' ?
                                    <Typography sx={{ fontSize: '13px', opacity: '0.5', fontStyle: 'italic' }} variant="p" component="div">
                                        <SchoolIcon fontSize='13px' style={{ marginBottom: "-2.5px", marginRight: '2px' }} />{uniEd}
                                    </Typography> : null
                                }
                                
                            </Stack>
                        </Typography>
                    }
                    <Stack direction='row' spacing={'5px'} margin='5px'>
                        {instruments.length > 0 ?
                            instruments.map(instr => {
                                let isHighlighted = false;
                                searchParams.forEach(e => { if (e === instr) isHighlighted = true; });
                                return (<Chip label={instr} sx={

                                    isHighlighted ?
                                    { backgroundColor: theme => alpha(theme.palette.primary.main, 0.6), color: '#fff', [':hover']: { backgroundColor: theme => alpha(theme.palette.primary.main, 0.7) } }
                                    :
                                    null
                            } />)
                        })
                        :
                        <Box height="32px" />
                    }
                    </Stack>
                    <Stack direction='row' spacing={'5px'} margin='5px 5px 0 5px' paddingBottom="5px">
                        {genres.length > 0 ?
                            genres.map(genre => {
                                let isHighlighted = false;
                                searchParams.forEach(e => { if (e === genre) isHighlighted = true; });
                                return (<Chip label={genre} sx={

                                    isHighlighted ?
                                    { backgroundColor: theme => alpha(theme.palette.primary.main, 0.6), color: '#fff', [':hover']: { backgroundColor: theme => alpha(theme.palette.primary.main, 0.7) } }
                                    :
                                    null
                            } />)
                        })
                            :
                            <Box height="32px" />
                        }
                    </Stack>
                </Box>
            </CardActionArea>
        </Card>
    );
}

export default JobListing;