import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box, Card, CardActionArea, IconButton, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import { chipData } from '../lib/chipData';
import DialogPopup from './DialogPopup';
import { useNavigate } from 'react-router';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const CreateJobPopup = () => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createBand = () => {
        console.log("Job created");
        navigate('/job/' + "jobID") //sig 6e trqq timeout predi redirecta da moje backenda da syzdade bandata
        handleClose();
    }


    return (
        <div>
            <Card sx={{ borderRadius: '10px', height: '183.6px' }}>
                <CardActionArea onClick={handleClickOpen} style={{ height: "100%" }}>
                    <Stack alignItems='center'>
                        <AddIcon fontSize="large" />
                        Създаване на нова обява
                    </Stack>
                </CardActionArea>
            </Card>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{ display: 'flex' }}>
                    {"Създаване на Обява"}
                </DialogTitle>
                <DialogContent style={{ padding: '15px', width: '400px' }}>
                    <Stack direction={'column'} spacing="15px">
                        <TextField
                            required
                            id="name"
                            label="Заглавие"
                        />
                        <Stack direction={"row"}>
                            <Typography variant='p' fontSize="15px" marginTop="4px">{"Жанр:"}</Typography>
                            <Box width="5px" />
                            <DialogPopup data={chipData[2]} selected={[]} />
                        </Stack>
                        <Stack direction={"row"}>
                            <Typography variant='p' fontSize="15px" marginTop="4px">{"Инструменти:"}</Typography>
                            <Box width="5px" />
                            <DialogPopup data={chipData[1]} selected={[]} />
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

export default CreateJobPopup;