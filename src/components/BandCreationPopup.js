import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import { chipData } from '../lib/chipData';
import DialogPopup from './DialogPopup';
import { useNavigate } from 'react-router';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const BandCreationPopup = () => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createBand = () => {
        console.log("BAND CREAYDRTYFEED!!!!!");
        navigate('/band/' + "bandID") //sig 6e trqq timeout predi redirecta da moje backenda da syzdade bandata
        handleClose();
    }


    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <AddIcon fontSize="large" />
            </IconButton>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{ display: 'flex' }}>
                    {"Създаване на Група"}
                </DialogTitle>
                <DialogContent style={{ padding: '15px', width: '400px' }}>
                    <Stack direction={'column'} spacing="15px">
                        <TextField
                            required
                            id="name"
                            label="Име на група"
                        />
                        <Stack direction={"row"}>
                            <Typography variant='p' fontSize="15px" marginTop="4px">{"Жанр:"}</Typography>
                            <Box width="5px" />
                            <DialogPopup data={chipData[2]} selected={[]} />
                        </Stack>
                        <TextField
                            id="description"
                            label="Описание"
                            multiline
                            minRows={4}
                            maxRows={9}
                        />
                        <TextField
                            sx={{ width: '210px' }}
                            id="phone-number"
                            label="Телефонен номер"
                        />
                        <TextField
                            id="contact-email"
                            label="Имейл за връзка"
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">Отказ</Button>
                    <Button onClick={createBand}>Създаване</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default BandCreationPopup;