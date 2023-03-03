import ProfileListing from "./ProfileListing";
import { Box, Card, CardActionArea, Grid, IconButton, Stack } from "@mui/material";
import JobListing from "./JobListing";
import AddIcon from '@mui/icons-material/Add';
import CreateJobPopup from "./CreateJobPopup";

const ProfileListings = ({ listings, jobMode, createMode }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(${jobMode ? "400px" : "300px"}, 1fr))`, gap: '25px' }}>
            {
                listings.map(listing => (
                    jobMode
                        ?
                        <JobListing {...listing} />
                        :
                        <ProfileListing {...listing} />
                ))
            }
            {
                createMode
                ?
                <CreateJobPopup/>
                :
                null
        }
        {
            [1, 2, 3, 4].map(() => <div />)
            }
        </div>
    );
}

export default ProfileListings;