import { Box, Stack, Typography } from "@mui/material";
import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import { useNavigate } from 'react-router-dom';
import Entity from "../components/Entity";
import { EntityContextProvider } from "../context/EntityContext";
import CenteredSpinner from "../components/CenteredSpinner";

const Profile = () => {
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
        <Box sx={{ overflowY: 'auto', borderRadius: "15px", width: "100%", backgroundColor: "background.default", margin: "15px 15px 15px 0" }}>
            {
                loading
                    ? <CenteredSpinner/>
                    : <EntityContextProvider entityData={{ ...user, editView }}>
                        <Entity />
                    </EntityContextProvider>
            }
        </Box>
    );
}

export default Profile;