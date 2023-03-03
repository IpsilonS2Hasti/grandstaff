import { Card, CardActionArea, Chip, Stack, Typography } from "@mui/material";
import { alpha, Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const BandListing = ({ _id, name, pfpUrl, city, genres}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    return (
        <Card sx={{ borderRadius: '10px' }}>
            <CardActionArea onClick={() => navigate('/band/' + _id)}>
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
                        {name}
                        {
                            city !== 'Undefined' ?
                            <Typography sx={{ fontSize: '13px', opacity: '0.5', fontStyle: 'italic' }} variant="p" component="div">
                                {city}
                            </Typography> : null
                        }
                        
                    </Typography>
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

export default BandListing;