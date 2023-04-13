import { Box } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ListingFilters from "../components/ListingFilters";
import Listings from "../components/Listings";
import useFetch from "../hooks/useFetch";
import { listingData } from "../lib/listingData";
import CenteredSpinner from "../components/CenteredSpinner";

const Find = ({ createMode }) => {
    let { search, pathname } = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));
    let { _id } = useParams();
    let params = _id;
    const navigate = useNavigate();
    if (params===undefined && user===null && pathname.includes('/job')) navigate('/signup');
    if (pathname.includes("/job") || search.includes("type=Employer")) {
        if (pathname.includes('/job') && user) search = ('?type=Employer&owner=' + user.userId);
    }
    console.log(search);
    
    //Kato e na createMode da se dobavi v search querito user idto i type=employers direktno v koda
    const { data, loading } = useFetch('https://grandstaff.herokuapp.com/api/find' + (search=="" ? "?type=Musician" : search));
    console.log("BOB", data);

    return (
        <Box sx={{ overflowY: 'auto', height: '100vh-30px', borderRadius: "15px", padding: "15px 25px", width: "100%", backgroundColor: "background.default", margin: "15px 15px 15px 0" }}>
            {loading ? 
                <CenteredSpinner /> :
                <Listings listingsOg={data.queryUsers ? data.queryUsers : data.queryBands} type={data.type} createMode={pathname === '/job'} search={search} />
            }
        </Box>
    );
}

export default Find;