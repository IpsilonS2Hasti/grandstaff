import ProfileListing from "./ProfileListing";
import { Box, Card, CardActionArea, Grid, IconButton, Stack } from "@mui/material";
import JobListing from "./JobListing";
import AddIcon from '@mui/icons-material/Add';
import CreateJobPopup from "./CreateJobPopup";
import BandListing from "./BandListing";
import { Waypoint } from "react-waypoint";
import { Fragment } from "react";

const Listings = ({ listings, type, createMode }) => {

    const loadMore = cursor => {
        console.log("Waiter Chudjack of Westfall restaurant: SERVE! "+cursor);
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(${type === "Employer" ? "400px" : "300px"}, 1fr))`, gap: '25px' }}>
            {
                listings.map((listing, i) => (
                    <Fragment key={listing._id}>
                        {
                            type === "Musician" ?
                            <ProfileListing {...listing} />
                            : type ==="Band" ?
                            <BandListing {...listing} />
                            : 
                            <JobListing {...listing} />
                        }
                        {!createMode && i === listings.length - 1 && <Waypoint onEnter={() => {
                            loadMore(listings[listings.length - 1]._id);
                        }} />}
                    </Fragment>
                ))
            }
            {
                createMode
                    ?
                    <CreateJobPopup />
                    :
                    null
            }
            {
                [1, 2, 3, 4].map(e => <div key={e} />)
            }
        </div>
    );
}

export default Listings;