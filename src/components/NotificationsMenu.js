import { Badge, Box, IconButton, Popover, Typography } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useEffect, useState } from "react";
import BandTileNotif from "./BandTileNotif";
import axios from "axios";

const NotificationsMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    // const data = [
    //     {
    //         name: "Орк. Соева Полиамория",
    //         pfpUrl: "https://cdn.discordapp.com/attachments/471777194847502351/1037830501530083488/unknown.png",
    //         genres: [
    //             "Чалга",
    //             "Маками"
    //         ],
    //         memberCount: "7"
    //     },
    // ];

    //Socket.io for badge number and on handleClick fetch all notifications for a user.

    const user = JSON.parse(localStorage.getItem('user'));

    const [data, setData] = useState([]);
    useEffect(() => {
        if (user) {
            axios({
                method: 'get',
                url: 'https://grandstaff.herokuapp.com/api/notifications/getNotifications/' + ( user.userId ),
            }).then(res => {
                setData(res.data.bands)
                console.log(data);
            }).catch(err => {
                console.log(err);
            });
        }
        else {}
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <div>
            <IconButton
                size="large"
                color="inherit"
                onClick={handleClick}
            >
                <Badge badgeContent={data.length} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Box sx={{ width: '400px', height: '500px' }}>
                    <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: "12.5px 5px", borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
                        <NotificationsIcon />
                        <Box width="5px" />
                        <Typography variant="h5" component="div"><b>Известия</b></Typography>
                    </Box>
                    {
                        //<IconButton onClick={() => {setData([]); }}><NotificationsIcon /></IconButton>
                    }
                    {
                        data.length > 0
                            ?
                            data.map(el => <BandTileNotif {...el} setData={setData} />)
                            :
                            <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: "12.5px 5px" }}>
                                <Typography variant="h6" component="div">Празно!</Typography>
                            </Box>
                    }
                </Box>
            </Popover>
        </div>
    );
}

export default NotificationsMenu;