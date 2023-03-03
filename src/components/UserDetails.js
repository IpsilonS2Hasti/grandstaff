import { alpha, Box, Button, Chip, IconButton, Stack, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import EditField from "./EditField";
import { useState } from "react";
import DialogPopup from "./DialogPopup";
import { chipData } from "../lib/chipData";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PfpUpload from "./PfpUpload";
import EditRegionPopup from "./EditRegionPopup";
import EditAccount from "./EditAccount";
import EditBand from "./EditBand";
import userEvent from "@testing-library/user-event";

const UserDetails = ({ firstName, lastName, pfpUrl, instruments, genres, city, editView, isBand, name, isJob }) => {
    return (
        <Box maxWidth={'700px'} marginLeft='70px'>
            <Stack direction={'row'}>
                {
                    isJob
                        ?
                        null
                    :
                    <Box style={{
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundImage: `url(${pfpUrl})`,
                        borderRadius: '20px',
                        height: '125px',
                        width: '125px',
                        marginRight: '15px'
                    }} >
                        {editView
                            ?
                            <PfpUpload />
                            :
                            null
                        }
                    </Box>
                }
                <Stack direction={'column'} padding={'5px 0 5px 0'}>
                    <div style={{ display: 'flex' }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {isBand ? name : (firstName + ' ' + lastName)}
                        </Typography>
                        {
                            editView
                                ?
                                isBand || isJob
                                    ?
                                    <Box marginTop="-5px">
                                        <EditBand name={name} isJob={isJob} />
                                    </Box>
                                    :
                                    // <Box marginTop="-5px">
                                    //     <EditAccount />
                                    // </Box>
                                    null
                                :
                                null
                        }
                        {
                            editView
                                ?
                                <Box width='10px' />
                                :
                                <Box width='15px' />
                        }
                        {
                            editView
                                ?
                                <EditRegionPopup data={chipData[0]} initSel={city} isBand={isBand} />
                                :
                                <Chip icon={<LocationOnIcon fontSize='small' />} label={city} />
                        }
                    </div>
                    {
                        editView
                            ?
                            <DialogPopup data={chipData[1]} selected={instruments} isBand={isBand} isJob={isJob} />
                            :
                            <Stack direction='row' spacing={'2px'}>
                                {instruments.map(instr => <Chip label={instr} />)}
                            </Stack>
                    }
                    <Box sx={{ height: '5px' }} />
                    <Stack direction='row' spacing={'2px'}>
                        {
                            editView
                                ?
                                <DialogPopup data={chipData[2]} selected={genres} isBand={isBand} isJob={isJob} />
                                :
                                <Stack direction='row' spacing={'2px'}>
                                    {genres.map(instr => <Chip label={instr} />)}
                                </Stack>
                        }
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}

export default UserDetails;