import * as React from 'react';
import { Stack, useMediaQuery } from '@mui/material';
import { chipData, ChipDropdownData } from '../lib/chipData';
import ChipSelectPopup from './ChipSelectPopup';
import ChipDropdown from './ChipDropdown';
import { Box } from '@mui/system';
import { useSearchParams } from 'react-router-dom';
import SearchBar from './Searchbar';

export default function ListingFilters() { //Pull from url bar on component mount
    const [searchParams, setSearchParams] = useSearchParams();
    const searchParam = searchParams.get("type");
    const type = searchParam ? searchParam : "Musician";
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    React.useEffect(() => {
        const paramKeyArr = ['region', 'instrument', 'genre', 'uEdu']; //scuff
        paramKeyArr.forEach(key => {
            searchParams.delete(key);
        });
        setSearchParams(searchParams);
    }, [type])

    const filters = type === "Musician" ?
        [
            <ChipSelectPopup key="1" data={chipData[0]} />,
            <ChipSelectPopup key="2" data={chipData[1]} />,
            <ChipSelectPopup key="3" data={chipData[2]} />,
            <ChipDropdown key="4" data={ChipDropdownData[1]} />
        ]
        : type === "Band" ?
            [
                <ChipSelectPopup key="5" data={chipData[0]} />,
                <ChipSelectPopup key="6" data={chipData[2]} />
            ]
            :
            [
                <ChipSelectPopup key="7" data={chipData[0]} />,
                <ChipSelectPopup key="8" data={chipData[1]} />,
                <ChipSelectPopup key="9" data={chipData[2]} />,
                <ChipDropdown key="10" data={ChipDropdownData[1]} />
            ];

    return (
        <Stack direction="row" gap={{ lg:2, xs:"5px" }} padding={{lg: "", xs: "0 5px 5px 5px"}} flexWrap="wrap">
            <ChipDropdown data={ChipDropdownData[0]} />
            <Box sx={{ width: '1px', height: '32px', backgroundColor: '#ffffffDD' }} />
            {filters}
        </Stack>
    );
}