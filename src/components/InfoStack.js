import { Box, CircularProgress, IconButton } from "@mui/material";
import BandTile from "./BandTile";
import MemberTile from "./MemberTile";
import { Stack } from "@mui/system";
import BandCreationPopup from "./BandCreationPopup";
import AddToBand from "./AddToBandPopup";
import axios from 'axios';
import { useEffect, useState } from "react";
import CenteredSpinner from "./CenteredSpinner";
import { useContext } from "react";
import { EntityContext } from "../context/EntityContext";

const InfoStack = () => {
    const { type, members, bands, _id: userId } = useContext(EntityContext);
    let isBand = type === "Band";
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user) user = { userId: '0', token: '0' };
    const isForeignUser = user.userId === userId ? false : true;
    //Fetch from server
    const limit = isBand ? 30 : 10;

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
                    bandIds: bands
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
                <Stack width={{xl:"350px", lg:"350px", xs:"calc(100vw - 74px)"}} direction="row" justifyContent="center" margin="5px">
                    <AddToBand userId={userId} />
                </Stack>
            );
        if (isForeignUser === false)
            return (
                <Stack width={{xl:"350px", lg:"350px", xs:"calc(100vw - 74px)"}} direction="row" justifyContent="center" margin="5px">
                    <BandCreationPopup />
                </Stack>
            );
    };

    return (
        <Box sx={{
            position: 'fixed',
            overflowY: 'auto',
            overflowX: 'hidden',
            height: { xl: 'calc(100% - 430px)', lg: 'calc(100% - 330px)', xs: "calc(100vh - 394px)" },
            width: {xl: "350px", lg: "350px", xs: "calc(100vw - 64px)"},
            lineHeight: 'normal'
        }}>
            {data ? data.map(
                el => isBand ? <MemberTile {...el} /> : <BandTile {...el} />
            ) : <Box width={{xl:"350px", lg:"350px", xs:"calc(100vw - 64px)"}} height="100%"><CenteredSpinner /></Box>}
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