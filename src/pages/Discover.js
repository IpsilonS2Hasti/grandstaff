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

const Find = () => {
    let [curChain, setCurChain] = useState([]);
    const serveNext = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        let res = await axios.get("https://grandstaff.herokuapp.com/api/feed/serveNext", {
            headers: { 'Authorization': 'Bearer ' + (user != null ? user.token : '0') }
        })
        setCurChain(prev => [...prev, ...res.data.users.slice(0, 3)]);
    }
    useEffect(() => {
        serveNext();
    }, []);
    const loading = curChain.length == 0 ? true : false;
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    let wpActivated = false;
    return (
        <Box sx={{ overflowY: 'auto', scrollSnapType: 'y mandatory', height: '100vh-30px', borderRadius: "15px", width: "100%", backgroundColor: isDark ? "background.default" : "#707070", margin: "15px 15px 15px 0" }}>
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

export default Find;