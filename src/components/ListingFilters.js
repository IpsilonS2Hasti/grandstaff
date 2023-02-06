import * as React from 'react';
import { Stack } from '@mui/material';
import { chipData, ChipDropdownData } from '../lib/chipData';
import ChipSelectPopup from './ChipSelectPopup';
import ChipDropdown from './ChipDropdown';
import { Box } from '@mui/system';
import { useSearchParams } from 'react-router-dom';

export default function ListingFilters() { //Pull from url bar on component mount
    const [searchParams, setSearchParams] = useSearchParams();
    const searchParam = searchParams.get("type");
    const type = searchParam ? searchParam : "musicians";

    React.useEffect(() => {
        const paramKeyArr = ['region', 'instrument', 'genre', 'uEdu']; //scuff
        paramKeyArr.forEach(key => {
            searchParams.delete(key);
        });        
        setSearchParams(searchParams);
    }, [type])

    const RenderFilters = () => {
        console.log(type);
        if (type === "musicians")
            return (
                <Stack direction="row" spacing={2} >
                    <ChipSelectPopup key="1" data={chipData[0]} />
                    <ChipSelectPopup key="2" data={chipData[1]} />
                    <ChipSelectPopup key="3" data={chipData[2]} />
                    <ChipDropdown key="4" data={ChipDropdownData[1]} />
                </Stack>
            );
        if (type === "bands")
            return (
                <Stack direction="row" spacing={2} >
                    <ChipSelectPopup key="5" data={chipData[0]} />
                    <ChipSelectPopup key="6" data={chipData[2]} />
                </Stack>
            );
    };

    return (
        <div>
            <Stack direction="row" spacing={2} >
                <ChipDropdown data={ChipDropdownData[0]} />
                <Box sx={{ width: '1px', height: '32px', backgroundColor: '#ffffffDD' }} />
                {RenderFilters()}
            </Stack>
        </div>
    );
}