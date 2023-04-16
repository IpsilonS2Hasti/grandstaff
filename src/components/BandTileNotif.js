import { Badge, Box, Card, CardActionArea, Chip, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

const BandTileNotif = ({ name, pfpUrl, genres, memberCount, _id, notifId, setData }) => {
    const navigate = useNavigate();

    const acceptInvite = e => {
        e.stopPropagation()
        setData((prev) => {
            let arr = [...prev];
            arr.splice(arr.indexOf(notifId), 1);
            //console.log('PREV', arr);
            return arr;
        });
        axios({
            method: 'post',
            url: 'https://grandstaff.herokuapp.com/api/notifications/acceptBandAdd/',
            data: {
                notifId: notifId
            }
        }).then(res => {
            //
        }).catch(err => {
            console.log(err);
        });
    };

    const declineInvite = e => {
        e.stopPropagation()
        setData((prev) => {
            let arr = [...prev];
            arr.splice(arr.indexOf(notifId), 1);
            //console.log('PREV', arr);
            return arr;
        });
        axios({
            method: 'post',
            url: 'https://grandstaff.herokuapp.com/api/notifications/rejectBandAdd/',
            data: {
                notifId: notifId
            }
        }).then(res => {
            //
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <Card style={{ backgroundColor: "#00000000" }} elevation="0" >
            <CardActionArea onClick={() => navigate('/band/' + _id)}>
                <Box sx={{ width: {lg: '400px', xs: "100%"}, display: 'flex', padding: '10px 7.5px', flexDirection: 'row', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
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
                        <Stack flexShrink="0" marginLeft="auto" width="50px" direction="column" justifyContent="center" alignItems="center">
                            <IconButton onClick={acceptInvite}>
                                <CheckIcon />
                            </IconButton>
                            <IconButton onClick={declineInvite}>
                                <CloseIcon />
                            </IconButton>
                        </Stack>
                    }
                </Box>
            </CardActionArea>
        </Card>
    );
}

export default BandTileNotif;