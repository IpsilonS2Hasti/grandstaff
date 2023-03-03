import { Badge, Box, Card, CardActionArea, Chip, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { useState } from "react";

const BandTile = ({ name, pfpUrl, genres, memberCount, addMode, _id, userId }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [isAdded, setIsAdded] = useState(false);

    const addToBand = () => {
        setTimeout(() => {
            setIsAdded(true);
        }, 1);
        axios({
            method: 'put',
            url: 'https://grandstaff.herokuapp.com/api/notifications/sendBandAdd',
            headers: {
                'Authorization': 'Bearer ' + (user.token ? user.token : '0')
            },
            data: {
                bandId: _id,
                toId: userId
            }
        }).then(res => {
            //
        });
    }
    return (
        <Card style={{ backgroundColor: "#00000000" }} elevation="0" >
            <CardActionArea disabled={isAdded} onClick={
                addMode
                ?
                addToBand
                :
                () => navigate('/band/' + _id)
            }>
                <Box sx={{ width: addMode ? '400px' : '350px', display: 'flex', padding: '10px 7.5px', flexDirection: 'row', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
                    <Box style={{
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundImage: `url(${pfpUrl})`,
                        borderRadius: '20px',
                        height: '85px',
                        width: '85px',
                        marginRight: '12px',
                        flexShrink: 0
                    }} >
                        <Badge badgeContent={memberCount} color="primary"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}>
                            <Box style={{ width: '70px', height: '70px' }} />
                        </Badge>
                    </Box>
                    <Box>
                        <Typography gutterBottom variant="p" component="div" fontSize="18px">
                            {name}

                            </Typography>
                        <Stack direction='row' gap={'2px'} flexWrap="wrap">
                            {genres.map(genre => {
                                return (<Chip label={genre} />)
                            })}
                        </Stack>
                    </Box>
                    {
                        addMode
                            ?
                            <Stack flexShrink="0" marginLeft="auto" width="50px" direction="column" justifyContent="center" alignItems="center">
                                <AddIcon fontSize="large"  />
                            </Stack>
                            :
                            null
                    }
                </Box>
            </CardActionArea>
        </Card>
    );
}

export default BandTile;