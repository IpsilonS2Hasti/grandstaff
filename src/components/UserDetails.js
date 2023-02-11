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

const UserDetails = ({ name, pfp, instruments, genres, editView, isBand }) => {
    return (
        <Box maxWidth={'700px'} marginLeft='70px'>
            <Stack direction={'row'}>
                <Box style={{
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundImage: `url(${pfp})`,
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
                <Stack direction={'column'} padding={'5px 0 5px 0'}>
                    <div style={{ display: 'flex' }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                        {
                            editView
                                ?
                                isBand
                                    ?
                                    <Box marginTop="-5px">
                                        <EditBand />
                                    </Box>
                                    :
                                    <Box marginTop="-5px">
                                        <EditAccount />
                                    </Box>
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
                                <EditRegionPopup data={chipData[0]} initSel="Tatargrad" />
                                :
                                <Chip icon={<LocationOnIcon fontSize='small' />} label="Baazardzhique" />
                        }
                    </div>
                    {
                        editView
                            ?
                            <DialogPopup data={chipData[1]} selected={instruments} />
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
                                <DialogPopup data={chipData[2]} selected={genres} />
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