import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BandListings from "../components/BandListings";
import ListingFilters from "../components/ListingFilters";
import ProfileListings from "../components/ProfileListings";
import useFetch from "../hooks/useFetch";
import { listingData } from "../lib/listingData";

const Find = ({ createMode }) => {
    let { search, pathname } = useLocation();
    let jobMode = false;
    const user = JSON.parse(localStorage.getItem('user'));
    let { _id } = useParams();
    let params = _id;
    const navigate = useNavigate();
    if (params===undefined && user===null && pathname.includes('/job')) navigate('/signup');
    if (pathname.includes("/job") || search.includes("type=Employer")) {
        jobMode = true;
        if (pathname.includes('/job') && user) search = ('?type=Employer&owner=' + user.userId);
    }

    //Kato e na createMode da se dobavi v search querito user idto i type=employers direktno v koda
    const { data, loading } = useFetch('https://grandstaff.herokuapp.com/api/find'+search);
    if (!loading) { console.log(data) };

    return (
        <Box sx={{ overflowY: 'auto', height: '100vh-30px', borderRadius: "15px", padding: "15px 25px", width: "100%", backgroundColor: "background.default", margin: "15px 15px 15px 0" }}>
            {loading ? 
                <CircularProgress /> :
                (data.type === 'Band' ? 
                <BandListings listings={data.queryBands} /> 
                : <ProfileListings listings={data.queryUsers} jobMode={jobMode} createMode={pathname === '/job'} />)
                
            }
        </Box>
    );
}

export default Find;