import * as React from 'react';
import { Box, Button, ButtonGroup, Chip, Stack } from '@mui/material';
import { chipData } from '../lib/chipData';
import { useSearchParams } from "react-router-dom";
import ChipSelectPopup from './ChipSelectPopup';
import Popover from '@mui/material/Popover'; //popover

export default function ListingFilters() { //Pull from url bar on component mount
    const [selectedInstr, setSelectedInstr] = React.useState([]);
    const [selectedRegions, setSelectedRegions] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null); //popover
    const [selVal, setSelVal] = React.useState('')

    const handleClick = (event) => { //popover
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => { //popover
        setAnchorEl(null);
         console.log('clicked!!');
    };

    const open = Boolean(anchorEl); //popover
    const id = open ? 'simple-popover' : undefined; //popover

    const buttons = [ //popover
        <Button key="one" style={{borderBottom: 0}} onClick={handleClose}>All</Button>,
        <Button key="two" onClick={handleClose}>Degree</Button>,
    ];

    return (
        <div>
            <Stack direction="row" spacing={2} >
                <ChipSelectPopup selEls={selectedRegions} setSelEls={setSelectedRegions} data={chipData[0]} />
                <ChipSelectPopup selEls={selectedInstr} setSelEls={setSelectedInstr} data={chipData[1]} />
                <Chip aria-describedby={id} label="Education" onClick={handleClick} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.16)', color: '#fff', [':hover']: { backgroundColor: 'rgba(255, 255, 255, 0.24)' } }} />
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                >
                    <Box width="100px">
                        <ButtonGroup
                            orientation="vertical"
                            aria-label="vertical contained button group"
                            variant="text"
                            fullWidth
                        >
                            {buttons}
                        </ButtonGroup>
                    </Box>
                </Popover>
            </Stack>
        </div>
    );
}