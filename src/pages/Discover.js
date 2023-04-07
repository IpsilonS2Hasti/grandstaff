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

const Find = () => {

    const { data, loading } = useFetch('https://grandstaff.herokuapp.com/api/feed/serveNext');

    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <Box sx={{ overflowY: 'auto', scrollSnapType: 'y mandatory', height: '100vh-30px', borderRadius: "15px", width: "100%", backgroundColor: isDark ? "background.default" : "#707070", margin: "15px 15px 15px 0" }}>
            {
                loading ? <CenteredSpinner /> :
                    data.users.map(user => (
                        <EntityContextProvider entityData={{ ...user }}>
                            <Entity />
                        </EntityContextProvider>
                    ))
            }
        </Box>
    );
}

export default Find;