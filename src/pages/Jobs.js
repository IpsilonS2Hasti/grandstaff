import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Player } from "video-react";
import JobListing from "../components/JobListing";
import { useAuthContext } from "../hooks/useAuthContext";
import { jobData } from '../lib/jobData';

const Jobs = () => {
    let { user, dispatch } = useAuthContext();
    console.log(user);
    return (
        <div style={{
            width: '480px',
            height: '270px',
        }}>
            
        </div>

    );
}

export default Jobs;