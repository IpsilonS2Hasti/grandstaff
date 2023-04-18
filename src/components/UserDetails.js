import { alpha, Box, Button, Chip, IconButton, Stack, Typography, useMediaQuery } from "@mui/material";
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
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    return (
        <Box maxWidth={'700px'} marginLeft={isMobile ? '15px' : '70px'} key={_id} style={{ dispaly: "flex", flexDirection: "column" }}>
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
                            height: isMobile ? '85px' : '125px',
                            width: isMobile ? '85px' : '125px',
                            marginRight: '15px',
                            flexShrink: 0
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
                                ((type === 'Band' || type === 'Employer') ?
                                    <Box marginTop="-5px">
                                        <EditBand />
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
                        {!isMobile ? <> {/* Location and messages for Desktop */}
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
                                    <Chip style={{ borderRadius: "6px" }} icon={<InsertCommentIcon fontSize='small' />} label="Съобщение" onClick={() => navigate('/messages/' + _id)} />
                                    :
                                    null
                            }
                        </> : null}
                    </div>
                    {isMobile ? <> {/* Location and messages for Mobile */}
                        <Stack direction="row" paddingBottom="5px">
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
                                    <Chip style={{ borderRadius: "6px" }} icon={<InsertCommentIcon fontSize='small' />} label="Съобщ." onClick={() => navigate('/messages/' + _id)} />
                                    :
                                    null
                            }
                        </Stack>
                    </> : null}
                    {!isMobile ? <> {/* Instruments and genres for Desktop */}
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
                        {
                            editView
                                ?
                                <DialogPopup data={chipData[2]} selected={genres} /> //REWIRED
                                :
                                <Stack direction='row' spacing={'2px'}>
                                    {genres.map(genre => <Chip key={genre} label={genre} />)}
                                </Stack>
                        }
                    </> : null}
                </Stack>
            </Stack>
            {isMobile ? <> {/* Instruments and genres for Mobile */}
                {
                    editView
                        ?
                        <Stack gap={'2px'}>
                            <DialogPopup data={chipData[1]} selected={instruments} />
                            <DialogPopup data={chipData[2]} selected={genres} />
                        </Stack>
                        :
                        <Stack direction='row' gap={'2px'} flexWrap="wrap">
                            {instruments.map(instr => <Chip key={instr} label={instr} />)}
                            <Box sx={{ width: '2px' }} />
                            <Box sx={{ width: '1px', height: '32px', backgroundColor: '#ffffffDD' }} />
                            <Box sx={{ width: '2px' }} />
                            {genres.map(genre => <Chip  key={genre} label={genre} />)}
                        </Stack>
                }
            </> : null}
        </Box>
    );
}

export default UserDetails;