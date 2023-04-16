import { useTheme } from "@emotion/react";
import { Box, Card, Stack, Typography } from "@mui/material";
import { useTransition } from "react";
import InfoPanel from "../components/InfoPanel";
import JobInfoPanel from "../components/JobInfoPanel";
import PreviewCarousel from "../components/PreviewCarousel";
import UserDetails from "../components/UserDetails";
import useFetch from "../hooks/useFetch";
import { findData } from "../lib/discoveryData";
import { EntityContextProvider } from "../context/EntityContext";
import Entity from "../components/Entity";
import CenteredSpinner from "../components/CenteredSpinner";
import { Waypoint } from "react-waypoint";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Discover = () => {

    let [curChain, setCurChain] = useState([]);
    const serveNext = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        axios({
            method: 'post',
            url: `https://grandstaff.herokuapp.com/api/feed/serveNext`,
            headers: {
                'Authorization': 'Bearer ' + (user ? user.token : '0')
            },
            data: {
                chain: curChain
            }
        }).then(res => {
            setCurChain(prev => [...prev, ...res.data.users]);
        }).catch(err => {
            console.log(err);
        });
    }
    useEffect(() => {
        serveNext();
    }, []);
    const loading = curChain.length == 0 ? true : false;

    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    let wpActivated = false;
    return (
        <Box sx={{ overflowY: 'auto', scrollSnapType: 'y mandatory', borderRadius: "15px", width: "100%", backgroundColor: isDark ? "background.default" : "#707070", margin: {lg: "15px 15px 15px 0", xs: "10px 0 0 0"} }}>
            {
                loading ? <CenteredSpinner /> :
                    curChain.map((user, i) => (
                        <EntityContextProvider key={user._id} entityData={{ ...user }}>
                            <Entity />
                            {!wpActivated && i === curChain.length - 2 && <Waypoint onEnter={() => {
                                wpActivated = true;
                                serveNext();
                            }} />}
                        </EntityContextProvider>
                    ))
            }
            <Box height="150px">
                <CenteredSpinner />
            </Box>
        </Box>
    );
}

export default Discover;