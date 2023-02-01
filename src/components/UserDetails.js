import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import EditField from "./EditField";
import { useState } from "react";
import DialogPopup from "./DialogPopup";
import { chipData } from "../lib/chipData";

const UserDetails = ({ name, pfp, instruments, genres, editView }) => {
    const [editName, setEditName] = useState(false);

    return (
        <Box maxWidth={'700px'} margin={'auto'}>
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
                                <EditField value={name}/>
                                :
                                name
                        }
                    </Typography>
                    <Stack direction='row' spacing={'2px'}>
                        {instruments.map(instr => <Chip label={instr} />)}
                        {
                            editView
                                ?
                                <DialogPopup data={chipData[1]} />
                                :
                                null
                        }
                    </Stack>
                    <Box sx={{ height: '5px' }} />
                    <Stack direction='row' spacing={'2px'}>
                        {genres.map(genre => <Chip label={genre} />)}
                        {
                            editView
                                ?
                                <IconButton size="small">
                                    <AddIcon fontSize="small" />
                                </IconButton>
                                :
                                null
                        }
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}

export default UserDetails;