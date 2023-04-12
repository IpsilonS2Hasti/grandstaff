import { Box, Stack, Typography, useTheme } from "@mui/material";
import EditPreviewCarousel from "../components/EditPreviewCarousel";
import UserDetails from "../components/UserDetails";
import { findData } from "../lib/discoveryData";
import AddIcon from '@mui/icons-material/Add';
import InfoPanel from "../components/InfoPanel";
import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import PreviewCarousel from "../components/PreviewCarousel";
import { EntityContextProvider } from "../context/EntityContext";
import Entity from "../components/Entity";
import CenteredSpinner from "../components/CenteredSpinner";

const Band = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    let editView = false;
    let band;
    let { _id } = useParams();
    const { data, loading, error } = useFetch('https://grandstaff.herokuapp.com/api/band/getBand/' + _id); //TODO
    if (!loading) {
        band = data.band;
        if (user && band.members.includes(user.userId)) {
            editView = true;
        }

    }

    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <Box sx={{ overflowY: 'auto', height: '100vh-30px', borderRadius: "15px", width: "100%", backgroundColor: "background.default", margin: "15px 15px 15px 0" }}>
            {
                loading
                    ? <CenteredSpinner/>
                    : <EntityContextProvider entityData={{ ...band, editView }}>
                        <Entity />
                    </EntityContextProvider>
            }
        </Box>
    );
}

export default Band;