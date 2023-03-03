import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import EditPreviewCarousel from "../components/EditPreviewCarousel";
import UserDetails from "../components/UserDetails";
import { findData } from "../lib/discoveryData";
import AddIcon from '@mui/icons-material/Add';
import InfoPanel from "../components/InfoPanel";
import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import PreviewCarousel from "../components/PreviewCarousel";
import { useNavigate } from 'react-router-dom';
import { useTheme } from "@emotion/react";
import Entity from "../components/Entity";
import { EntityContextProvider } from "../context/EntityContext";

const Testing = () => {
    let { _id } = useParams();
    let editView = false;
    let user = JSON.parse(localStorage.getItem('user'));

    //redirect logic
    const navigate = useNavigate();
    if (!_id && !user) navigate('/login');

    if (user && (!_id || _id === user.userId)) {
        _id = user.userId;
        editView = true;
    }

    const { data, loading, error } = useFetch('https://grandstaff.herokuapp.com/api/getUser/' + _id); //TODO
    if (!loading) { user = data.user; console.log(data); }

    return (
        <Box sx={{ overflowY: 'auto', height: '100vh-30px', borderRadius: "15px", width: "100%", backgroundColor: "background.default", margin: "15px 15px 15px 0" }}>
            {
                loading
                    ? <CircularProgress />
                    : <EntityContextProvider entityData={{ ...user, editView }}>
                        <Entity />
                    </EntityContextProvider>
            }
        </Box>
    );
}

export default Testing;