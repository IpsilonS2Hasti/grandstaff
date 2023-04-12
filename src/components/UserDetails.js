import { alpha, Box, Button, Chip, IconButton, Stack, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import EditField from "./EditField";
import { useContext, useState } from "react";
import DialogPopup from "./DialogPopup";
import { chipData } from "../lib/chipData";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PfpUpload from "./PfpUpload";
import EditRegionPopup from "./EditRegionPopup";
import EditAccount from "./EditAccount";
import EditBand from "./EditBand";
import userEvent from "@testing-library/user-event";
import { EntityContext } from "../context/EntityContext";
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { useNavigate } from "react-router";

const UserDetails = () => {
    const { _id, firstName, lastName, pfpUrl, instruments, genres, city, editView, type, name } = useContext(EntityContext);
    const navigate = useNavigate();
    return (
        <Box maxWidth={'700px'} marginLeft='70px' key={_id}>
            <Stack direction={'row'}>
                {
                    type === 'Employer'
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
                            {
                                editView
                                    ?
                                    <PfpUpload /> //REWIRED
                                    :
                                    null
                            }
                        </Box>
                }
                <Stack direction={'column'} padding={'5px 0 5px 0'}>
                    <div style={{ display: 'flex' }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {type === 'Band' ? name : (firstName + ' ' + lastName)}
                        </Typography>
                        {
                            editView
                                    ?
                                    ((type==='Band' || type==='Employer') ? 
                                    <Box marginTop="-5px">
                                        <EditBand/> 
                                    </Box>
                                    :
                                    <Box marginTop="-5px">
                                        <EditAccount />
                                    </Box>) : null
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
                                <EditRegionPopup data={chipData[0]} /> //REWIRED
                                :
                                <Chip icon={<LocationOnIcon fontSize='small' />} label={city} />
                        }
                        {
                            type === "Musician" && !editView
                                ?
                                <Box width='10px' />
                                :
                                null
                        }
                        {
                            type === "Musician" && !editView
                                ?
                                <Chip style={{ borderRadius: "6px" }} icon={<InsertCommentIcon fontSize='small' />} label="Съобщение" onClick={() => navigate('/messages/' + _id)}/>
                                :
                                null
                        }
                    </div>
                    {
                        editView
                            ?
                            <DialogPopup data={chipData[1]} selected={instruments} /> //REWIRED
                            :
                            <Stack direction='row' spacing={'2px'}>
                                {instruments.map(instr => <Chip key={instr} label={instr} />)}
                            </Stack>
                    }
                    <Box sx={{ height: '5px' }} />
                    <Stack direction='row' spacing={'2px'}>
                        {
                            editView
                                ?
                                <DialogPopup data={chipData[2]} selected={genres} /> //REWIRED
                                :
                                <Stack direction='row' spacing={'2px'}>
                                    {genres.map(genre => <Chip key={genre} label={genre} />)}
                                </Stack>
                        }
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}

export default UserDetails;