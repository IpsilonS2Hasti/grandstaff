import { Box, CircularProgress, IconButton } from "@mui/material";
import BandTile from "./BandTile";
import MemberTile from "./MemberTile";
import { Stack } from "@mui/system";
import BandCreationPopup from "./BandCreationPopup";
import AddToBand from "./AddToBandPopup";
import axios from 'axios';
import { useEffect, useState } from "react";

const InfoStack = ({ isBand, members, userId }) => {
    console.log(members);
    console.log(isBand);
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user) user = {userId: '0', token: '0'};
    const isForeignUser = user.userId === userId ? false : true;
    //Fetch from server
    const limit = isBand ? 30 : 10;
    // const data = isBand ?
    //     [
    //         {
    //             firstName: "Ilhan",
    //             lastName: "Andonoff",
    //             pfpUrl: "https://cdn.discordapp.com/attachments/471777194847502351/1039169390064705586/unknown.png",
    //             instruments: [
    //                 "Флатуленция",
    //                 "Пелтечене"
    //             ]
    //         }
    //     ]
    //     :
    //     [
    //         {
    //             name: "Орк. Глупаците от Долна Джумая",
    //             pfpUrl: "https://cdn.discordapp.com/attachments/471777194847502351/1037830501530083488/unknown.png",
    //             genres: [
    //                 "Чалга",
    //                 "Маками"
    //             ],
    //             memberCount: "7"
    //         },
    //         {
    //             name: "Орк. Глупаците от Долна Джумая 2.0",
    //             pfpUrl: "https://cdn.discordapp.com/attachments/471777194847502351/1037830501530083488/unknown.png",
    //             genres: [
    //                 "Чалга",
    //                 "Маками"
    //             ],
    //             memberCount: "7"
    //         },
    //     ];
    const [data, setData] = useState(null);
    useEffect(() => {
        if (isBand) {
            axios({
                method: 'post',
                url: 'https://grandstaff.herokuapp.com/api/getUsers',
                data: {
                    usersIds: members
                }
            }).then(res => {
                setData(res.data.users)
            }).catch(err => {
                console.log(err);
            });
        }
        else {
            axios({
                method: 'post',
                url: 'https://grandstaff.herokuapp.com/api/band/getBands',
                data: {
                    bandIds: members
                }
            }).then(res => {
                setData(res.data.bands)
            }).catch(err => {
                console.log(err);
            });
        }
    }, []);

    const renderIconButton = () => {
        if (isForeignUser === true)
            return (
                <Stack direction="row" justifyContent="center" margin="5px">
                    <AddToBand userId={userId} />
                </Stack>
            );
        if (isForeignUser === false)
            return (
                <Stack direction="row" justifyContent="center" margin="5px">
                    <BandCreationPopup />
                </Stack>
            );
    };

    return (
        <Box sx={{ position: 'fixed', overflowY: 'auto', height: { xl: 'calc(100% - 430px)', lg: 'calc(100% - 330px)' }, lineHeight: 'normal' }}>
            {data ? data.map(
                el => isBand ? <MemberTile {...el} /> : <BandTile {...el} />
            ) : <CircularProgress /> }
            {
                data ? 
                ((data.length < limit) && !isBand
                    ?
                    (user.userId !== '0' ? renderIconButton() : null)
                    :
                    null) : ''
            }
        </Box >
    );
}

export default InfoStack;