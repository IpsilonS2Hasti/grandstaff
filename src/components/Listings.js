import ProfileListing from "./ProfileListing";
import { Box, Card, CardActionArea, Grid, IconButton, Stack } from "@mui/material";
import JobListing from "./JobListing";
import AddIcon from '@mui/icons-material/Add';
import CreateJobPopup from "./CreateJobPopup";
import BandListing from "./BandListing";
import { Waypoint } from "react-waypoint";
import { Fragment, useState } from "react";
import axios from "axios";

const Listings = ({ listingsOg, type, createMode, search }) => {
    const [ listings, setListings ] = useState(listingsOg);

    const loadMore = cursor => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("Waiter Chudjack of Westfall restaurant: SERVE! "+cursor);
        axios({
            method: 'post',
            url: `https://grandstaff.herokuapp.com/api/findNext` + (search=="" ? "?type=Musician" : search),
            headers: {
                'Authorization': 'Bearer ' + (user ? user.token : '0')
            },
            data: {
                chain: listings
            }
        }).then(res => {
            if (type != 'Band') setListings(prev => [...prev, ...res.data.queryUsers]);
            else setListings(prev => [...prev, ...res.data.queryBands]);
        }).catch(err => {
            console.log(err);
        });
        //setListings(prev => [...prev, ...res.data.users.slice(0, 3)]);
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