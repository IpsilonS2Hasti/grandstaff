import { Box } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import ListingFilters from "../components/ListingFilters";
import ProfileListings from "../components/ProfileListings";
import useFetch from "../hooks/useFetch";
import { listingData } from "../lib/listingData";


const Find = ({ createMode }) => {
    const [data, setData] = useState({});
    const { search, pathname } = useLocation();
    let jobMode = false;
    if(pathname === "/job" || search.includes("type=employers")) jobMode = true;

    //Kato e na createMode da se dobavi v search querito user idto i type=employers direktno v koda
    useFetch('https://localhost:8080/find' + search);

    return (
        <Box sx={{ overflowY: 'auto', height: '100vh-30px', borderRadius: "15px", padding: "15px 25px", width: "100%", backgroundColor: "background.default", margin: "15px 15px 15px 0" }}>
            <ProfileListings listings={listingData} jobMode={jobMode}/>
        </Box>
    );
}

export default Find;