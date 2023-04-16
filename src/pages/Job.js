import { Box, Stack, Typography, useTheme } from "@mui/material";
import EditPreviewCarousel from "../components/EditPreviewCarousel";
import UserDetails from "../components/UserDetails";
import { findData } from "../lib/discoveryData";
import AddIcon from '@mui/icons-material/Add';
import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import JobInfoPanel from "../components/JobInfoPanel";
import { EntityContextProvider } from "../context/EntityContext";
import Entity from "../components/Entity";
import CenteredSpinner from "../components/CenteredSpinner";

const Job = () => {
    let { _id } = useParams();
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    let job;
    let editView = false;
    const { data, loading, error } = useFetch('https://grandstaff.herokuapp.com/api/getUser/' + _id);
    if (!loading) {
        job = data.user;
        if (loggedUser) {
            if (loggedUser && job.owner === loggedUser.userId) editView = true;
        }
    }
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    return (
        <Box sx={{ overflowY: 'auto', borderRadius: "15px", width: "100%", backgroundColor: "background.default", margin: {lg: "15px 15px 15px 0", xs: "10px 0 0 0"} }}>
            {
                loading
                    ? <CenteredSpinner />
                    : <EntityContextProvider entityData={{ ...job, editView }}>
                        <Entity />
                    </EntityContextProvider>
            }
        </Box>
    );
}

export default Job;