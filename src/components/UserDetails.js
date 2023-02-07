import { alpha, Box, Chip, IconButton, Stack, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import EditField from "./EditField";
import { useState } from "react";
import DialogPopup from "./DialogPopup";
import { chipData } from "../lib/chipData";

const UserDetails = ({ name, pfp, instruments, genres, editView }) => {
    return (
        <Box maxWidth={'700px'}>
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
                }} />
                <Stack direction={'column'} padding={'5px 0 5px 0'}>
                    <Typography gutterBottom variant="h5" component="div">
                        {
                            editView
                                ?
                                <EditField value={name} />
                                :
                                name
                        }
                    </Typography>
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